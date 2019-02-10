import actionTypes from '../constants/constants';

const initialSate = {
  isStarted: false,
  isLoad: false,
  isError: false,
  isAuthenticated: false,
  user: {},
  message: '',
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START: {
      return {
        ...state,
        isStarted: true,
      };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoad: true,
        isStarted: false,
        isAuthenticated: true,
        user: { ...action.payload },
      };
    }
    case actionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isLoad: true,
        isStarted: false,
        isError: true,
        isAuthenticated: false,
        user: {},
        message: action.error,
      };
    }
    case actionTypes.INITIAL_RENDER_TOKEN_EXIST: {
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    }
    case actionTypes.LOGOUT: {
      return { ...initialSate, isAuthenticated: false };
    }
    default:
      return state;
  }
};