import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout } from 'antd';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import './Layout.css';

class LayoutComponent extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Layout className='layout'>
        <Navigation collapsed={collapsed}/>
        <Layout>
          <Header collapsed={collapsed} toggle={this.toggle} />
          <Layout.Content className='content'>
              {this.props.children}
          </Layout.Content>
          <Footer/>
        </Layout>
      </Layout>
    );
  }
}

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
  activeLink: PropTypes.string,
};

export default LayoutComponent;