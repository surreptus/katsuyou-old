const JishoAPI = require('unofficial-jisho-api')
const path = require('path')
const fs = require('node:fs/promises')
const JsLingua = require('jslingua')

const { SRC_PATH, DATASETS_PATH } = require('./constants')
const { Group, Inflection }= require('./types')

/**
 * common types
 *
 * @typedef Inflection
 * @type { object }
 * @property { string } tense
 * @property { string } mood 
 * @property { string } aspect
 * @property { string } formality
 * @property { boolean } negated 
 *
 * @typedef Lesson
 * @type { object }
 * @property { string } group
 * @property { string } verb
 * @property { string } meaning
 * @property { string[] } sentence 
 * @property { string } translation
 * @property { string } answer
 * @property { Inflection } inflection
 */

const GROUPS = [
  'v1',
]

const morpho = JsLingua.gserv('morpho', 'jpn')
const jisho = new JishoAPI()

const Tense = morpho.Tense
const Mood = morpho.Mood
const Aspect = morpho.Aspect
const Formality = morpho.Formality

/**
 * these are all the inflections that are currently supported by the
 * application. we combine these with politeness and  negation to return
 * the full set of possible verbs to search examples by.
 */

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
 * returns the correct verb version to be used based on the tags present.
 */

const KANA_TAG = "Usually written using kana alone"

function getAppropriateVersion (result) {
  if (result.tags.includes(KANA_TAG)) {
    return result.japanese[0].reading
  }

  return result.slug
}

/**
 * returns a set of verbs for each group that are common
 *
 * @returns { [key: string]: Lesson[] }
 */

async function fetchVerbs() {
  // returns a list of common verbs for each of the provided groups
  const results = await Promise.all(GROUPS.map(async (group) => {
    // starts assemling the lesson object by creating an object with the group,
    // verb and most common meaning
    const { data } = await jisho.searchForPhrase(`#${group} #common #word`)

    return data.map(result => ({
      group,
      verb: getAppropriateVersion(result),
      meaning: result.senses[0].english_definitions[0]
    }))
  }))

  return results.flat()
}

/**
 * returns a list of conjugated verbs with the inflection used to
 * generate them.
 *
 * @returns { Lesson }
 */

async function conjugateSupported(results) {
  return results.reduce((carry, result) => carry.concat(ALL_PERMUTATIONS.map(
    inflection => ({
      ...result,
      conjugation: morpho.conj(result.verb, inflection),
      inflection
    })
  )), [])
}

/**
 * returns a set of sentences for the provided terms, keyed by the
 * triggering search
 */

function chunkArray (list, maxSize) {
  return list.reduce((carry, item, index) => {
    const rest = carry.slice(0,-1)
    const current = carry[carry.length - 1]

    if (current.length > maxSize) {
      return [
        ...rest,
        current,
        [item]
      ]
    }

    return [
      ...rest,
      current.concat(item)
    ]
  }, [[]])
}

async function delay(time) {
  return new Promise(resolve => {
    setTimeout(() => { resolve() }, time)
  })
}

async function fetchExamples(lessons) {
  return await Promise.all(lessons.map(async (lesson) => {
    try {
      const { results } = await jisho.searchForExamples(lesson.conjugation)

      return {
        ...lesson,
        sentences: results.map(result => ({
          translation: result.english,
          original: result.pieces
        }))
      }
    } catch (error) {
      console.error(error.message)
    }
  }))
}

/**
 * 
 */

function filterInvalid (lessons) {
  return lessons.filter(lesson => lesson.sentences.length !== 0)
}

async function fetchData() {
  const verbs = await fetchVerbs()
  const conjugated = await conjugateSupported(verbs.slice(0,1))

  const examples = await fetchExamples(conjugated)
  const lessons = filterInvalid(examples)

  // fs.writeFile(path.join(DATASETS_PATH, 'examples.json'), JSON.stringify(examples), 'utf-8')
  // fs.writeFile(path.join(DATASETS_PATH, 'verbs.json'), JSON.stringify(verbs), 'utf-8')
  fs.writeFile(path.join(SRC_PATH, 'lessons.json'), JSON.stringify(lessons), 'utf-8')
}

fetchData()
