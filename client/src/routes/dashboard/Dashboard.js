import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Modal, message } from "antd";

import { loadTodos,
  clearTodosStorage,
  removeTodo,
  createTodo,
  updateTodo,
} from "../../controllers/todo";

import TodoForm from '../../components/Forms/Todo';
import TodosTable from '../../components/TodosTable';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModalVisible: false,
      createLoading: false,
      editModalVisible: false,
      editLoading: false,
      editTodo: {},
      params: {
        page: 1,
        per_page: 6,
      }
    };
  }

  componentDidMount() {
    this.props.loadTodos(this.state.params);
  }

  componentWillUnmount() {
    this.props.clearTodosStorage();
  }

  onPageChange(data) {
    console.log(data);
    this.setState(state => ({
      params: {
        ...state.params,
        page: data.current,
      }
    }), () => {
      console.log(this.state.params);
      this.props.loadTodos(this.state.params)
    });
  }

  removeTodoHandler(id) {
    console.log(id);
    removeTodo(id).then(
      () => {
      message.success('Deleted');
      this.props.loadTodos(this.state.params);
    },
      (e) => {
        message.error('Failure');
        console.error(e);
      }
      );
  }

  createModalToggle(status) {
    this.setState(state => ({
      createModalVisible: status !== undefined ? status : !state.createModalVisible,
    }));
  }

  editModalToggle(status) {
    this.setState(state => ({
      editModalVisible: status !== undefined ? status : !state.editModalVisible,
    }));
  }

  async createTodoHandler(data){
    console.log(data);
    this.setState({
      createLoading: true,
    });
    try {
      await createTodo(data);
      message.success('Created');
      await this.props.loadTodos(this.state.params);
    }catch (e) {
      console.error(e);
      message.error('Failure');
      // add notification
    } finally {
      this.createModalToggle(false);
      this.setState({
        createLoading: false,
      })
    }
  }

  editTodoClickHandler(id) {
    const todo = _.find(this.props.todos, {id});
    if (!todo) return;
    this.setState({
      editTodo: todo,
    });
    this.editModalToggle(true);
  }
  async editTodoHandler(data) {
    const compare = _.isEqual(data, this.state.editTodo);
    if (compare) {
      return message.warn('Fields was not changed');
    }
    try {
      this.setState({
        editLoading: true,
      });
      await updateTodo(this.state.editTodo.id, data);
      message.success('Updated');
      await this.props.loadTodos(this.state.params);
      console.log(1);
    } catch (e) {
      console.error(e);
      message.error('Failure');
    } finally {
      this.setState({
        editLoading: false,
      })
      console.log(2);
      this.editModalToggle(false);
    }
  }

  render() {
    return (
      <div>
        <Button htmlType='button' style={{marginBottom: 15}} onClick={e => this.createModalToggle(true)}>
          Add new Todo
        </Button>
        <Modal visible={this.state.createModalVisible}
               title='Create your todo'
               onCancel={e => this.createModalToggle(false)}
               footer={[]}
        >
          <TodoForm onSubmit={this.createTodoHandler.bind(this)}
                    loading={this.state.createLoading}/>
        </Modal>
        <Modal visible={this.state.editModalVisible}
               title='Edit todo'
               onCancel={e => this.editModalToggle(false)}
               footer={[]}
        >
          <TodoForm onSubmit={this.editTodoHandler.bind(this)}
                    loading={this.state.editLoading}
                    values={this.state.editTodo}
                    key={this.state.editTodo.id}
          />
        </Modal>
        <TodosTable todos={this.props.todos}
                    onRemove={c => this.removeTodoHandler(c)}
                    onEdit={this.editTodoClickHandler.bind(this)}
                    onPageChange={this.onPageChange.bind(this)}
                    pagination={{
                      current: this.state.params.page,
                      pageSize: this.state.params.per_page,
                      total: this.props.count
                    }}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  loadTodos: PropTypes.func.isRequired,
  clearTodosStorage: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  isLoad: PropTypes.bool.isRequired,
  isStarted: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todoStore.todos,
  count: state.todoStore.count,
  isLoad: state.todoStore.isLoad,
  isStarted: state.todoStore.isStarted,
  isError: state.todoStore.isError,
  errorMsg: state.todoStore.message,
});

const mapDispatchToProps = {
  loadTodos,
  clearTodosStorage
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);