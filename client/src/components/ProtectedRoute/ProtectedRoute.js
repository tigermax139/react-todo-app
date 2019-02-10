import React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, Redirect } from "react-router-dom";
import { isAuth } from '../../controllers/auth';

const ProtectedRoute = ({ component: Component, ...ctx}) => {
  return (
   <Route {...ctx} render={(props) => (
    isAuth() === true
       ? <Component {...props} />
       : <Redirect to={{
         pathname: '/login',
         state: { from: props.location }
       }} />
   )} />
 )
};

export default withRouter(ProtectedRoute);