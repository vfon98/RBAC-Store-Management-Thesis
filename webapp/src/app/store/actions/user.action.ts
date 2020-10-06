import { Action, createAction } from '@ngrx/store';
import { IUser } from 'src/app/core/models';

export enum UserActionTypes {
  LOGIN = '[USER] LOGIN',
  LOGIN_SUCCESS = '[USER] LOGIN SUCCESS',
  LOGIN_FAILED = '[USER] LOGIN FAILED',
}

export class UserActions implements Action {
  type: string;
  payload: {
    user?: IUser,
    error?: Record<string, string>
  }
}

export class LoginAction implements Action {
  public readonly type = UserActionTypes.LOGIN;
  constructor(public payload: { username: string; password: string }) {}
}

export class LoginSuccessClass implements Action {
  public readonly type = UserActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: IUser }) {}
}

export const LoginSuccess = createAction(
  UserActionTypes.LOGIN_SUCCESS,
  (user: IUser) => ({ user })
);

export type UserUnion = LoginAction | LoginSuccessClass;
