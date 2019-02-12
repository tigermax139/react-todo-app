import actionTypes from '../constants/constants';

const initialSate = {
  isStarted: false,
  isLoad: false,
  isError: false,
  todos: [],
  count: 0,
  message: '',
  removeTodo: {
    isStarted: false,
    isLoad: false,
    isError: false,
    ids: [],
  }
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODO_START: {
      return {
        ...state,
        isStarted: true,
      };
    }
    case actionTypes.FETCH_TODO_SUCCESS: {
      return {
        ...state,
        isLoad: true,
        isStarted: false,
        todos: action.payload.todos,
        count: action.payload.count,
      };
    }
    case actionTypes.FETCH_TODO_FAILURE: {
      return {
        ...state,
        isLoad: true,
        isStarted: false,
        isError: true,
        message: action.error,
      };
    }
    case actionTypes.CLEAR_TODO_STORE: {
      return initialSate;
    }
    default:
      return state;
  }
};