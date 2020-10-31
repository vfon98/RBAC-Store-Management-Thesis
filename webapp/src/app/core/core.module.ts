import { environment } from './../../environments/environment';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../config/interceptor/request.interceptor';
import { ResponseInterceptor } from '../config/interceptor/response.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import rootReducer, { metaReducers } from '../store/reducers';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxSpinnerModule,
    StoreModule.forRoot(rootReducer, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
})
export class CoreModule { }
