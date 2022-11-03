import React, { Component } from 'react';
import Props from 'prop-types';

export default class InputSearch extends Component {
  render() {
    const { search, change } = this.props;
    return (
      <input
        data-testid="search-artist-input"
        type="text"
        name="search"
        value={ search }
        onChange={ change }
        placeholder="Nome do artista ou banda"
      />
    );
  }
}

InputSearch.propTypes = {
  search: Props.string,
  isValid: Props.bool,
  change: Props.func,
}.isRequired;
