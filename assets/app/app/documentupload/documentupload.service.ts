import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';

import { UploadI, UploadCard } from './upload-i';
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
export class DocumentuploadService {

  constructor(private http: HttpClient) { }

  getFindRegulationData() {
    return this.http.get("http://localhost:1337/findRegulationData").map(res => res);
  }
  deleteDocumentById(fId: string): Observable<any> {
   
  //   let httpHeaders = new HttpHeaders()                                              
  //     .set('Accept', 'application/json');  
  //   return this.http.request('delete', 'http://localhost:1337/document', { body: { fid: fId }, headers: httpHeaders, responseType: 'text' });

  // }
  let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });          
    return this.http.delete( 'http://localhost:1337/document' +"/"+ fId)            
  }
}
