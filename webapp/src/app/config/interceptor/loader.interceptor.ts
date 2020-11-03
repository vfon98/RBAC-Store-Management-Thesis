import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from "../../service/loader.service";
import { finalize } from "rxjs/operators";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  timer: number;
  timeout = 100;

  constructor(private loaderService: LoaderService ) {
    if (location.pathname.startsWith('/admin')) {
      this.timeout = 0;
    }
    console.log("TIMEOUT", this.timeout)
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(() => {
      this.loaderService.show();
    }, this.timeout);

    return next.handle(request).pipe(finalize(() => {
      this.loaderService.hide();
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
    }));
  }
}
