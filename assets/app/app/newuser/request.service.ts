import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
// import { Headers, RequestOptions } from '@angular/http';

import { Client } from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

@Injectable()
export class RequestService {
  //clients: any[] = [];
  //client: Observable<any>;                     
  constructor(private http: HttpClient,private _http:Http) { }

  getRequest() {
    return this.http.get("http://localhost:1337/geographys").map(res => res);
  }
  getRegByGeo() {
    return this.http.get("http://localhost:1337/getRegbygeostate").map(res => res);
  }
  newClient(client: Client) : Observable<Client> {
    // Pushing Client object to clients which is a FirebaseListObservable
    //this.clients.push(client);    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });    
    // return this.http.post("http://localhost:1337/getRegbygeostate", client, options).toPromise()
    //        .then(this.extractData)
    //        .catch(this.handleErrorPromise);             
    return this._http.post("http://localhost:1337/createUser", client, options) // ...using post request
    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    
  }
}
