import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import pokemon from './pokemon.json'
import Autosuggest from '../src'
import '../bootstrap.css'
import step2 from './custom-render'

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
      // alwaysRenderSuggestions: true,
    },
  },
}

const MyComponent = () => {
  return (
    <div>
      <div className="row mx-auto" style={{ maxWidth: 720 }}>
        <div className="col-sm-6">
          <h3>Basic</h3>
        </div>
        <div className="col-sm-6">
          <Form schema={schema} uiSchema={uiSchema} />
        </div>
      </div>
      <div className="row mx-auto" style={{ maxWidth: 720 }}>
        <div className="col-sm-6">
          <h3>{step2.title}</h3>
          {step2.description}
        </div>
        <div className="col-sm-6">
          <step2.Component />
        </div>
      </div>
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
