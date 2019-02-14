import actionTypes from '../constants/constants';

export const fetchTodosStart = () => ({ type: actionTypes.FETCH_TODO_START });

export const fetchTodoSuccess = payload => ({
  type: actionTypes.FETCH_TODO_SUCCESS,
  payload,
});

export const fetchTodoFailure = error => ({
  type: actionTypes.FETCH_TODO_FAILURE,
  error,
});

export const clearTodoStorage = () => ({
  type: actionTypes.CLEAR_TODO_STORE
});
