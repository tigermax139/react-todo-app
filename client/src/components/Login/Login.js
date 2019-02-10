import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import './login.css';

import { login } from '../../controllers/auth';

class LoginForm extends Component {
  handleSubmit = evt  => {
    evt.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        await this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('login', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('keepInSystem', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Link className="login-form-forgot" to={'#'}>Forgot password</Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to={'/sing-up'}>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.object,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});
const mapDispatchToProps = {
  login,
};

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);