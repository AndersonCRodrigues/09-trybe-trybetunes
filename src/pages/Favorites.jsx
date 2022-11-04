import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

const INTERVAL = 1000;

export default class Favorites extends Component {
  state = {
    favoritas: [],
    check: {},
    loading: false,
  };

  async componentDidMount() {
    const getFavorite = await getFavoriteSongs();
    this.setState({ favoritas: getFavorite }, (this.handleChecked));
  }

  handleChecked = () => {
    const { favoritas } = this.state;

    if (favoritas.length > 0) {
      favoritas.forEach((musica) => {
        this.setState((prev) => ({ check: { ...prev.check, [musica.trackId]: true } }));
      });
    }
  };

  handleFavorite = ({ target }) => {
    const { id, checked } = target;
    const { favoritas } = this.state;

    if (!checked) {
      this.setState({ loading: true });

      setTimeout(async () => {
        const getSong = favoritas.find(({ trackId }) => +id === +trackId);
        removeSong(getSong);
        const favoriteSongs = await getFavoriteSongs();
        this.setState({
          favoritas: favoriteSongs,
          loading: false,
        });
      }, INTERVAL);
    }
  };

  render() {
    const { favoritas, check, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Músicas Favoritas</h2>
        {loading && <Loading />}
        {loading || favoritas.map((musica, index) => (<MusicCard
          key={ musica.trackId + index }
          trackName={ musica.trackName }
          previewUrl={ musica.previewUrl }
          trackId={ musica.trackId }
          handleFavorite={ this.handleFavorite }
          check={ check[musica.trackId] }
        />))}
      </div>
    );
  }
}
