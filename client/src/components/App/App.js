import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import{ initialRenderAuth, isAuth } from "../../controllers/auth";

import 'antd/dist/antd.min.css';
import './App.css';

import Main from '../Main';

class App extends Component {
  state = {
    initialLocation: '/',
  };

  componentWillMount() {
    this.props.initialRenderAuth();
    this.setState({
      initialLocation: this.props.location.pathname,
    });
  }

  render() {
    const { isLoad, isAuth, isStarted } = this.props;
    if (isStarted && !isLoad) {
      return (
      <div className='spin-wrapper'>
        <Spin size="large" />
      </div>
    )}
    console.log('APP', isAuth(), this.state.initialLocation);
    return (
      <div className="full-height">
        <Main/>
      </div>
    );
  }
}

App.propTypes = {
  initialRenderAuth: PropTypes.func.isRequired,
  isAuth: PropTypes.func.isRequired,
  isLoad: PropTypes.bool.isRequired,
  isStarted: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoad: state.auth.isLoad,
  isStarted: state.auth.isStarted
});

export default withRouter(connect(
  mapStateToProps,
  { initialRenderAuth, isAuth }
  )(App));
