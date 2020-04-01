import React from 'react';
import Autosuggest from 'react-autosuggest';
import './styles.css'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(data,value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return data.filter(data_ele => regex.test(data_ele.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
 export default class AutoSuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }
    languages = [
     {
       name: 'C',
       year: 1972
     },
     {
       name: 'C#',
       year: 2000
     },
     {
       name: 'C++',
       year: 1983
     },
     {
       name: 'Clojure',
       year: 2007
     },
     {
       name: 'Elm',
       year: 2012
     },
     {
       name: 'Go',
       year: 2009
     },
     {
       name: 'Haskell',
       year: 1990
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
       name: 'Perl',
       year: 1987
     },
     {
       name: 'PHP',
       year: 1995
     },
     {
       name: 'Python',
       year: 1991
     },
     {
       name: 'Ruby',
       year: 1995
     },
     {
       name: 'Scala',
       year: 2003
     }
   ];
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.languages,value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

