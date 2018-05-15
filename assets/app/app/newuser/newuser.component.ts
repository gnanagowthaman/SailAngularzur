import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';
import { Iterator } from '@progress/kendo-angular-grid/dist/es2015/data/data.iterators';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  //usr;
  //formdata;
  @ViewChild('abc') abc: ElementRef;
  txtValue;
  geoOptionOnly;
  Regbygeostate: any;
  requests;
  userCollectCountry;
  userCollectState;
  userCollectRegulation;
  userCollectGeo;
  regRequest;
  geographys: any;
  usr: any;
  pwd: any; mob: any; sub: any; acc: any; ale: any; geo: any; st: any; reg: any;
  formdata: FormGroup;
  jdata: Object;
  selecteGeography = 0;
  selectedCountry = 0;
  selectedState = 0;
  title = 'app';
  countryVal = [];
  stateVal = [];
  regulationVal = [];
  private _prevSelected: any;
  constructor(private fb: FormBuilder, private http: HttpClient, private _http: RequestService, private renderer: Renderer, private elem: ElementRef) {
    this.createForm();

  }

  ngOnInit() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this._http.getRequest().subscribe(res => { this.requests = res; console.log(this.requests) });
    this._http.getRegByGeo().subscribe(res => {
      this.regRequest = res;
      console.log(this.regRequest)
      this.userCollectCountry = this.regRequest.countryCollection;
      this.userCollectState = this.regRequest.stateCollection;
      this.userCollectRegulation = this.regRequest.regCollection;
      this.userCollectGeo = this.regRequest.usergeoCollection;
      console.log(this.userCollectCountry, this.userCollectState, this.userCollectRegulation, this.userCollectGeo)
    });
    // this.formdata = new FormGroup({
    //   usr: new FormControl("", Validators.compose([
    //     Validators.required
    //   ])),          
    //   pwd: new FormControl('', Validators.required)
    // });

  }
  ngAfterViewInit() {
    let elements = this.elem.nativeElement.querySelectorAll('.classImLookingFor');
    console.log(elements)
  }
  // pwdvalidation(formcontrol) {
  //   if (formcontrol.value.length < 5) {     
  //     return { "pwd": true };   
  //   }
  // }
  onClickSubmit(data) {
    this.acc = data.acc;
    console.log("account subscription", this.acc);
  }

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
  // onClickSubmit(data) {
  //   this.usr = data.usr;
  //   this.pwd = data.pwd;
  //   this.mob = data.mob;
  //   this.sub = data.sub;
  //   this.acc = data.acc;           
  //   console.log("account subscription",this.acc);
  //   this.ale = data.ale;
  //   this.geo = data.geo;
  //   this.st = data.st;
  //   this.reg = data.reg;   
  // } //Iterator
  onSelectGeography(geography_id: number) {
    this.selecteGeography = geography_id;
    this.selectedCountry = 0;
    this.stateVal = [];
    this.regulationVal = [];    
    this.geoOptionOnly=this.userCollectGeo.filter((dump)=>{     
      if(dump.id===Number(geography_id)){return dump.name}  
    })
    this.countryVal = this.userCollectCountry.filter((item) => {
      console.log("country id", item.gid, "geography id", geography_id)
      return item.gid === Number(geography_id)
    });
  }
  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    this.selectedState = 0;
    this.regulationVal = [];
    this.stateVal = this.userCollectState.filter((item) => {
      console.log("state id", item.gid, "country id", country_id)
      return item.gid === Number(country_id)
    });
  }
  onSelectState(state_id: number) {
    this.selectedState = state_id;
    this.regulationVal = this.userCollectRegulation.filter((item) => {
      console.log("geography id", item.geography_id, "state id", state_id)
      return item.geography_id == Number(state_id)
    });
  }
  handleChange(evt) {
    var target = evt.target;
    if (target.checked) {
      //doSelected(target);   
      //this._prevSelected = target;
      let elements = this.elem.nativeElement.querySelectorAll('.classImLookingFor');
      let addElement = this.elem.nativeElement.querySelectorAll('.classImAdd');
      console.log(elements)
      for (let i = 0; i < elements.length; i++) {
        (<HTMLInputElement>elements[i]).disabled = true; // note the type assertion on the element
      }
      for (let i = 0; i < addElement.length; i++) {
        (<HTMLInputElement>addElement[i]).style.visibility = 'hidden';// note the type assertion on the element
      }
      console.log("success", evt)
    } else {
      //doUnSelected(this._prevSelected)  
      console.log("fails", evt)
    }
  }
  handleChangeRest(evt) {
    var target = evt.target;  
    if (target.checked) {
      let elements = this.elem.nativeElement.querySelectorAll('.classImLookingFor');
      let addElement = this.elem.nativeElement.querySelectorAll('.classImAdd');
      console.log(elements)
      for (let i = 0; i < elements.length; i++) {
        (<HTMLInputElement>elements[i]).disabled = false; // note the type assertion on the element
      }
      for (let i = 0; i < addElement.length; i++) {
        (<HTMLInputElement>addElement[i]).style.visibility = 'visible';// note the type assertion on the element
      }
      console.log("success", evt)
    } else {
      //doUnSelected(this._prevSelected)
      console.log("fails", evt)
    }
  }                
  open(event) {
    console.log(JSON.stringify(event), "am button value");
    console.log(event.value);  
    this.txtValue=event.value;
  }
}
