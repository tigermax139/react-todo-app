import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../../controllers/auth";
import { Layout, Menu, Icon, Divider } from 'antd';
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
          <Menu.Item onClick={this.props.logout}>
            <Icon type="logout" />
            <span> Logout </span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

Navigation.propTypes = {
  collapsed: PropTypes.bool,
  location: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  collapsed: false,
};

export default withRouter(connect(null, { logout })(Navigation));