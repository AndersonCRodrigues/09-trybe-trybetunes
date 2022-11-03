import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    title: '',
    musicas: [],
    loading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const [titulo, ...music] = await getMusics(id);
    this.setState({
      title: titulo,
      musicas: music,
      check: {},
    });
  }

  handleFavorite = ({ target }) => {
    const { id, checked, name } = target;
    const { musicas } = this.state;
    const INTERVAL = 1000;

    this.setState((prev) => ({ check: { ...prev.check, [name]: checked } }));

    if (checked) {
      this.setState({ loading: true });
      setTimeout(() => {
        const getSong = musicas.find(({ trackId }) => +id === +trackId);
        addSong(getSong);
        this.setState({ loading: false });
      }, INTERVAL);
    }
  };

  render() {
    const { musicas, title, loading, check } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading && <Loading />}
        {loading || <h2 data-testid="artist-name">{title.artistName}</h2> }
        {loading || <h3 data-testid="album-name">{title.collectionName}</h3>}
        {loading || musicas.map((musica, index) => (<MusicCard
          key={ musica.trackId + index }
          trackName={ musica.trackName }
          previewUrl={ musica.previewUrl }
          trackId={ musica.trackId }
          handleFavorite={ this.handleFavorite }
          check={ check[musica.trackId] }
        />)) }
      </div>
    );
  }
}

Album.propTypes = {
  match: Props.shape({
    params: Props.shape({
      id: Props.number,
    }),
  }),
}.isRequired;
