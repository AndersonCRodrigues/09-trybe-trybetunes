import React, { Component } from 'react';
import ButtonSearch from '../components/ButtonSearch';
import CardSearch from '../components/CardSearch';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import Loading from '../components/Loading';
import ShowSearch from '../components/ShowSearch';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    search: '',
    isValid: true,
    loading: false,
    showSearch: false,
    returnSearch: '',
    noReturn: false,
    lista: [],
  };

  change = ({ target }) => {
    const { value } = target;
    const NUM = 2;
    this.setState({ search: value });

    if (value.length >= NUM) this.setState({ isValid: false });
    else this.setState({ isValid: true });
  };

  click = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
      showSearch: false,
      noReturn: false,
    });

    const { search } = this.state;
    const retorno = await searchAlbumsAPI(search);

    if (retorno.length > 1) {
      this.setState((prev) => ({
        lista: retorno,
        loading: false,
        showSearch: true,
        returnSearch: prev.search,
        search: '',
      }));
    } else {
      this.setState({
        noReturn: true,
        loading: false,
        search: '',
      });
    }
  };

  render() {
    const { search, isValid, loading,
      showSearch, noReturn, lista, returnSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          {loading && <Loading /> }
          {loading || <InputSearch search={ search } change={ this.change } />}
          {loading || <ButtonSearch isValid={ isValid } click={ this.click } />}
        </form>
        {noReturn && <p>Nenhum álbum foi encontrado</p>}
        {showSearch && <ShowSearch search={ returnSearch } /> }
        {showSearch && lista.map((busca, index) => (<CardSearch
          key={ busca.artistName + index }
          image={ busca.artworkUrl100 }
          album={ busca.collectionName }
          artista={ busca.artistName }
          collectionId={ busca.collectionId }
        />))}
      </div>
    );
  }
}
