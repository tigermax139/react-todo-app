import React, { Component } from "react";
import { Switch } from 'react-router';
import ProtectedRoute from '../ProtectedRoute';
import UnAuthRoute from '../UnAuthRoute';
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
        <UnAuthRoute path={'/login'} component={Login}/>
        <UnAuthRoute path={'/sing-up'} component={SignUp}/>
        <ProtectedRoute path={'/404'} component={NotFound}/>
        <ProtectedRoute path={'*'} component={NotFound}/>
      </Switch>
    );
    // return (
    //   <Switch>
    //     <Route exact path={'/'} component={Dashboard}/>
    //     <Route path={'/user'} component={User}/>
    //     <Route path={'/login'} component={Login}/>
    //     <Route path={'/sing-up'} component={SignUp}/>
    //     <Route path={'*'} component={NotFound}/>
    //   </Switch>
    // );
  }
}

export default Main;