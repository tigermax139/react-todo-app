import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import { Table, Tag, Button, Divider } from 'antd';
import showConfirm from '../../components/DashboardModals/Remove';

class TodosTable extends Component {
  onRemove(confirm, id) {
    if(!confirm) {
      return false;
    }
    this.props.onRemove(id);
  }
  render() {
    const source = this.props.todos;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => {
          switch (status) {
            case 'scheduled': {
              return <Tag color='purple'>{status}</Tag>;
            }
            case 'in progress': {
              return <Tag color='blue'>{status}</Tag>;
            }
            case 'done': {
              return <Tag color='green'>{status}</Tag>;
            }
          }
        }
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: date => moment(date).format('LTS'),
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <div>
            <Button onClick={evt => this.props.onEdit(record.id)} icon="edit">Edit</Button>
            <Divider type="vertical" />
            <Button onClick={() => showConfirm(c => this.onRemove(c, record.id))} icon="delete">Remove</Button>
          </div>
        )
      }
    ];
    return <Table columns={columns} dataSource={source}/>
  }
}

TodosTable.propTypes = {
  todos: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default TodosTable;