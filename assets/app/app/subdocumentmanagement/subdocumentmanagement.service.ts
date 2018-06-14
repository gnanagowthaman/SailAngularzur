import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { SubDocMgtI, SubDocMgtCard } from './subdocmgt';
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
export class SubdocumentmanagementService {

  constructor(private http: HttpClient) { }  
  saveSubDocument(subDocCreate:SubDocMgtI):Observable<SubDocMgtI>{           
    return this.http.post<SubDocMgtI>("http://localhost:1337/saveSubDocUrl", subDocCreate, httpOptions);
  }  
  getSubDocumentById(subDocId: string): Observable<SubDocMgtCard> {
    return this.http.get<any>("http://localhost:1337/findBySubDoc" + "/" + subDocId);
  }
  // getSubDocumentOnly(){    
  //   return this.http.get("http://localhost:1337/geographys").map(res => res);
  // }      
  SubDocumentUpdate(subDocId: SubDocMgtI): Observable<any> {   
    let httpHeaders = new HttpHeaders()         
    .set('Accept', 'application/json');                                     
    return this.http.post<SubDocMgtI>("http://localhost:1337/updateSubDoc", subDocId, httpOptions);          
  }
  deleteSubDocumentById(subDocId: string): Observable<any> {                       
    let httpHeaders = new HttpHeaders()   
    .set('Accept', 'application/json');                                
   return this.http.request('delete', 'http://localhost:1337/destroySubDoc ', { body: { id: subDocId} ,headers:httpHeaders,responseType: 'text'});

  }  

}
