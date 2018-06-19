import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';
import { Iterator } from '@progress/kendo-angular-grid/dist/es2015/data/data.iterators';
import { Client } from './user';
import { fullClient } from './user';
import * as $ from '../../resources/js/jquery.min.js';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  //usr;                    
  //formdata; 
  default_state: number = 18;
  default_country: number = 23;
  default_smsaccess: string = 'none';
  default_webaccess: string = 'none';
  default_emailaccess: string = 'none';

  // client: Client = {
  //   user_name: '',
  //   email_id: '',
  //   mobile_no: 0,
  //   company_name: 'others',
  //   role_id: 3,
  //   subscription: 'paid',
  //   access: '',
  //   cliaccess: '',
  //   resaccess: '',
  //   smsaccess: 'none',
  //   webaccess: 'none',
  //   emailaccess: 'none',
  //   country: 23,
  //   geopgrpahy: '',
  //   state: 18
  // }
  client: Client = {
    user_name: '',
    email_id: '',
    mobile_no: 0,
    company_name: '',
    role_id: 3,
    subscription: '',
    access: '',
    smsaccess: 0,
    webaccess: 0,
    emailaccess: 0,
    country: 23,
    geopgrpahy: '',
    state: 18
  }
  @ViewChild("refusername") refusername: ElementRef;
  @ViewChild("refemail") refemail: ElementRef;
  @ViewChild("refmob") refmob: ElementRef;
  @ViewChild("refsub") refsub: ElementRef;
  @ViewChild("refacc") refacc: ElementRef;
  @ViewChild("Geography") Geography: ElementRef;
  @ViewChild("Country") Country: ElementRef;
  @ViewChild("States") States: ElementRef;
  @ViewChild("Regulation") Regulation: ElementRef;
  @ViewChild("sms") sms: ElementRef;
  @ViewChild("web") web: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild('ir')
  private ir: ElementRef;
  Regbygeostate: any;
  requests;
  userCollectCountry;
  userCollectState;
  userCollectRegulation;
  userCollectGeo;
  regRequest;
  geographys: any;
  user_name: any;
  email_id: any; mobile_no: any; subscription: any; access: any; smsaccess: any; geopgrpahy: any; country: any; reg: any; webaccess: any; emailaccess: any;
  formdata: FormGroup;
  state: any;
  jdata: Object;
  selecteGeography = 0;  
  selectedCountry = 0;
  selectedState = 0;
  title = 'app';
  countryVal = [];
  stateVal = [];
  regulationVal = [];
  a = [];
  b = [];
  regu = [];
  regulation_new = [];
  //flag = false;
  tmpArray = [];
  addUse: any;
  fullUse: any;
  test = [];
  obj: {};
  obj1: {};
  t = [];
  obj2 = [];
  inc = 0;
  public myFlag: boolean = false;
  public mySecFlag: boolean = false;
  private _prevSelected: any;  
  public count: any;
  geo_Text; cou_Text; sta_Text; reg_Text; sms_Text = "none"; email_Text = "none"; web_Text = "none"; geo_txt; spc_reg;
  smsVal = 0; webVal = 0; emailVal = 0; getUser_name; getEmail; getMobile; getSubsr; getAcce; geo_Value; cou_Value; sta_Value; reg_Value;
  match: boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private _http: RequestService, private renderer: Renderer2, private elem: ElementRef) {
    let idGet = document.querySelectorAll('#save_button');
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
      this.uncheckAll();
    });
    this.formdata = new FormGroup({
      // usr: new FormControl("", Validators.compose([
      //   Validators.required
      // ])),
      // pwd: new FormControl('', Validators.required)
      user_name: new FormControl(""),
      email_id: new FormControl(""),
      mobile_no: new FormControl(""),
      subscription: new FormControl(""),
      access: new FormControl(""),
      smsaccess: new FormControl(""),
      webaccess: new FormControl(""),            
      emailaccess: new FormControl(""),
      geopgrpahy: new FormControl(''),
      country: new FormControl(""),
      state: new FormControl(""),
      reg: new FormControl("")
    });
    this.formdata.patchValue({
      'country': this.default_country,
      'state': this.default_state,
      'smsaccess': this.default_smsaccess,
      'webaccess': this.default_webaccess,
      'emailaccess': this.default_emailaccess
    });
  }
  ngAfterViewInit() {
  }
  UncheckAll() {
    var w = document.getElementsByTagName('input');
    for (var i = 0; i < w.length; i++) {
      if (w[i].type == 'checkbox') {
        w[i].checked = false;
        console.log("www")
      }
      if (w[i].type == 'radio') {
        w[i].checked = false;
        console.log("www")
      }
    }
  }
  addFunction() {
    this.getUser_name = this.refusername.nativeElement.value;
    this.getEmail = this.refemail.nativeElement.value;
    this.getMobile = this.refmob.nativeElement.value;
    this.getSubsr = this.refsub.nativeElement.value;
    this.getAcce = this.refacc.nativeElement.value;
    var selGeoRef = this.Geography.nativeElement;          // like getElementById           
    var optGeo = selGeoRef.options[selGeoRef.selectedIndex];
    this.geo_Value = optGeo.value;
    this.geo_Text = optGeo.text;
    var selCouRef = this.Country.nativeElement;
    var optCou = selCouRef.options[selCouRef.selectedIndex];
    this.cou_Value = optCou.value;
    this.cou_Text = optCou.text;
    var selStaRef = this.States.nativeElement;
    var optSta = selStaRef.options[selStaRef.selectedIndex];
    this.sta_Value = optSta.value;
    this.sta_Text = optSta.text;
    var selRegRef = this.Regulation.nativeElement;
    var optReg = selRegRef.options[selRegRef.selectedIndex];
    this.reg_Value = optReg.value;
    this.reg_Text = optReg.text;
    var valData: any;
    if (this.geo_Value == "0" || this.cou_Value == "0" || this.sta_Value == "0" || this.reg_Value == "0") {
      alert("please select geography")
    }
    else {
      this.count = this.regu.length;
      console.log(this.count)
      if (this.count === 0) {
        console.log("first if");
        console.log(this.getUser_name)
        console.log("am in", this.count)
        this.myFlag = !this.myFlag;
        if (this.inc >= 2) {
          this.myFlag = true;
        }
       /*unwanted*/ var d = this.geo_Value + ',' + this.cou_Value + ',' + this.sta_Value + ',' + this.reg_Value + ',' + this.sms_Text + ',' + this.web_Text + ',' + this.email_Text;
       /*unwanted*/ var len = d.length;
        valData = this.geo_Value + ',' + this.cou_Value + ',' + this.sta_Value + ',' + this.reg_Value;
        var valNew = valData.split(',');
        this.obj1 = {
          regulation_id: this.reg_Value,
          regulation_name: this.reg_Text,
          geography_id: this.geo_Value,
          country_id: this.cou_Value,
          state_id: this.sta_Value,
          sms: this.smsVal,
          web: this.webVal,
          email: this.webVal
        };
        this.t.push(this.obj1);
        // for (var x in this.t) {
        //   console.log(x)
        // }
        console.log(this.t)
        this.obj = {
          "user_name": this.getUser_name,
          "email_id": this.getEmail,
          "mobile_no": this.getMobile,
          "company_name": "others",
          "role_id": 3,
          "subscription": this.getSubsr,
          "access": this.getAcce,
          "smsaccess": this.sms_Text,
          "webaccess": this.web_Text,
          "emailaccess": this.email_Text,
          "country": this.cou_Text,
          "geography": this.geo_Text,
          "state": this.sta_Text,
          "regulation_name": this.reg_Text,
          regulation: this.t
        };
        this.regulation_new.push(this.obj);
        console.log("am done", this.regulation_new)
        this.regu.push(valNew);

      }
      else if (this.count >= 1 && this.regulation_new.length > 1) {
        console.log("if else");
        this.myFlag = false;
        valData = this.geo_Value + ',' + this.cou_Value + ',' + this.sta_Value + ',' + this.reg_Value;
        var valNew = valData.split(',');
        console.log(valNew, this.regu)
        for (var i = 0; i < this.regu.length; i++) {
          if (JSON.stringify(valNew) == JSON.stringify(this.regu[i])) {
            this.match = true;
            break;
          }
        }
        console.log(this.match)
        if (this.match == false) {
          console.log("else if match");
          this.myFlag = !this.myFlag;
          this.obj1 = {
            regulation_id: this.reg_Value,
            regulation_name: this.reg_Text,
            geography_id: this.geo_Value,
            country_id: this.cou_Value,
            state_id: this.sta_Value,
            sms: this.smsVal,
            web: this.webVal,
            email: this.webVal
          };
          this.t.push(this.obj1);
          console.log(this.t)
          this.obj = {
            "user_name": this.getUser_name,
            "email_id": this.getEmail,
            "mobile_no": this.getMobile,
            "company_name": "others",
            "role_id": 3,
            "subscription": this.getSubsr,
            "access": this.getAcce,
            "smsaccess": this.sms_Text,
            "webaccess": this.web_Text,
            "emailaccess": this.email_Text,
            "country": this.cou_Text,
            "geography": this.geo_Text,
            "state": this.sta_Text,
            "regulation_name": this.reg_Text,
            regulation: this.t
          };
          this.regulation_new.push(this.obj);
          console.log("am done", this.regulation_new)
          this.regu.push(valNew);
        }
        else {
          console.log("if else else");
          this.myFlag = true;
          this.inc++;
          console.log("not not  doma ok", this.inc)
        }

      }
      // else if(this.inc>=2){
      //   this.regu=[];          
      // }
      else {
        console.log("main else");
        this.myFlag = false;
        valData = this.geo_Value + ',' + this.cou_Value + ',' + this.sta_Value + ',' + this.reg_Value;
        var valNew = valData.split(',');
        for (var i = 0; i < this.regu.length; i++) {
          if (JSON.stringify(valNew) == JSON.stringify(this.regu[i])) {
            this.match = true;
            break;
          }
          else {
            this.match = false;
          }
        }
        // console.log("else block")       
        console.log(this.match, valNew, this.regu)
        if (this.match == false) {
          console.log("main match if");
          this.myFlag = !this.myFlag;
          // this.mySecFlag=!this.mySecFlag;  
          // this.obj = {
          //   "geography": this.geo_Text,
          //   "country": this.cou_Text,
          //   "state": this.sta_Text,
          //   "regulation": this.reg_Text,
          //   "sms": this.sms_Text,
          //   "web": this.web_Text,
          //   "email": this.email_Text
          // }
          // this.regulation_new.push(this.obj);
          // console.log(this.regulation_new)
          this.obj1 = {
            regulation_id: this.reg_Value,
            regulation_name: this.reg_Text,
            geography_id: this.geo_Value,
            country_id: this.cou_Value,
            state_id: this.sta_Value,
            sms: this.smsVal,
            web: this.webVal,
            email: this.emailVal
          };
          this.t.push(this.obj1);
          // for (var x in this.t) {
          //   console.log(x)
          // }
          console.log(this.t)
          this.obj = {
            "user_name": this.getUser_name,
            "email_id": this.getEmail,
            "mobile_no": this.getMobile,
            "company_name": "others",
            "role_id": 3,
            "subscription": this.getSubsr,
            "access": this.getAcce,
            "smsaccess": this.sms_Text,
            "webaccess": this.web_Text,
            "emailaccess": this.email_Text,
            "country": this.cou_Text,
            "geography": this.geo_Text,
            "state": this.sta_Text,
            "regulation_name": this.reg_Text,
            regulation: this.t
          };
          this.regulation_new.push(this.obj);
          console.log("am done", this.regulation_new)
          this.regu.push(valNew);
          // this.regu.push(valNew);            
        }
        else {
          console.log("outer else");
          this.myFlag = true;
          this.inc++;
          console.log("not doma ok", this.inc)
        }
      }
    }
  }

  onClickSubmit(data: Client) {
    console.log(data);
    // this.spc_reg=JSON.stringify(data);
    // console.log("this is specific reg json",this.spc_reg)
    // useful console.log(data.access, JSON.stringify(data));
    if (data.access == "full") {
      console.log("hello am full access")
      this._http.newClient(data)
        .subscribe(hero => { this.addUse = hero; console.log(this.addUse) });
    }
    else {
      console.log("hello am restricted access")
      /*make use it*/
      let fClient: fullClient = {
        user_name: this.getUser_name,
        email_id: this.getEmail,
        mobile_no: this.getMobile,
        company_name: 'others',
        role_id: 3,
        subscription: this.getSubsr,
        access: this.getAcce,
        smsaccess: this.smsVal,
        webaccess: this.webVal,
        emailaccess: this.emailVal,
        country: this.cou_Value,
        geopgrpahy: this.geo_Value,
        state: this.sta_Value,
        regulation:this.t                                                                                  
      }
      this._http.fullClient(fClient).subscribe(myFull => { this.fullUse = myFull; console.log(this.fullUse) })

    }
    // this._http.newClient(data)                              
    //   .subscribe(hero => { this.addUse = hero; console.log(this.addUse) });
    //useful console.log("account subscription", data);
  }
  uncheckAll() {
    var i: number;
    var list = this.elem.nativeElement.querySelectorAll("input[type=checkbox]");
    for (var item of list) {
      console.log(item);
      item.checked = false;
    }
  }
  onSelectGeography(args) {
    var geography_id = args.target.value;
    this.geo_txt = args.target.options[args.target.selectedIndex].text;
    this.selecteGeography = geography_id;
    this.selectedCountry = 0;
    this.stateVal = [];
    this.regulationVal = [];  

    this.countryVal = this.userCollectCountry.filter((item) => {
      console.log("country id", item.gid, "geography id", geography_id)
      return item.gid === Number(geography_id)
    });
    console.log(this.geo_txt)
  }
  onSelectCountry(args) {
    var country_id = args.target.value;
    this.cou_Text = args.target.options[args.target.selectedIndex].text;
    this.selectedCountry = country_id;
    this.selectedState = 0;
    this.regulationVal = [];
    this.stateVal = this.userCollectState.filter((item) => {
      console.log("state id", item.gid, "country id", country_id)
      return item.scid === Number(country_id)
    });
  }
  onSelectState(args) {
    var stat_id = args.target.value;
    console.log("new state", stat_id)
    this.sta_Text = args.target.options[args.target.selectedIndex].text;
    this.selectedState = stat_id;
    var finish = document.querySelector('#ret');
    this.regulationVal = this.userCollectRegulation.filter((item) => {
      console.log("geography id", item.state_id, "state id", stat_id)
      return item.state_id == Number(stat_id)
    });
    // this.spc_reg=              
  }
  handleChange(evt) {
    var i: number;
    let elements = this.elem.nativeElement.querySelectorAll(".classImLookingFor");
    let addElement = this.elem.nativeElement.querySelectorAll(".classImAdd");
    var target = evt.target;
    if (target.checked) {
      for (i = 0; i < elements.length; i++) {
        elements[i].disabled = true;
      }
      for (i = 0; i < addElement.length; i++) {
        addElement[i].style.visibility = "hidden";
      }
    } else {
      alert("fails");
    }
  }
  handleChangeRest(evt) {
    var i: number;
    let elements = this.elem.nativeElement.querySelectorAll(".classImLookingFor");
    let addElement = this.elem.nativeElement.querySelectorAll(".classImAdd");
    var target = evt.target;
    if (target.checked) {
      for (i = 0; i < elements.length; i++) {
        elements[i].disabled = false;
      }
      for (i = 0; i < addElement.length; i++) {
        addElement[i].style.visibility = "visible";
      }
    } else {
      alert("fails");
    }
  }
  smsChoose(event) {
    var sms_Chk = this.sms.nativeElement.value;
    if (event.target.checked == true && sms_Chk === "sms") {
      this.sms_Text = "sms";
      this.smsVal = (this.sms_Text === "sms") ? 1 : 0;
    }
    else {
      this.sms_Text = "none";
      console.log(this.sms_Text)
      this.smsVal = (this.sms_Text === "none") ? 0 : 1;
      console.log(this.smsVal)
    }
  }
  webChoose(event) {
    var web_Chk = this.web.nativeElement.value;
    if (event.target.checked == true && web_Chk === "web") {
      this.web_Text = "web";
      this.webVal = (this.web_Text === "web") ? 1 : 0;
    }
    else {
      this.web_Text = "none";
      this.webVal = (this.web_Text === "none") ? 0 : 1;

    }
  }
  emailChoose(event) {
    var email_Chk = this.email.nativeElement.value;
    if (event.target.checked == true && email_Chk === "email") {
      this.email_Text = "email";
      this.emailVal = (this.email_Text === "email") ? 1 : 0;
    }
    else {
      this.email_Text = "none";
      this.emailVal = (this.email_Text === "none") ? 0 : 1;

    }
  }
  deleteFieldValue(index) {
    this.regulation_new.splice(index, 1);
    this.regu.splice(index, 1);
  }
}
