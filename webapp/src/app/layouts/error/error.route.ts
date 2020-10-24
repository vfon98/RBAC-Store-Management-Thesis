import { ErrorComponent } from './error.component';
import { Routes } from '@angular/router';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      errorMessage: 'Error! Please try again',
      nzStatus: '500',
      nzTitle: '500',
      nzSubTitle: 'Unknown error! Please try again.'
    },
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      errorMessage: '401! Unauthorized',
      nzStatus: '403', // Status 401 is not exist
      nzTitle: '401',
      nzSubTitle: 'Sorry, you are not authorized to access this page.'
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      errorMessage: '404! Page not found',
      nzStatus: '404',
      nzTitle: '404',
      nzSubTitle: 'Sorry, the page you visited does not exist.'
    },
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
