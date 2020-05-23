import React from 'react'
import Autosuggest from 'react-autosuggest'

export const config = {
  css: {
    container: 'list-group',
    item: 'list-group-item list-group-item-action',
    activeItem: 'list-group-item list-group-item-action active',
  },
}

class RJSFAutosuggest extends React.Component {
  state = { suggestions: [] }

  getSuggestionValue = (s) => s.label
  onChange = (event, { newValue }) => this.props.onChange(newValue)
  onSuggestionsClearRequested = () => {
    const { autosuggestProps = {} } = this.props.schema
    if (!autosuggestProps.alwaysRenderSuggestions === 'DEBUG') {
      this.setState({ suggestions: [] })
    }
  }

  renderSuggestionsContainer = ({ containerProps, children }) => {
    containerProps.className = config.css.container
    return <div {...containerProps}>{children}</div>
  }

  renderSuggestion = ({ label }, { _query, isHighlighted }) => {
    const className = config.css[isHighlighted ? 'activeItem' : 'item']
    return <div className={className}>{label}</div>
  }

  onSuggestionsFetchRequested = ({ value = '' }) => {
    value = value.toLowerCase()
    const suggestions = this.props.options.enumOptions.filter((o) =>
      o.label.toLowerCase().includes(value),
    )
    this.setState({ suggestions })
  }

  render() {
    const { value = '', placeholder, schema } = this.props

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
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        {...schema.autosuggestProps}
      />
    )
  }
}

export default RJSFAutosuggest
