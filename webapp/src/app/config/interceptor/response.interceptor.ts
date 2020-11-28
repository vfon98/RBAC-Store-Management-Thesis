import { UserService } from 'src/app/core/auth/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../layouts/notification/notification.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private notiService: NotificationService,
    private userService: UserService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(err: HttpErrorResponse): Observable<any> {
    switch (err.status) {
      case 401:
        if (this.userService.isLogin()) {
          this.notiService.showError401();
          console.error('401 Unauthorizeddddddddddddddddd');
          // Navigate to error page
        }
        break;
      case 500:
        this.notiService.showError('Something went wrong. Try again later!');
        break;
      case 0:
        this.notiService.showError('Connection refused!');
        break;
    }

    return throwError(err);
  }
}
