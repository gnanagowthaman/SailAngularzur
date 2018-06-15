import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { RegulatorI, RegulatorCard} from './regulator';
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
export class RegulatorService {   
  constructor(private http: HttpClient) { }
  saveRegulator(regCreate: RegulatorI): Observable<RegulatorI> {
    return this.http.post<RegulatorI>("http://localhost:1337/createRegulator", regCreate, httpOptions);
  }
  updateRegulator(regUpdate: RegulatorI): Observable<any> { 
    return this.http.post<RegulatorI>("http://localhost:1337/updateRegulator", regUpdate, httpOptions);
  }
  getRegulatorById(regId: string): Observable<RegulatorI> {
    return this.http.get<RegulatorCard>("http://localhost:1337/findRegulator" + "/" + regId);
  }
  deleteRegulatorById(regId: string): Observable<any> {                                     
    let httpHeaders = new HttpHeaders()        
    .set('Accept', 'application/json');              
    return this.http.request('delete', 'http://localhost:1337/destroyregulator', { body: { regulator_id: regId} ,headers:httpHeaders,responseType: 'text'});
  } 
}
