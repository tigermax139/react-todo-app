import axios from 'axios';
import config from './index';

import { store } from '../index.js';
import { logout } from "../actions/auth";


class Api {
  constructor() {
    this.client = axios.create({
        baseURL: config.apiUrl,
      });
    this.token = Api.getToken();

    this.client.interceptors.request.use(
      config => {
        if (!this.token) {
          return config;
        }

        const newConfig = {
          ...config,
        };
        newConfig.headers.Authorization = `Bearer ${this.token}`;
        return newConfig;
      },
      e => Promise.reject(e),
    );

    this.client.interceptors.response.use(
      r => r,
      async error => {
        if (!error.response) {
          // e.g Network error
          throw error;
        }
        if (error.response.status === 401) {
          if (this.token) {
            // token expired
            console.log('token expired');
            this.logout().then(() => {
              store.dispatch(logout());
              // store.dispatch(routerActions.push('/login'));
            });
          }
          throw error;
        }
      },
    );
  }
  static getToken() {
    return localStorage.getItem('token');
  }
  static removeToken() {
    return localStorage.removeItem('token');
  }
  static setToken(token) {
    return localStorage.setItem('token', token);
  }
  async login({ login, password, keepInSystem }) {
    const res = await this.client.post('/auth/login', { login, password, keepInSystem });
    const { token, user } = res.data.data;
    this.token = token;
    Api.setToken(token);
    return user;
  }
  async logout() {
    await this.client.get('/auth/logout');
    this.token = null;
    Api.removeToken();
  }
}

export default new Api();