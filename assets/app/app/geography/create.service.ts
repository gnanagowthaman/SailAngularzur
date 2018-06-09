import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { GeoCreate,GeoCard } from './geo';
import 'rxjs/add/operator/map';    
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',   
    'Authorization': 'my-auth-token'
  })   
};

@Injectable()
export class CreateService {      
  constructor(private http: HttpClient) { }
  saveGeography(geocreate:GeoCreate):Observable<GeoCreate>{       
    return this.http.post<GeoCreate>("http://localhost:1337/createGeo", geocreate, httpOptions);  
  }
  updateGeography(geo:GeoCreate):Observable<any>{
    // return this.http.put("http://localhost:1337/findgeo/"+"/"+geo.id,geo,httpOptions);
    return this.http.put("http://localhost:1337/findgeo"+"/"+geo.id,geo,httpOptions); 
  } 
  getGeographyById(geoId: string): Observable<GeoCreate>{             
    return this.http.get<GeoCard>("http://localhost:1337/findgeo" +"/"+ geoId);
  }
}