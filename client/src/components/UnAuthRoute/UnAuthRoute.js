import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, Redirect } from "react-router-dom";

import { isAuth } from '../../controllers/auth';

const ProtectedRoute = ({ component: Component, ...ctx}) => {
  return (
    <Route {...ctx} render={(props) => (
      ctx.isAuth() === true
        ? <Redirect to='/' />
        : <Component {...props} />
    )} />
  )
};

export default withRouter(connect(null, { isAuth })(ProtectedRoute));