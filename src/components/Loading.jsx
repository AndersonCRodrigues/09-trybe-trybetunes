import React, { Component } from 'react';
import loading from '../image/loading.gif';
import '../styles/loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={ loading } alt="loading" />
        <p>Carregando...</p>
      </div>
    );
  }
}
