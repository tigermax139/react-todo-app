import queryString from 'query-string';

import axios from '../config/axios';
import * as actions from '../actions/todo';

export const loadTodos = params => async dispatch => {
  try {
    await dispatch(actions.fetchTodosStart());
    const query = queryString.stringify(params);
    const { data: axiosData } = await axios.client.get(`/todos?${query}`);
    const { todos, count } = axiosData.data;
    await dispatch(actions.fetchTodoSuccess({todos, count}));
  }catch (e) {
    console.error(e);
    await dispatch(actions.fetchTodoFailure(e.message));
  }
};

export const removeTodo = async id => {
  try {
    await axios.client.delete(`/todos/${id}`);
  } catch (e) {
    console.error(e);
  }
};

export const createTodo = async params => {
  const { data } = await axios.client.post('/todos', {...params});
  return data;
};

export const updateTodo = async (id, params) => {
  const { data } = await axios.client.put(`/todos/${id}`, {...params});
  return data;
};

export const clearTodosStorage = () => dispatch => dispatch(actions.clearTodoStorage());
