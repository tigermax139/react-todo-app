import keyMirror from 'keymirror';

const types = {
  LOGIN_START: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  LOGOUT: null,
  INITIAL_RENDER_TOKEN_EXIST: null,
  FETCH_TODO_START: null,
  FETCH_TODO_SUCCESS: null,
  FETCH_TODO_FAILURE: null,
  CLEAR_TODO_STORE: null,
  REMOVE_TODO_START: null,
  REMOVE_TODO_SUCCESS: null,
  REMOVE_TODO_FAILURE: null,
};

export default keyMirror(types);