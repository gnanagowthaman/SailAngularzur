import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { CountryI, CountryCard } from './cout';
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
export class CountryService {

  constructor(private http: HttpClient) { }  

  getCountryById(geoId: string): Observable<CountryI> {
    return this.http.get<CountryCard>("http://localhost:1337/findcountry" + "/" + geoId);
  }
      
}
