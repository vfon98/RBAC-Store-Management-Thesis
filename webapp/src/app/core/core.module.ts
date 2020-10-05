import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../config/interceptor/request.interceptor';
import { ResponseInterceptor } from '../config/interceptor/response.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  exports: []
})
export class CoreModule { }
