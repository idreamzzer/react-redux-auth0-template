import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authActions } from '../redux/modules/auth';

import Header from '../components/Header';

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(authActions.loginRequest()),
  logoutSuccess: () => dispatch(authActions.logoutSuccess())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
