const JishoAPI = require('unofficial-jisho-api')
const path = require('path')
const fs = require('node:fs/promises')
const { Group, Inflection }= require('./types')
const JsLingua = require('jslingua')

const TAGS = [
  'v1',
]

const SUPPORTED_INFLECTIONS = [
  'present',
  'past'
]

const morpho = JsLingua.gserv('morpho', 'jpn')
const jisho = new JishoAPI()

console.log(morpho)

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
  const result = await fetchVerbs()
  console.log('conjugated', conjugateSupported(result))
  // const result = await fetchExamples(['食べた'])
}

fetchData()
