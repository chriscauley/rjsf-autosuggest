import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import pokemon from './pokemon.json'
import Autosuggest from '../src'
import '../bootstrap.css'
import step1 from './basic'
import step2 from './custom-render'

const MyComponent = () => {
  const steps = [step1, step2]
  return (
    <div>
      {steps.map(step => (
        <div className="row mx-auto" style={{ maxWidth: 720 }}>
          <div className="col-sm-6">
            <h3>{step.title}</h3>
            {step.description}
          </div>
          <div className="col-sm-6">
            <step.Component />
          </div>
        </div>
      ))}
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
