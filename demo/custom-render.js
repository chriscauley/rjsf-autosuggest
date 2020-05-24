import React from 'react'
import Autosuggest from '../src'
import pokemon from './pokemon.json'

const schema = {
  type: 'object',
  properties: {
    pokemon: {
      type: 'string',
      title: 'Choose your pokemon',
      enum: pokemon.map((p) => p.name),
    },
  },
}

const Type = ({ type }) => {
  const className =
    'mr-2 mt-n2 d-inline-block rounded-pill px-1 text-white type-' +
    type.toLowerCase()
  return <span className={className}>{type}</span>
}

const uiSchema = {
  pokemon: {
    'ui:widget': Autosuggest,
    'ui:options': {
      // all properties other than enumOptions (from schema) will be passed into Autosugest
      onSuggestionsClearRequested: () => {},
      renderSuggestion({ label }, { isHighlighted }) {
        const className =
          Autosuggest.config.css[isHighlighted ? 'activeItem' : 'item']
        const match = pokemon.find((p) => p.name === label)
        return (
          <div className={className}>
            <span className="mr-2">#{match.id}</span>
            <span className="mr-2">{label}</span>
            {match.type.map((type) => (
              <Type type={type} key={type} />
            ))}
          </div>
        )
      },
    },
  },
}

export default {
  title: 'Custom Render',
  description: '',
  schema,
  uiSchema,
}
