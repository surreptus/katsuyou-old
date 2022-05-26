const JishoAPI = require('unofficial-jisho-api')
const fs = require('fs')

const jisho = new JishoAPI()

async function fetchData() {
  const results = await jisho.searchForPhrase('#v1 #common')
  console.log(results.data.length)
}

fetchData()
