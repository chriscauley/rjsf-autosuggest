import React from 'react'
import Autosuggest from 'react-autosuggest'

export const config = {
  css: {
    container: 'list-group',
    item: 'list-group-item list-group-item-action',
    activeItem: 'list-group-item list-group-item-action active',
    input: 'form-control',
  },
}

class RJSFAutosuggest extends React.Component {
  state = { suggestions: [] }

  getChoices() {
    return this.props.options.enumOptions || this.props.options.choices
  }
  getSuggestionValue = (s) => s.value || s
  onChange = (event, { newValue }) => this.props.onChange(newValue)
  onSuggestionsClearRequested = () => this.setState({ suggestions: [] })

  renderSuggestionsContainer = ({ containerProps, children }) => {
    containerProps.className = config.css.container
    return <div {...containerProps}>{children}</div>
  }

  renderSuggestion = (suggestion, { _query, isHighlighted }) => {
    const className = config.css[isHighlighted ? 'activeItem' : 'item']
    return <div className={className}>{suggestion.label || suggestion}</div>
  }

  onSuggestionsFetchRequested = ({ value = '' }) => {
    value = value.toLowerCase()
    const suggestions = this.getChoices().filter((o) =>
      (o.label || o).toLowerCase().includes(value),
    )
    this.setState({ suggestions })
  }

  getDisplayValue(value) {
    const choices = this.getChoices()
    const choice = choices.find((choice) => choice.value === value)
    return choice ? choice.label : value
  }

  render() {
    const { value = '', placeholder } = this.props

    const options = Object.assign({}, this.props.options)
    delete options.enumOptions

    const inputProps = options.inputProps || {
      placeholder,
      onChange: this.onChange,
      value: this.getDisplayValue(value),
    }

    inputProps.className = config.css.input

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        {...options}
      />
    )
  }
}

RJSFAutosuggest.config = config

export default RJSFAutosuggest
