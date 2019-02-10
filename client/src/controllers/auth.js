import axios from '../config/axios';
import * as authActions from '../actions/auth';
import { routerActions } from 'react-router-redux'

export const login = ({login, password, keepInSystem}) => async dispatch => {
  await dispatch(authActions.loginStart());
  try {
    const user = await axios.login({
      login,
      password,
      keepInSystem
    });
    await dispatch(authActions.loginSuccess(user));
    await dispatch(routerActions.push('/'));
  } catch (e) {
    await dispatch(authActions.loginFailure(e));
  }
};

export const logout = () => async dispatch => {
  await dispatch(authActions.logout());
  await axios.logout();
  await dispatch(routerActions.push('/login'));
};

export const initialRenderTokenExist = () => dispatch => {
  const exist = axios.token;
  dispatch(authActions.initialRenderTokenExist(!!exist));
};

export const isAuth = () => !!axios.token;