import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    title: '',
    musicas: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const [titulo, ...music] = await getMusics(id);
    this.setState({
      title: titulo,
      musicas: music,
    });
  }

  render() {
    const { musicas, title } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{title.artistName}</h2>
        <h3 data-testid="album-name">{title.collectionName}</h3>
        {musicas.map((musica, index) => (<MusicCard
          key={ musica.trackId + index }
          trackName={ musica.trackName }
          previewUrl={ musica.previewUrl }
        />))}
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
