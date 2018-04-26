import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Routes from './Routes';
import Header from '../containers/Header';
import * as AuthService from '../utils/AuthService';

class App extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    loginError: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  componentWillMount() {
    const { history, loginError, loginSuccess } = this.props;
    // Add callback for lock's `authenticated` event
    AuthService.lock.on('authenticated', authResult => {
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return loginError(error);
        }
        AuthService.clearOldNonces(); 
        AuthService.setToken(authResult.idToken); // static method
        AuthService.setProfile(profile); // static method
        loginSuccess(profile);
        history.push({ pathname: '/' });
        AuthService.lock.hide();
      });
    });
    // Add callback for lock's `authorization_error` event
    AuthService.lock.on('authorization_error', error => {
      loginError(error);
      history.push({ pathname: '/' });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Routes isAuthenticated={this.props.isAuthenticated} />
      </div>
    );
  }
}

export default App;
