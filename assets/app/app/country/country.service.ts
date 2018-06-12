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
  saveCountry(couCreate:CountryI):Observable<CountryI>{           
    return this.http.post<CountryI>("http://localhost:1337/createcountry", couCreate, httpOptions);
  }  
  getCountryById(geoId: string): Observable<CountryCard> {
    return this.http.get<any>("http://localhost:1337/findcountry" + "/" + geoId);
  }
  getGeographyOnly(){
    return this.http.get("http://localhost:1337/geographys").map(res => res);
  }      
  updateCountryAll(cou: CountryI): Observable<any> {   
    let httpHeaders = new HttpHeaders()         
    .set('Accept', 'application/json');                                     
    return this.http.post<CountryI>("http://localhost:1337/updatecountry", cou, httpOptions);          
  }
  deleteCountryById(couId: string): Observable<any> {                       
    let httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');                                
   return this.http.request('delete', 'http://localhost:1337/destroycountry', { body: { country_id: couId} ,headers:httpHeaders,responseType: 'text'});

  }  
}
  