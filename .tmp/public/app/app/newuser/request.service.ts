import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }

  getRequest() {   
    return this.http.get("http://localhost:1337/geographys").map(res => res);
  }
  getRegByGeo(){
    return this.http.get("http://localhost:1337/getRegbygeostate").map(res => res);  
  }
  
}
