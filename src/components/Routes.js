import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from '../pages/Home';
import AboutPage from '../pages/About';
import NotFoundPage from '../pages/404';

class Routes extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  render() {
    let { isAuthenticated } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute path="/about" isAuthenticated={isAuthenticated} component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;

function PrivateRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/', // change pathname 
          state: {from: props.location}
        }} />}
    />
  )
}