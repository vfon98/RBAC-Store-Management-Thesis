import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { IOrder } from "../core/models";
import { SERVER_URL } from "../core/constants/api.constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private MANAGER_URL = SERVER_URL + '/manager/';

  constructor(private http: HttpClient) {
  }

  fetchOrderByIdManager(orderId: string): Observable<IOrder> {
    return this.http.get<IOrder>(this.MANAGER_URL + `orders/${orderId}`);
  }
}
