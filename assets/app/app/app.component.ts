import { Component, OnInit } from '@angular/core';
import { DemoService } from './demo.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  myData: any;

  constructor(private _demoService: DemoService, private http: HttpClient) {
  }

  ngOnInit() {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.get('http://localhost:1337/user', { headers: headers }).subscribe(
      data => {
        this.myData = data
        console.log(data);
      });
  }
}