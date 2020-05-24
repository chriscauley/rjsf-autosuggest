import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Form from 'react-jsonschema-form'

import step1 from './basic'
import step2 from './allow-custom'
import step3 from './enum-names'
import step4 from './custom-render'
import step5 from './multiple-sections'
import Markdown from 'react-markdown'
import './styles.css'
import '../bootstrap.css'

const _link = (s) =>
  `https://github.com/chriscauley/rjsf-autosuggest/blob/master/demo/${s}.js`

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
          <a href={_link(step.path)}>View Source</a>
        </div>
        <div className="col-sm-6">
          {step.Component ? (
            <step.Component onSubmit={this.onSubmit} />
          ) : (
            <Form
              onSubmit={this.onSubmit}
              schema={step.schema}
              uiSchema={step.uiSchema}
            />
          )}
          {formData && <code>{JSON.stringify(formData)}</code>}
        </div>
      </div>
    )
  }
}

const MyComponent = () => {
  const steps = [step1, step2, step3, step4, step5]
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
