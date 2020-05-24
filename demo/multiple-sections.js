// This has been largely copied from the react-autosuggest codepen example
// https://codepen.io/moroshko/pen/qbRNjV?editors=0110
/* eslint-disable */
import React from 'react'
import Autosuggest from '../src'
import Form from 'react-jsonschema-form'

const languages = [
  {
    title: '1970s',
    languages: [
      {
        name: 'C',
        year: 1972
      }
    ]
  },
  {
    title: '1980s',
    languages: [
      {
        name: 'C++',
        year: 1983
      },
      {
        name: 'Perl',
        year: 1987
      }
    ]
  },
  {
    title: '1990s',
    languages: [
      {
        name: 'Haskell',
        year: 1990
      },
      {
        name: 'Python',
        year: 1991
      },
      {
        name: 'Java',
        year: 1995
      },
      {
        name: 'Javascript',
        year: 1995
      },
      {
        name: 'PHP',
        year: 1995
      },
      {
        name: 'Ruby',
        year: 1995
      }
    ]
  },
  {
    title: '2000s',
    languages: [
      {
        name: 'C#',
        year: 2000
      },
      {
        name: 'Scala',
        year: 2003
      },
      {
        name: 'Clojure',
        year: 2007
      },
      {
        name: 'Go',
        year: 2009
      }
    ]
  },
  {
    title: '2010s',
    languages: [
      {
        name: 'Elm',
        year: 2012
      }
    ]
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages
    .map(section => {
      return {
        title: section.title,
        languages: section.languages.filter(language => regex.test(language.name))
      };
    })
    .filter(section => section.languages.length > 0);
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span className={Autosuggest.config.css.item}>{suggestion.name}</span>
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.languages;
}

class MultiSection extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const schema = {
      type: 'object',
      properties: {
        language: {type: 'string'}
      }
    }
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

    const uiSchema = {
      language: {
        'ui:widget': Autosuggest,
        'ui:options': {
          multiSection: true,
          suggestions: suggestions,
          onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
          onSuggestionsClearRequested: this.onSuggestionsClearRequested,
          getSuggestionValue: getSuggestionValue,
          renderSuggestion: renderSuggestion,
          renderSectionTitle: renderSectionTitle,
          getSectionSuggestions: getSectionSuggestions,
          inputProps: inputProps
        }
      }
    }
    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={this.props.onSubmit}
      />
    )
  }
}

export default {
  Component: MultiSection,
  title: 'Multiple Sections',
  path: 'multi-sections',
  description: 'This is a copy of the react-autosuggest demo of the same name. This is just meant to show that all properties can be passed into uiSchema\'s `ui:options` to fully control the component. If you want to make this many changes I recommend just copying src/index.js from the source repo and modifying that to suit your needs.'
}