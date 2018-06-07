import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';      
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-geography',
  templateUrl: './geography.component.html',
  styleUrls: ['./geography.component.css']
})
export class GeographyComponent implements OnInit {
  router:any;
  myData: any;
  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor(private http: HttpClient,private _router:Router) { }

  ngOnInit() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/geography', { headers: headers }).subscribe(
      data => {
        this.myData = data   
        console.log(data);
      });
  }
  toggle() {
    
    this._router.navigate(['/geoList/createGeography']);                                                       
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
        
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }       

}
