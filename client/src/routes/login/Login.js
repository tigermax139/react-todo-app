import React from 'react';
import LoginForm from '../../components/Login';
import { Row, Col, Card } from 'antd';

const LoginPage = () => {
  return (
    <Row type="flex" justify="center" align="middle" style={{marginTop: '15%'}}>
      <Col xs={24} sm={12} md={12} lg={12}>
        <Card title="React todo app Log in">
          <LoginForm/>
        </Card>
      </Col>
    </Row>
  )
};

export default LoginPage