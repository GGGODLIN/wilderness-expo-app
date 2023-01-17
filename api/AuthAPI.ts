import { AxiosResponse } from 'axios';

import { User } from '../datasets/User';
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
