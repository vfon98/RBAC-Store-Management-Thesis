import { IUser } from '../../core/models/user.model';
import { AppState } from '../reducers';

export const selectUser = (state: AppState): IUser => state.user;