import { IUser } from 'src/app/core/models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  VAR_NAME = 'loginSession';

  constructor() {}

  setUserSession(user: IUser): void {
    sessionStorage.setItem(this.VAR_NAME, JSON.stringify(user));
  }

  getUserSession(): IUser {
    const userJson = sessionStorage.getItem(this.VAR_NAME);
    return JSON.parse(userJson);
  }

  removeUserSession(): void {
    sessionStorage.removeItem(this.VAR_NAME);
  }

  isLogin(): boolean {
    return !!this.getUserSession();
  }
}
