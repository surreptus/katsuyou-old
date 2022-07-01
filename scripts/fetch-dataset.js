const JishoAPI = require('unofficial-jisho-api')
const path = require('path')
const fs = require('node:fs/promises')
const JsLingua = require('jslingua')

const { SRC_PATH, DATASETS_PATH } = require('./constants')
const { Group, Inflection }= require('./types')

const TAGS = [
  'v1',
]

const morpho = JsLingua.gserv('morpho', 'jpn')
const jisho = new JishoAPI()

const Tense = morpho.Tense
const Mood = morpho.Mood
const Aspect = morpho.Aspect
const Formality = morpho.Formality

const SUPPORTED_INFLECTIONS = [
  { tense: Tense.Pr },
  { tense: Tense.Pa },
  { mood: Mood.Pot },
  { mood: Mood.Opt },
  { mood: Mood.Imp },
  { tense: Tense.Pr, aspect: Aspect.C },
  { tense: Tense.Pa, aspect: Aspect.C },
]

const POLITE = { formality: Formality.Po }
const PLAIN = { formality: Formality.Pl }
const POLITE_NEGATIVE = { ...POLITE, negated: true }
const PLAIN_NEGATIVE = { ...PLAIN, negated: true }

const ALL_PERMUTATIONS = SUPPORTED_INFLECTIONS.reduce((carry, inflection) =>
  carry.concat([
    { ...inflection, ...PLAIN },
    { ...inflection, ...POLITE },
    { ...inflection, ...PLAIN_NEGATIVE },
    { ...inflection, ...POLITE_NEGATIVE },
  ]),
  []
)

/**
 * returns a set of verbs for each group that are common
 *
 * @returns { [key: string]: string[] }
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
        carry.concat(ALL_PERMUTATIONS.map(
          inflection => morpho.conj(verb.slug, inflection)
        )),
        []
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
    if (data.length > 0) {
      carry[term] = data
    }

    return carry
  }, {})
}

async function fetchData() {
  const verbs = await fetchVerbs()
  const conjugated = await conjugateSupported(verbs)

  const examples = await fetchExamples(conjugated.v1.slice(0,2))
  console.log(examples)

  fs.writeFile(path.join(DATASETS_PATH, 'examples.json'), JSON.stringify(examples), 'utf-8')
  fs.writeFile(path.join(DATASETS_PATH, 'verbs.json'), JSON.stringify(verbs), 'utf-8')
}

fetchData()
