import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

// inputValue => termInput
// add: locInput

class SearchBar extends Component {
  state = {
    terms: [],
    termInput: '',
    locInput: '',
    location: '',
    invalidSearch: false
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleAddTerm = evt => {
    evt.preventDefault();
    this.setState({
      terms: [...this.state.terms, this.state.termInput],
      termInput: ''
    });
    evt.target.reset();
  };

  handleSetLocation = evt => {
    evt.preventDefault();
    this.setState({ location: this.state.locInput, locInput: '' });
  };

  handleSubmitSearch = evt => {
    const passedTerms = this.state.terms;
    const passedLocation = this.state.location;
    if (passedTerms.length === 0 || passedLocation === '') {
      console.log('invalid search');
      this.setState({ invalidSearch: true });
      return;
    }
    this.props.triggerSearch(passedTerms, passedLocation);
    this.setState({
      terms: [],
      termInput: '',
      locInput: '',
      location: '',
      invalidSearch: false
    });
  };

  render() {
    const invalidMsg = 'Please provide a location and at least one search term';
    const terms = this.state.terms.map(term => {
      return <span key={uuidv1()}>{term} </span>;
    });
    const location = this.state.location;
    return (
      <div className="searchBar">
        (Search bar)
        <form onSubmit={this.handleSetLocation}>
          <label>Location to search</label>
          <input
            type="text"
            name="locInput"
            value={this.state.locInput} //nuh uh
            onChange={this.handleChange} //nuh uh
          />
          <input type="submit" value="Add term" />
        </form>
        <form onSubmit={this.handleAddTerm}>
          <label>Enter search term</label>
          <input
            type="text"
            name="termInput"
            value={this.state.termInput}
            onChange={this.handleChange}
          />
          <input type="submit" value="Add term" />
        </form>
        Terms: {terms} | Location: {location} |{' '}
        {this.state.invalidSearch ? invalidMsg : ''}
        <button onClick={this.handleSubmitSearch}>Submit search</button>
      </div>
    );
  }
}

export default SearchBar;
