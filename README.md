# rjsf-autosuggest

This package connects [react-autosuggest](http://github.com/moroshko/react-autosuggest) to [react-jsonschema-form](http://github.com/rjsf-team/react-jsonschema-form). A [live demo](http://chriscauley.github.io/rjsf-autosuggest) of everything shown here can be viewed on this projects github page.

## Basic Usage

Install with `yarn add rjsf-autosuggest`, import, and add Autosuggest to the uiSchema for any field. This will work normally with the enum and enumNames of react-jsonschema-form to make an autocomplete widget.

``` javascript
import React from 'react'
import Form from 'react-jsonschema-form'
import Autosuggest from 'rjsf-autosuggest'

import pokemon from './pokemon.json'

const schema = {
  type: 'object'
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

const PokemonForm = () => {
  return (
    <Form schema={schema} uiSchema={uiSchema}
  )
}
```

## Allow Custom Calues

`react-autosuggest` doesn't forbid custom values by default, but rjsf's enum forces the value to be one of the designated choices. To fix this use `uiSchema['ui:options'].choices` instead of `schema.enum`.

``` javascript
const schema = {
  type: 'object',
  properties: {
  pokemon: {
    type: 'string',
    title: 'Choose a pokemon (or whatever)',
  },
}

const uiSchema = {
  pokemon: {
  'ui:widget': Autosuggest,
  'ui:options': {
    choices: pokemon.map(({ id }) => id),
  },
}
```

## Advanced usage

This component acts mostly as a pass-through for `react-autosuggest`. Theoretically any props can be passed through via `uiSchema[field_name]['ui:options']` for complete control of the autosuggest component. For example, to render more than just the label of the suggestion.

``` javascript
const uiSchema = {
  pokemon: {
  'ui:widget': Autosuggest,
  'ui:options': {
    // all properties other than enumOptions (from schema) will be passed into Autosugest
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
}
```

Overriding more complicated behavior could be difficult because they use the internal state of the component. Feel free to open an issue if you have trouble overriding other attributes. If you want to override more functionality, I recommend copying [src/index.js](src/index.js) of this project and modifying it directly (it's actually much shorter than this README).

## Styling

In the custom of `react-jsonschema-form` I used bootstrap syntax for the form components styling. Additionally, there are some custom class names on `react-autosuggest` which cannot be changed. Look at [bootstrap.css](bootstrap.css) for the minimum number of changes necessary to make this work with stock bootstrap v4.

If you want to override the classNames, there is a `Autosuggest.config.css` object which can be modified. Below are the default values (so this example is a no-op).

``` javascript
import Autosuggest from 'rjsf-autosuggest'

Autosuggest.config.css = {
  input: 'form-control',
  container: 'list-group',
  item: 'list-group-item list-group-item-action',
  activeItem: 'list-group-item list-group-item-action active',
}
```

If you have trouble debugging style (because the menu closes when using the element inspector), I recommend adding the following attributes to force the menu to stay open.

``` javascript
const uiSchema = {
  pokemon: {
    'ui:options': {
      alwaysRenderSuggestions: true,
      onSuggestionsClearRequested: () => {},
    }
  }
}
```