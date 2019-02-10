import React, { Component } from "react";
import { Route, Switch, withRouter } from 'react-router';
import ProtectedRoute from '../ProtectedRoute';
import * as routes from '../../routes';

const {
  User,
  SignUp,
  Login,
  NotFound,
  Dashboard,
} = routes.default;

class Main extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute exact path={'/'} component={withRouter(Dashboard)}/>
        <ProtectedRoute path={'/user'} component={withRouter(User)}/>
        <Route path={'/login'} component={withRouter(Login)}/>
        <Route path={'/sing-up'} component={withRouter(SignUp)}/>
        <ProtectedRoute path={'*'} component={withRouter(NotFound)}/>
      </Switch>
    );
  }
}

export default Main;