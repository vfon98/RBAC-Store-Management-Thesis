import { CheckLoginGuard } from './../config/guard/check-login.guard';
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import {ProductDetailsPageComponent} from "./products-list/product-details-page/product-details-page.component";

const routes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [
      { path: '', pathMatch: 'full', component: ProductsListComponent },
      {
        path: 'store/:storeId/category/:categoryId',
        component: ProductsListComponent,
      },
      {
        path: 'products/:productId/details',
        component: ProductDetailsPageComponent
      },
      { path: 'cart', component: CartDetailComponent },
      {
        path: 'checkout',
        canActivate: [CheckLoginGuard],
        component: CartCheckoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
