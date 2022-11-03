import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    search: '',
    isValid: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const NUM = 2;
    this.setState({ search: value });

    if (value.length >= NUM) this.setState({ isValid: false });
    else this.setState({ isValid: true });
  };

  render() {
    const { search, isValid } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            value={ search }
            onChange={ this.handleChange }
            placeholder="Nome do artista ou banda"
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ isValid }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
