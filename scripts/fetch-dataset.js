const JishoAPI = require('unofficial-jisho-api')
const path = require('path')
const fs = require('node:fs/promises')
const JsLingua = require('jslingua')

const { SRC_PATH, DATASETS_PATH } = require('./constants')
const { Group, Inflection }= require('./types')

const TAGS = [
  'v1',
]

const SUPPORTED_INFLECTIONS = [
  'present',
  'past'
]

const morpho = JsLingua.gserv('morpho', 'jpn')
const jisho = new JishoAPI()

/**
 * returns a set of verbs for each group that are common
 */

async function fetchVerbs() {
  const searches = await Promise.all(TAGS.map(async (tag) => {
    const { data } = await jisho.searchForPhrase(`#${tag} #common #word`)
    return [tag, data]
  }))

  return searches.reduce((carry, [tag, data]) => {
    carry[tag] = data
    return carry
  }, {})
}

async function conjugateSupported(verbs) {
  const result = {}

  for (const tag in verbs) {
    result[tag] = verbs[tag]
      .reduce((carry, verb) =>
        carry.concat(SUPPORTED_INFLECTIONS.map(
          inflection => {
return morpho.conj(verb.slug, {
            tense: inflection,
            formality: 'polite'
          })
          }
        )), []
      )
  }

  return result
}

/**
 * returns a set of sentences for the provided terms, keyed by the
 * triggering search
 */

async function fetchExamples(terms) {
  const searches = await Promise.all(terms.map(async (term) => {
    const { results, uri } = await jisho.searchForExamples(term)
    return [term, results]
  }))

  return searches.reduce((carry, [term, data]) => {
    carry[term] = data
    return carry
  }, {})
}

async function fetchData() {
  const verbs = await fetchVerbs()
  const examples = await fetchExamples(['食べる', '食べた', '食べます', '食べません'])

  fs.writeFile(path.join(DATASETS_PATH, 'examples.json'), JSON.stringify(examples), 'utf-8')
  fs.writeFile(path.join(DATASETS_PATH, 'verbs.json'), JSON.stringify(verbs), 'utf-8')
}

fetchData()
