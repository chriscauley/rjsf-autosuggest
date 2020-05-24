import pokemon from './pokemon.json'
import Autosuggest from '../src'

const schema = {
  type: 'object',
  properties: {
    pokemon: {
      type: 'integer',
      title: 'Choose your pokemon',
      enum: pokemon.map(({ id }) => id),
      enumNames: pokemon.map(({ name }) => name),
    },
  },
}

const uiSchema = {
  pokemon: {
    'ui:widget': Autosuggest,
    'ui:options': {
      // any options here will be passed to react-autosuggest
    },
  },
}

export default {
  title: 'Enum Names',
  path: 'enum-names',
  description:
    'Using both `enum` and `enumNames` on `schema.pokemon` allows the user to type in names and the form to save ids.',
  schema,
  uiSchema,
}
