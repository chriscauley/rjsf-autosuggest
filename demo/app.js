import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import pokemon from './pokemon.json'
import Autosuggest from '../src'
import '../bootstrap.css'

const schema = {
  type: 'object',
  properties: {
    pokemon: {
      type: 'string',
      title: 'Choose your pokemon',
      enum: pokemon.map(({ name }) => name),
      // autosuggestProps: {alwaysRenderSuggestions: 'DEBUG'}
    },
  },
}

const uiSchema = {
  pokemon: {
    'ui:widget': Autosuggest,
    autosuggestprops: 'woo',
  },
}

const MyComponent = () => {
  return (
    <div className="mx-auto" style={{ maxWidth: 360 }}>
      <Form schema={schema} uiSchema={uiSchema} />
    </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={MyComponent} />
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-app'))
