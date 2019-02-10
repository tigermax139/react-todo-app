import React from 'react';
import LoginForm from '../../components/Login';
import { Row, Col } from 'antd';

const LoginPage = () => {
  return (
    <Row type="flex" justify="center" align="middle" style={{marginTop: '25%'}}>
      <Col span={24}>
        <h1 className="login-title">React todo app</h1>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12}>
        <LoginForm/>
      </Col>
    </Row>
  )
};

export default LoginPage