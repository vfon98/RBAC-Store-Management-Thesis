import { Injectable } from '@angular/core';
import { SERVER_URL } from "../constants/api.constants";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { IRegion, IRegionBody } from "../models";

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private REQUEST_URL = SERVER_URL + "/regions";

  refreshSubject = new Subject();
  refreshListener = this.refreshSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchRegions(): Observable<IRegion[]> {
    return this.http.get<IRegion[]>(this.REQUEST_URL);
  }

  fetchRegionById(regionId: number | string): Observable<IRegion> {
    return this.http.get<IRegion>(`${this.REQUEST_URL}/${regionId}`)
  }

  createRegion(body: IRegionBody): Observable<IRegion> {
    return this.http.post<IRegion>(this.REQUEST_URL, body);
  }

  updateRegion(
    regionId: number | string,
    body: IRegionBody
  ): Observable<IRegion> {
    return this.http.put<IRegion>(`${this.REQUEST_URL}/${regionId}`, body);
  }

  deleteRegion(regionId: number | string): Observable<IRegion> {
    return this.http.delete<IRegion>(`${this.REQUEST_URL}/${regionId}`);
  }

}
