import React from 'react';
import SignUpForm from '../../components/Forms/SingUpForm';
import { Col, Row, Card } from "antd";

const SingUp = () => {
  return (
    <Row type="flex" justify="center" align="middle" style={{marginTop: '5%'}}>
      <Col xs={24} sm={12} md={12} lg={12}>
        <Card title="Create your account">
          <SignUpForm />
        </Card>
      </Col>
    </Row>
  )
};

export default SingUp;