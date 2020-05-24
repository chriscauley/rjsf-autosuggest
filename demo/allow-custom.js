import Autosuggest from '../src'
import pokemon from './pokemon.json'

const schema = {
  type: 'object',
  properties: {
    pokemon: {
      type: 'string',
      title: 'Choose a pokemon (or whatever)',
    },
  },
}

const uiSchema = {
  pokemon: {
    'ui:widget': Autosuggest,
    'ui:options': {
      choices: pokemon.map(({ id }) => id),
    },
  },
}

export default {
  title: 'Allow Custom',
  path: 'allow-custom',
  description:
    "Using `uiSchema['ui:options'].choices` instead of `schema.enum` makes custom values allowed. Try submiting 'Godzilla'.",
  schema,
  uiSchema,
}
