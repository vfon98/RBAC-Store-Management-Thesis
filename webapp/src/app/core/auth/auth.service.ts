import { SessionStorageService } from '../../service/session-storage.service';
import { UserService } from './user.service';
import { NotificationService } from 'src/app/layouts/notification/notification.service';
import { CartService } from '../http/cart.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SERVER_URL } from '../constants/api.constants';
import { IUser, UserType } from '../models/user.model';
import { JwtToken } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtSessionStorageName = 'authenticationToken';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private cartService: CartService,
    private notiService: NotificationService,
    private sessionService: SessionStorageService
  ) {}

  loginUser(username: string, password: string): Observable<unknown> {
    return this.http
      .post<JwtToken>(`${SERVER_URL}/authenticate`, {
        username,
        password,
      })
      .pipe(map((jwt) => this.authenticateSuccess(jwt)));
  }

  // Convert logout to Observable
  logoutUser(): Observable<unknown> {
    return new Observable((observer) => {
      sessionStorage.removeItem(this.jwtSessionStorageName);
      this.router.navigate(['/account/login']);
      this.userService.removeCurrentUser();
      this.cartService.clearLocalCart();
      this.sessionService.removeUserSession();
      observer.next();
    });
  }

  // Store jwt into local storage after authenticate success
  private authenticateSuccess(jwt: JwtToken) {
    sessionStorage.setItem(this.jwtSessionStorageName, jwt.id_token);
    this.router.navigateByUrl(location.pathname, { skipLocationChange: true });
    this.userService.fetchUserInfo().subscribe((user) => {
      // Do after fetched info
      this.navigateUser(user);
      this.cartService.fetchCart();
      this.sessionService.setUserSession(user);
    });
  }

  navigateUser(user: IUser): void {
    switch (user.type) {
      case UserType[UserType.CUSTOMER]:
        this.router.navigate(['/shopping']);
        return;
      case UserType[UserType.OTHER]:
        this.router.navigate(['/my-store']);
        this.notiService.showSuccess('Logged in as Store Manager!');
        return;
      case UserType[UserType.ADMIN]:
        this.router.navigate(['/admin/charts']);
        this.notiService.showSuccess('Logged in as Admin!');
        return;
    }
  }

  getAuthToken(): string {
    return sessionStorage.getItem(this.jwtSessionStorageName) || '';
  }
}
