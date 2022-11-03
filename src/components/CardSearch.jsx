import React, { Component } from 'react';
import Props from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardSearch extends Component {
  render() {
    const { image, album, artista, collectionId } = this.props;
    return (
      <Link to={ `/album/${collectionId}` }>
        <div data-testid={ `link-to-album-${collectionId}` }>
          <img src={ image } alt={ album } />
          <p>{album}</p>
          <p>{artista}</p>
        </div>
      </Link>
    );
  }
}

CardSearch.propTypes = {
  image: Props.string,
  album: Props.string,
  artista: Props.string,
  collectionId: Props.number,
}.isRequired;
