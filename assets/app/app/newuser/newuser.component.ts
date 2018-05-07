import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  //usr;
  //formdata;
  Regbygeostate: any;
  requests;
  regRequest;
  geographys: any;
  usr: any;
  pwd: any; mob: any; sub: any; acc: any; ale: any; geo: any; st: any; reg: any;
  formdata: FormGroup;
  jdata: Object;
  constructor(private fb: FormBuilder, private http: HttpClient, private _http: RequestService) {
    this.createForm();

  }

  ngOnInit() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // this.http.get('http://localhost:1337/getRegbygeostate', { headers: headers }).subscribe(
    //   data => {
    //     this.Regbygeostate = data
    //     console.log(data);
    //   });
    // this.http.get('http://localhost:1337/geographys', { headers: headers }).subscribe(
    //   data => {
    //     this.geographys = data
    //     console.log(data);   
    //   });
    // this.requests = this._http.getRequest().subscribe(res => { this.requests = res; console.log(this.requests) });   
    console.log("before loading this requests")
    this._http.getRequest().subscribe(res => { this.requests = res; console.log(this.requests) });
    console.log("before loading GeoBy register this requests")
    this._http.getRegByGeo().subscribe(res => { this.regRequest = res; console.log(this.regRequest) });  
    // this.formdata = new FormGroup({
    //   usr: new FormControl("", Validators.compose([
    //     Validators.required
    //   ])),          
    //   pwd: new FormControl('', Validators.required)
    // });

  }
  // pwdvalidation(formcontrol) {
  //   if (formcontrol.value.length < 5) {     
  //     return { "pwd": true };   
  //   }
  // }
  // onClickSubmit(data) {
  //   this.usr = data.usr;
  // }

  createForm() {
    this.formdata = this.fb.group({
      usr: ['', Validators.required],
      pwd: '',
      mob: '',
      sub: '',
      acc: '',
      ale: '',
      geo: '',
      st: '',
      reg: '',
      sidekick: ''
    });
  }
  onClickSubmit(data) {
    this.usr = data.usr;
    this.pwd = data.pwd;
    this.mob = data.mob;
    this.sub = data.sub;
    this.acc = data.acc;
    this.ale = data.ale;
    this.geo = data.geo;
    this.st = data.st;
    this.reg = data.reg;
  }

}
