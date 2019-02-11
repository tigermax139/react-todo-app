import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";

import { Layout, Menu, Icon } from 'antd';
import Logo from '../../../logo.svg'
const { Sider } = Layout;

class Navigation extends Component {
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo-wrapper">
          <img src={Logo} className="logo" alt="logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[this.props.location.pathname]}
        >
          <Menu.Item key="/">
            <Icon type="home" />
            <span>Dashboard</span>
            <Link to='/'/>
          </Menu.Item>
          <Menu.Item key="/user">
            <Icon type="user" />
            <span> User Info</span>
            <Link to='/user'/>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

Navigation.propTypes = {
  collapsed: PropTypes.bool,
  location: PropTypes.object.isRequired,
};

Navigation.defaultProps = {
  collapsed: false,
};

export default withRouter(Navigation);