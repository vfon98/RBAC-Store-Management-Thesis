import {
  IPageableProduct,
  ICart,
  ICartItem,
  ICartItemBody,
  IMergeCartBody,
  IOrder,
  IMessageResponse,
  IPaymentInfo, IProduct, IStore,
} from 'src/app/core/models';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../constants/api.constants';
import { ORDER_STATUS } from "../constants/common.constants";
import { IBestSeller } from "../models/best-seller.model";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private REQUEST_URL = SERVER_URL + '/customer/';

  orderChanged = new Subject();
  orderChanged$ = this.orderChanged.asObservable();

  constructor(private http: HttpClient) {
  }

  fetchProductsByStoreAndCategory(
    storeId: number,
    categoryId = -1,
    page = 1,
    size = 9,
    search = '',
    sortBy = '',
    direction = 'asc',
    priceFrom = '',
    priceTo = ''
  ): Observable<IPageableProduct> {
    if (page < 1) page = 1;
    return this.http.get<IPageableProduct>(
      this.REQUEST_URL + `stores/${storeId}/categories/${categoryId}/products`,
      {
        params: {
          page: String(page),
          size: String(size),
          search,
          sortBy,
          direction,
          priceFrom,
          priceTo,
        }
      }
    );
  }

  fetchProductDetails(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.REQUEST_URL + `products/${productId}`);
  }

  fetchStoreListByProductId(productId: number): Observable<IStore[]> {
    return this.http.get<IStore[]>(this.REQUEST_URL + `products/${productId}/stores`);
  }

  getMyCart(): Observable<ICart> {
    return this.http.get<ICart>(this.REQUEST_URL + 'cart');
  }

  addItemToCart(
    storeId: number,
    productId: number,
    quantity: number
  ): Observable<ICartItem> {
    return this.http.put<ICartItem>(this.REQUEST_URL + 'cart', null, {
      params: {
        storeId: String(storeId),
        productId: String(productId),
        quantity: String(quantity),
      },
    });
  }

  updateCartItemQuantity(body: ICartItemBody[]): Observable<number[]> {
    return this.http.put<number[]>(this.REQUEST_URL + 'cart/cart-items', body);
  }

  mergeCart(body: IMergeCartBody[]): Observable<number[]> {
    return this.http.put<number[]>(
      this.REQUEST_URL + 'cart/cart-items/merge',
      body
    );
  }

  removeCartItem(cartItemId: number): Observable<IMessageResponse> {
    return this.http.delete<IMessageResponse>(
      this.REQUEST_URL + `cart/cart-items/${cartItemId}`
    );
  }

  clearCart(cartId: number): Observable<IMessageResponse> {
    return this.http.delete<IMessageResponse>(this.REQUEST_URL + `cart/${cartId}`);
  }

  // PAYMENT
  checkoutPayment(body: IPaymentInfo): Observable<IMessageResponse> {
    return this.http.post<IMessageResponse>(this.REQUEST_URL + 'payment', body);
  }

  // ORDERS
  fetchOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.REQUEST_URL + 'orders');
  }

  fetchOrdersByStore(status?: ORDER_STATUS): Observable<IOrder[]> {
    let params: HttpParams = null;
    if (status) {
      params = new HttpParams().set('status', `${status}`);
    }
    console.log({ params })
    return this.http.get<IOrder[]>(SERVER_URL + '/manager/orders', { params });
  }

  updateOrderStatus(id: number, body: { status: string }): Observable<IOrder> {
    return this.http.put<IOrder>(
      this.REQUEST_URL + `orders/${id}/status`,
      body
    );
  }

  fetchTopBestSellersProducts(): Observable<IBestSeller[]> {
    return this.http.get<IBestSeller[]>(this.REQUEST_URL + `products/best-sellers`);
  }
}
