import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Nav from './Nav';

export default class Header extends Component {
  state = {
    login: {},
    loading: true,
  };

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      login: data,
      loading: false,
    });
  }

  render() {
    const { login, loading } = this.state;

    if (loading) return (<Loading />);

    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <p data-testid="header-user-name">
          Olá,
          {' '}
          {login.name}
        </p>
        <Nav />
      </header>
    );
  }
}
