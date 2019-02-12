import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import axios from '../../config/axios';

import { loadTodos, clearTodosStorage, removeTodo } from "../../controllers/todo";

import CreateModal from '../../components/DashboardModals/Create';

import TodosTable from '../../components/TodosTable';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    removeTodo(id).then(() => {
      this.props.loadTodos(this.state.params);
    });
    console.log(this.props);
  }
  editTodo(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
        <TodosTable todos={this.props.todos}
                    onRemove={c => this.removeTodoHandler(c)}
                    onEdit={this.editTodo}
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