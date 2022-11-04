import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEditor extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: true,
    validation: true,
  };

  async componentDidMount() {
    const info = await getUser();
    const { name, email, image, description } = info;
    this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    }, (this.handlValidation));
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, (this.handlValidation));
  };

  handlValidation = () => {
    const { name, email, description, image } = this.state;

    if (name.length > 0
      && email.length > 0
      && image.length > 0
      && description.length > 0) {
      this.setState({ validation: false });
    } else {
      this.setState({ validation: true });
    }
  };

  handleUpdateUser = (e) => {
    e.preventDefault();

    const { name, email, description, image } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });

    updateUser({ name, email, image, description });

    history.push('/profile');
  };

  render() {
    const { name, email, image, description, validation, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        ProfileEditor
        {loading && <Loading />}
        {loading || (
          <div>
            <img src={ image } alt={ name } width="100px" />
            <form>
              <label htmlFor="image">
                Foto:
                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  id="image"
                  value={ image }
                  placeholder="Insira o link de uma imagem"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="name">
                Nome:
                <input
                  data-testid="edit-input-name"
                  type="text"
                  name="name"
                  id="name"
                  value={ name }
                  placeholder="Insira um nome"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                E-mail:
                <input
                  data-testid="edit-input-email"
                  type="email"
                  name="email"
                  id="email"
                  value={ email }
                  placeholder="Insira email"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <textarea
                  data-testid="edit-input-description"
                  name="description"
                  id="description"
                  value={ description }
                  placeholder="Insira sua descrição"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ validation }
                onClick={ this.handleUpdateUser }
              >
                Salvar

              </button>
            </form>
          </div>
        )}

      </div>
    );
  }
}

ProfileEditor.propTypes = {
  history: Props.shape({
    push: Props.func,
  }),
}.isRequired;
