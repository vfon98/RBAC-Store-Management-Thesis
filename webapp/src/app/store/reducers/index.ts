import { environment } from './../../../environments/environment';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IUser } from '../../core/models/user.model';
import userReducer from './user.reducer';

export interface AppState {
  user: IUser
}

const rootReducer: ActionReducerMap<AppState> = {
  user: userReducer
}

export default rootReducer;

export const metaReducers: MetaReducer[] = !environment.production ? [] : [];