import { Inflection, Group }  from '../types'

function conjugateIchidan(verb: string, inflection: Inflection) {
  const root = verb.slice(0, -1)

  switch (inflection) {
    case Inflection.Present:
      return `${root}る`
    case Inflection.PresentNegative:
      return `${root}ない`
    default:
      return verb
  }
}

console.log({
  inflection: Inflection.Present,
  name: 'derp'
})

function conjugateGodan(verb: string, inflection: Inflection) {
}

function conjugateIrregular(verb: string, inflection: Inflection) {
}

export default function conjugate(verb: string, inflection: Inflection, group: Group) {
  switch (group) {
    case Group.Ichidan:
      return conjugateIchidan(verb, inflection)
    case Group.Godan:
      return conjugateGodan(verb, inflection)
    default:
      return conjugateIrregular(verb, inflection)
  }
}
