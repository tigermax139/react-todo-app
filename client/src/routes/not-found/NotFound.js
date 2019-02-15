import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "antd";

import './NotFound.css';

const NotFound = () => (
  <section className="text-center">
    <h1 className="title-1 text-center">404</h1>
    <h2  className="title-2 text-center">Page Not Found</h2>
    <Button htmlType='button'  className="text-center" style={{ margin: '0 auto' }}>
      <Link to='/'> Back to Home Page </Link>
    </Button>
  </section>
);

export default NotFound;