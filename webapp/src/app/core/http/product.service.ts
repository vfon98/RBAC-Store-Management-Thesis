import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { SERVER_URL } from './../../core/constants/api.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IProductBody, IMessageResponse } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private REQUEST_URL = SERVER_URL + '/products/';
  private MANAGER_URL = SERVER_URL + '/manager/products/';
  private ADMIN_URL = SERVER_URL + '/admin/products/';

  public updateSubject = new Subject();
  public updateObservable$ = this.updateSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.REQUEST_URL);
  }

  fetchProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.REQUEST_URL + id);
  }

  save(body: IProductBody): Observable<IProduct> {
    const formData = new FormData();
    formData.append('image', body.image);

    for (const key in body) {
      formData.append(key, body[key]);
    }
    return this.http.post<IProduct>(this.MANAGER_URL, formData);
  }

  update(id: number, body: IProductBody): Observable<IProduct> {
    console.log(body)
    const formData = new FormData();
    formData.append('image', body.image);

    for (const key in body) {
      formData.append(key, body[key]);
    }
    return this.http.put<IProduct>(this.MANAGER_URL + id, formData);
  }

  deleteById(id: number): Observable<IMessageResponse> {
    return this.http.delete<IMessageResponse>(this.MANAGER_URL + id);
  }
}
