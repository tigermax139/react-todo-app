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
        <ProtectedRoute exact path={'/'} component={Dashboard}/>
        <ProtectedRoute path={'/user'} component={User}/>
        <Route path={'/login'} component={Login}/>
        <Route path={'/sing-up'} component={SignUp}/>
        <ProtectedRoute path={'*'} component={NotFound}/>
      </Switch>
    );
  }
}

export default Main;