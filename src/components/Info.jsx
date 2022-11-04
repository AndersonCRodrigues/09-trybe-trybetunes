import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Props from 'prop-types';

export default class Info extends Component {
  render() {
    const { image, name, email, description } = this.props;
    return (
      <section>
        <img
          data-testid="profile-image"
          src={ image }
          alt={ name }
        />
        <h4>Nome</h4>
        <p>{name}</p>
        <h4>E-mail</h4>
        <p>{email}</p>
        <h4>Descrição</h4>
        <p>{description}</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </section>
    );
  }
}

Info.propTypes = {
  image: Props.string,
  name: Props.string,
  email: Props.string,
  description: Props.string,
}.isRequired;
