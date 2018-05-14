import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',     
  styleUrls: ['./list.component.css']   
})
export class ListComponent implements OnInit {
  myData: any;
  constructor(private http: HttpClient) { }

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
