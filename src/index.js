import React from 'react'
import Autosuggest from 'react-autosuggest'

class RJSFAutosuggest extends React.Component {
  state = { suggestions: [] }

  onChange = (event, { newValue }) => this.props.onChange(newValue)
  onSuggestionsClearRequested = () => this.setState({ suggestions: [] })

  renderSuggestionsContainer = ({ containerProps, children }) => {
    containerProps.className = this.constructor.css.container
    return <div {...containerProps}>{children}</div>
  }

  renderSuggestion = ({ name }) => {
    const className = this.constructor.css.item
    return <div className={className}>{name}</div>
  }

  onSuggestionsFetchRequested = ({ value }) => {
    value = value.toLowerCase()
    const suggestions = this.props.schema.enum
      .filter((e) => e.toLowerCase().includes(value))
      .map((name) => ({ name }))
    this.setState({ suggestions })
  }

  render() {
    const { value = '', placeholder } = this.props

    const inputProps = {
      onChange: this.onChange,
      placeholder,
      value,
      className: 'form-control',
    }

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

RJSFAutosuggest.css = {
  container: 'list-group',
  item: 'list-group-item list-group-item-action',
}

export default RJSFAutosuggest
