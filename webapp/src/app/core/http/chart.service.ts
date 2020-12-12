import { Injectable } from '@angular/core';
import { SERVER_URL } from "../constants/api.constants";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITopSaleResponse } from "../models/top-sale-reponse.model";
import { IStoreRevenueResponse } from "../models/store-revenue.model";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private REQUEST_URL = SERVER_URL + '/charts/';

  constructor(private http: HttpClient) { }

  fetchTopSaleProducts(): Observable<ITopSaleResponse[]> {
    return this.http.get<ITopSaleResponse[]>(this.REQUEST_URL + "products/top-sale");
  }

  fetchTopSaleProductsByStoreId(storeId: string | number): Observable<ITopSaleResponse[]> {
    return this.http.get<ITopSaleResponse[]>(this.REQUEST_URL + `products/top-sale/stores/${storeId}`)
  }

  fetchStoreRevenues(): Observable<IStoreRevenueResponse[]> {
    return this.http.get<IStoreRevenueResponse[]>(this.REQUEST_URL + `admin/stores/total-revenue`);
  }

  fetchImportedLineChartData(): Observable<IImportedData[]> {
    return this.http.get<IImportedData[]>(this.REQUEST_URL + `admin/imported-chart`);
  }
}

export class IImportedData {
  date: number;
  totalImported: number;
}
