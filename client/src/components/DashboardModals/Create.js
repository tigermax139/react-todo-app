import React, { Component } from "react";
import PropTypes from "prop-types";

class Create extends Component {
  render() {
    return (
      <div>
        Create
      </div>
    );
  }
}

Create.propTypes = {
  values: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

Create.defaultProps = {
  value: {},
};

export default Create;