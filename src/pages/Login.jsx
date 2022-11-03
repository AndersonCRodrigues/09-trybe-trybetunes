import React, { Component } from 'react';
import Props from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
    isValid: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const LIMIT = 3;
    this.setState({ name: value });
    if (value.length >= LIMIT) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { history } = this.props;
    const { name } = this.state;
    createUser({ name });
    history.push('/search');
  };

  render() {
    const { name, isValid, loading } = this.state;

    if (loading) return (<Loading />);

    return (
      <div data-testid="page-login">
        login
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ isValid }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: Props.shape({
    push: Props.func,
  }),
}.isRequired;
