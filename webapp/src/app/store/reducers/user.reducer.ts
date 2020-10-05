import { IUser } from '../../core/models/user.model';
import { UserAction, UserActionTypes } from '../actions/user.action';

const initialState = {} as IUser;

const userReducer = (state: IUser = initialState, action: UserAction): IUser => {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return {
        ...state
      }
    }
    default: return initialState;
  }
}

export default userReducer;