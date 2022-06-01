import { Inflection, Group }  from '../types'

function conjugateIchidan(verb: string, inflection: string) {
  let root
  try {
    root = verb.slice(0, -1)
  } catch (error) {
    console.info(verb)
    console.error(error)
  }

  switch (inflection) {
    case Inflection.Present:
      return `${root}る`
    case Inflection.PresentNegative:
      return `${root}ない`
    case Inflection.Polite:
      return `${root}ます`
    case Inflection.PoliteNegative:
      return `${root}ません`
    default:
      return verb
  }
}

function conjugateGodan(verb: string, inflection: string) {
  return verb
}

function conjugateIrregular(verb: string, inflection: string) {
  return verb
}

export default function conjugate(verb: string, inflection: string, group: string) {
  switch (group) {
    case Group.Ichidan:
      return conjugateIchidan(verb, inflection)
    case Group.Godan:
      return conjugateGodan(verb, inflection)
    default:
      return conjugateIrregular(verb, inflection)
  }
}
