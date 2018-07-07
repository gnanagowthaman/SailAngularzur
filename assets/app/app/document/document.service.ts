import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { DocumentI, DocCard } from './document';
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
export class DocumentService {
   
  constructor(private http: HttpClient) { }                  
  saveDocument(insertDocument: DocumentI): Observable<DocumentI> {
    return this.http.post<DocumentI>("http://localhost:1337/createDocType", insertDocument, httpOptions);
  }
  updateDocument(updateDocument: DocumentI): Observable<any> {
    return this.http.post<DocumentI>("http://localhost:1337/updateDocType", updateDocument, httpOptions);
  }
  getDocumentById(doumentId: string): Observable<DocumentI> {
    return this.http.get<DocCard>("http://localhost:1337/findDocType" + "/" + doumentId);
  }
  deleteDocumentById(doumentId: string): Observable<any> {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');    
    return this.http.request('delete', 'http://localhost:1337/destroydocument', { body: { document_id: doumentId }, headers: httpHeaders, responseType: 'text' });

  }
}
