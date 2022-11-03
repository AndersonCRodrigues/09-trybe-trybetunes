import React, { Component } from 'react';
import Props from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, handleFavorite, check } = this.props;
    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name={ trackId }
            onChange={ handleFavorite }
            id={ trackId }
            checked={ check }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: Props.string,
  previewUrl: Props.string,
  trackId: Props.number,
  handleFavorite: Props.func,
}.isRequired;
