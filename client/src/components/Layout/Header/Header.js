import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from "antd";

const { Header } = Layout;
const HeaderComponent = props => (
  <Header className="header">
    <Icon
      className="trigger"
      type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={props.toggle}
    />
  </Header>
);

HeaderComponent.propTypes = {
  toggle: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
};

HeaderComponent.defaultProps = {
  collapsed: false,
};

export default HeaderComponent;