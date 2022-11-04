import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    user: {},
    loading: true,
  };

  async componentDidMount() {
    const info = await getUser();
    this.setState({
      user: info,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h2>Perfil</h2>
        {loading && <Loading />}
        {loading || (
          <section>
            <img
              data-testid="profile-image"
              src={ user.image }
              alt={ user.name }
              width="300px"
            />
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </section>
        )}
      </div>
    );
  }
}
