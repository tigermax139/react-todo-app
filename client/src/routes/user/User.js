import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class User extends Component {
  render() {
    return (
      <div>
        User
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(User);