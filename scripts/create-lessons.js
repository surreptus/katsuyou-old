const path = require('path')
const fs = require('node:fs/promises')

const verbs = require('../datasets/verbs')
const { Inflection, Group } = require('./types')

const ROOT = path.resolve(__dirname, '..')

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

async function createLessons() {
    let lessons = []

    for (const tag in verbs) {
        const group = getGroupFromTag(tag)

        lessons = lessons.concat(verbs[tag].map(entry => ({
            group,
            verb: entry.slug,
            sentence: entry.slug,
            tags: entry.jlpt.concat(entry.tags),
            reading: entry.japanese[0].reading,
            definitions: entry.senses[0].english_definitions
        })))
    }

    await fs.writeFile(
        path.join(ROOT, 'src', 'lessons.json'),
        JSON.stringify(lessons),
        'utf8'
    )
}

console.log(createLessons())
