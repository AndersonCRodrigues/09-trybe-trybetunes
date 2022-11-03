import React, { Component } from 'react';
import Props from 'prop-types';

export default class ShowSearch extends Component {
  render() {
    const { search } = this.props;
    return (
      <p>
        {`Resultado de álbuns de: ${search}`}
      </p>
    );
  }
}

ShowSearch.propTypes = {
  search: Props.string.isRequired,
};
