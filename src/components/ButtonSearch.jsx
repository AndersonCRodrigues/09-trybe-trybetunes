import React, { Component } from 'react';
import Props from 'prop-types';

export default class ButtonSearch extends Component {
  render() {
    const { isValid, click } = this.props;
    return (
      <button
        data-testid="search-artist-button"
        type="submit"
        disabled={ isValid }
        onClick={ click }
      >
        Pesquisar

      </button>
    );
  }
}

ButtonSearch.propTypes = {
  isValid: Props.bool,
  click: Props.func,
}.isRequired;
