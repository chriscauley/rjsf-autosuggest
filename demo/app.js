import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import pokemon from './pokemon.json'

console.log(pokemon)

const schema = {
  type: 'object',
  properties: {
    pokemon: {
      type: 'string',
      title: 'Choose your pokemon',
      enum: pokemon.map(({name}) => name)
    }
  }
}

const MyComponent = props => {
  return (
    <div className="mx-auto" style={{maxWidth: 360}}>
      <Form schema={schema} />
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

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
)