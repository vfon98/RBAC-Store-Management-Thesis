import { Action } from '@ngrx/store';
import { IUser } from '../../core/models/user.model';
import { UserActions, UserActionTypes } from '../actions/user.action';

const initialState = {} as IUser;

const userReducer = (state: IUser = initialState, action: UserActions): IUser => {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return {
        ...state
      }
    }
    case UserActionTypes.LOGIN_SUCCESS: {
      console.log('action', action);
      return {
        ...state,
        ...action.payload.user
      }
    }
    default: return initialState;
  }
}

export default userReducer;