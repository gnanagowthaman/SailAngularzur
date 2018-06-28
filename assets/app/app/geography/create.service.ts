import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { GeoCreate, GeoCard } from './geo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'                 
  })  
};    
                                               
@Injectable()                 
export class CreateService {   
  constructor(private http: HttpClient) { }
  saveGeography(geocreate: GeoCreate): Observable<GeoCreate> {
    return this.http.post<GeoCreate>("http://localhost:1337/createGeo", geocreate, httpOptions);
  }
  updateGeography(geo: GeoCreate): Observable<any> { 
    return this.http.post<GeoCreate>("http://localhost:1337/updateGeo", geo, httpOptions);
  }
  getGeographyById(geoId: string): Observable<GeoCreate> {
    return this.http.get<GeoCard>("http://localhost:1337/findgeo" + "/" + geoId);
  }
  deleteGeographyById(geoId: string): Observable<any> {                       
    // return this.http.request('delete', 'http://localhost:1337/destroygeography', { body: { geography_id: geoId} });
    let httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');              
return this.http.request('delete', 'http://localhost:1337/destroygeography', { body: { geography_id: geoId} ,headers:httpHeaders,responseType: 'text'});

  }   
}                                      