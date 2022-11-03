import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEditor from './pages/ProfileEditor';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/search" component={ Search } exact />
          <Route path="/album/:id" component={ Album } exact />
          <Route path="/favorites" component={ Favorites } exact />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEditor } exact />
          <Route path="/" component={ Login } exact />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
