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
  // REMOVE_TODO_START: null,
  // REMOVE_TODO_SUCCESS: null,
  // REMOVE_TODO_FAILURE: null,
  // CREATE_TODO_START: null,
  // CREATE_TODO_SUCCESS: null,
  // CREATE_TODO_FAILURE: null,
  // CLEAR_CREATE_STORE: null,
  // UPDATE_TODO_START: null,
  // UPDATE_TODO_SUCCESS: null,
  // UPDATE_TODO_FAILURE: null,
  // CLEAR_UPDATE_STORE: null,
  FETCH_USER_START: null,
  FETCH_USER_SUCCESS: null,
  FETCH_USER_FAILURE: null,
  STORE_USER: null,
  CLEAR_USER_STORAGE: null,
};

export default keyMirror(types);