import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, Redirect } from "react-router-dom";

import { isAuth } from '../../controllers/auth';

const ProtectedRoute = ({ component: Component, ...ctx}) => {
  console.log('Protected Route', ctx.isAuth());
  return (
   <Route {...ctx} render={(props) => (
    ctx.isAuth() === true
       ? <Component {...props} />
       : <Redirect to={{
         pathname: '/login',
         state: { from: props.location }
       }} />
   )} />
 )
};

export default connect(
  null,
  { isAuth }
  )(withRouter(ProtectedRoute));