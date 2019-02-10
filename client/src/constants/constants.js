import keyMirror from 'keymirror';

const types = {
  LOGIN_START: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  LOGOUT: null,
  INITIAL_RENDER_TOKEN_EXIST: null,
};

export default keyMirror(types);