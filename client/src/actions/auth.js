import actionTypes from '../constants/constants';

export const loginStart = () => ({ type: actionTypes.LOGIN_START });

export const loginSuccess = userData => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: userData,
});
export const loginFailure = error => ({ type: actionTypes.LOGIN_FAILURE, error });

export const logout = () => ({ type: actionTypes.LOGOUT });

export const storeUser = user => ({ type: actionTypes.STORE_USER, payload: user });

export const initialRenderTokenExist = exist => ({ type: actionTypes.INITIAL_RENDER_TOKEN_EXIST, payload: exist });