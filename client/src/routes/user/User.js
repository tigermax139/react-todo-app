import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Card, Avatar, Icon, Skeleton } from "antd";
import './User.css';

const { Meta } = Card;

class User extends Component {
  state = {
    loading: false,
  };
  componentWillReceiveProps(nextProps, nextContext) {
    if (_.isEmpty(this.props.user) && !_.isEmpty(nextProps.user)) {
      this.state({
        loading: false,
      })
    }
  }

  render() {
    console.log(this.props.user);
    const { loading } = this.state;
    const { image_url, first_name, last_name, email, last_visit, confirm_date } = this.props.user;
    const description = (
      <div>
        <p>Email: {email}</p>
        <p>Last login: {moment(last_visit).format('LTS')}</p>
        <p>Confirm date: {moment(confirm_date).format('LTS')}</p>
      </div>
    );
    return (
      <div>
        <Card
         className='card'
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Skeleton loading={loading} avatar active>
            <Meta
              avatar={<Avatar src={image_url} />}
              title={first_name + ' ' + last_name}
              description={description}
            />
          </Skeleton>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(User);