import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import pokemon from './pokemon.json'
import Autosuggest from '../src'

const schema = {
  type: 'object',
  properties: {
    pokemon: {
      type: 'string',
      title: 'Choose your pokemon',
      enum: pokemon.map(({ name }) => name),
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

const Component = () => <Form schema={schema} uiSchema={uiSchema} />

export default {
  Component,
  title: "Basic",
  path: "basic",
  description: "A react-autosuggest component using only react-jsonschema-form options"
}
