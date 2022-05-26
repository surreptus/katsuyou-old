const JishoAPI = require('unofficial-jisho-api')
const path = require('path')
const fs = require('node:fs/promises')
const conjugate = require('./utilities/conjugate')
const types = require('./types')

const TAGS = [
  'v1',
  'vs'
]

const jisho = new JishoAPI()

interface Result {
  [key: string]: JishoResult
}

async function fetchVerbs() {
  const searches = await Promise.all(TAGS.map(async (tag) => {
    const { data } = await jisho.searchForPhrase(`#${tag} #common #word`)
    return [tag, data]
  }))

  const result = searches.reduce((carry: Result, [tag, data]: [string, JishoResult[]]) => {
    carry[tag] = data
    return carry
  }, {})

  await fs.writeFile(path.join('datasets', 'verbs.json'), JSON.stringify(result), 'utf8')

  return result
}

async function fetchData() {
  const result = await fetchVerbs()

  /*
  const inflections = Object.keys(result)
    .reduce((carry, tag) => carry.concat(result[tag]), [])
    .map((verb) => {
      const group = getGroupFromVerb(verb)
      return SUPPORTED_INFLECTIONS.map(inflection => conjugate(verb, inflection, group))
    })
    */
}

fetchData()
