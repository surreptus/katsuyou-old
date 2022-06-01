const JishoAPI = require('unofficial-jisho-api')
const path = require('path')
const fs = require('node:fs/promises')
const conjugate = require('./utilities/conjugate')
const { Group, Inflection }= require('./types')

console.log(conjugate)

const TAGS = [
  'v1',
]

const SUPPORTED_INFLECTIONS = Object.values(Inflection)

const jisho = new JishoAPI()

/**
 * returns the group to be used for the given tag
 */

function getGroupFromTag(tag) {
  switch (tag) {
    case 'v1':
      return Group.Ichidan
    case 'v5k-s':
    case 'vs':
      return Group.Irregular
    default:
      return Group.Godan
  }
}

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
    const group = getGroupFromTag(tag)
    result[group] = verbs[tag]
      .reduce((carry, verb) =>
        carry.concat(SUPPORTED_INFLECTIONS.map(
          inflection => conjugate.default(verb.slug, inflection, group)
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
    console.log(uri)
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

  console.log(result)
}

fetchData()
