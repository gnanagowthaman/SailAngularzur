import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { StateI, StateCard,StateIU,StateCardU } from './state';
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
export class StateService {
  stateServiceResponse: any;
  countryServiceResponse: any;
  geographyServiceResponse: any;
  constructor(private http: HttpClient) {

  }                              
  saveState(stateCreate:StateIU):Observable<StateIU>{   
    return this.http.post<StateIU>("http://localhost:1337/createstate", stateCreate, httpOptions);
  }
  getStateById(stateId: string):Observable<StateCard> {
    return this.http.get<any>("http://localhost:1337/findstate" + "/" + stateId);
  }
  getStateAll(stateAll:StateIU):Observable<any> {
    let httpHeaders = new HttpHeaders()         
    .set('Accept', 'application/json');                                                  
    return this.http.post<StateIU>("http://localhost:1337/updatestate", stateAll, httpOptions);  
  }
  deleteStateById(stateId: string): Observable<any> {                       
    let httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');                                                 
   return this.http.request('delete', 'http://localhost:1337/destroystate', { body: { state_id: stateId} ,headers:httpHeaders,responseType: 'text'});

  }  
}
