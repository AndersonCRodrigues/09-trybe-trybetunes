import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

const INTERVAL = 1000;

export default class Album extends Component {
  state = {
    title: '',
    musicas: [],
    loading: false,
    check: {},
    favoritas: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const [titulo, ...music] = await getMusics(id);
    this.setState({
      title: titulo,
      musicas: music,
    }, this.handleGetFavoriteSong);
  }

  handleGetFavoriteSong = async () => {
    const favorites = await getFavoriteSongs();
    const { musicas } = this.state;
    const filterFavorite = favorites.filter(({ collectionId }) => collectionId
    === musicas[0].collectionId);

    if (filterFavorite.length > 0) {
      this.setState({ loading: true });

      setTimeout(() => {
        const list = filterFavorite.filter(({ trackId }) => trackId === musicas
          .find((musica) => musica.trackId === trackId).trackId);

        list.forEach((element) => {
          this.setState((prev) => ({ check:
            { ...prev.check, [element.trackId]: true } }));
        });

        this.setState({ loading: false });
      }, INTERVAL);
    }
  };

  handleFavorite = ({ target }) => {
    const { id, checked, name } = target;
    const { musicas } = this.state;

    this.setState((prev) => ({ check: { ...prev.check, [name]: checked } }));

    if (checked) {
      this.setState({ loading: true });
      setTimeout(async () => {
        const getSong = musicas.find(({ trackId }) => +id === +trackId);
        addSong(getSong);
        const favoriteSongs = await getFavoriteSongs();
        this.setState({
          loading: false,
          favoritas: favoriteSongs,
        });
      }, INTERVAL);
    }
  };

  render() {
    const { musicas, title, loading, check, favoritas } = this.state;
    console.log(favoritas);
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
