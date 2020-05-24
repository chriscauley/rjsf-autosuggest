import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Form from 'react-jsonschema-form'

import step1 from './basic'
import step2 from './enum-names'
import step3 from './custom-render'
import Markdown from 'react-markdown'
import './styles.css'
import '../bootstrap.css'

class DemoStep extends React.Component {
  state = {}
  onSubmit = ({ formData }) => this.setState({ formData })
  render() {
    const { step } = this.props
    const { formData } = this.state
    return (
      <div className="row mx-auto mb-4 p-4" style={{ maxWidth: 720 }}>
        <div className="col-sm-6">
          <h3>{step.title}</h3>
          <Markdown>{step.description}</Markdown>
        </div>
        <div className="col-sm-6">
          <Form
            onSubmit={this.onSubmit}
            schema={step.schema}
            uiSchema={step.uiSchema}
          />
          {formData && <code>{JSON.stringify(formData)}</code>}
        </div>
      </div>
    )
  }
}

const MyComponent = () => {
  const steps = [step1, step2, step3]
  return (
    <div>
      {steps.map((step) => (
        <DemoStep key={step.title} step={step} />
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
