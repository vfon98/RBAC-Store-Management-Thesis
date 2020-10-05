import { Action } from '@ngrx/store';

export enum UserActionTypes {
  LOGIN = '[USER] LOGIN',
  LOGIN_SUCCESS = '[USER] LOGIN SUCCESS',
  LOGIN_FAILED = '[USER] LOGIN FAILED',
}

export class UserAction implements Action {
  public readonly type = UserActionTypes.LOGIN;

  constructor(public payload: { username: string; password: string }) {}
}
