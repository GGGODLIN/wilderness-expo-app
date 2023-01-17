import { AxiosResponse } from 'axios';

import { User, UserRegister } from '../datasets/User';
import { APIRequest } from './APIRequest';

// http code 200
interface UserLoginSuccessResponseI {
  user: User;
  token: string;
  message: string;
}

// http code 401
interface UserLoginFailedResponseI {
  message: string;
}

export const apiUserLogin = (
  email: string,
  password: string
): Promise<AxiosResponse<UserLoginSuccessResponseI | UserLoginFailedResponseI>> =>
  APIRequest().post('/login', { email, password });

interface UserLogoutResponseI {
  message: string;
}

export const apiUserLogout = (token: string): Promise<AxiosResponse<UserLogoutResponseI>> =>
  APIRequest(token).get('/logout');

// http code 200
interface UserRegisterSuccessResponseI {
  user: UserRegister;
  token: string;
  message: string;
}

// http code 422
interface UserRegisterFailedResponseI {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export const apiUserRegister = (
  email: string,
  password: string
): Promise<AxiosResponse<UserRegisterSuccessResponseI | UserRegisterFailedResponseI>> =>
  APIRequest().post('/register', { email, password, password_confirmation: password });

// http code 401 200
interface UserForgetPasswordResponseI {
  message: string;
}

export const apiUserForgetPassword = (
  email: string
): Promise<AxiosResponse<UserForgetPasswordResponseI>> =>
  APIRequest().post('/password/email', { email });

export const apiUserResetPassword = (password: string, token: string): Promise<AxiosResponse> =>
  APIRequest().post('/password/reset', { password, password_confirmation: password, token });
