import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RequestService } from './request.service';
import { Iterator } from '@progress/kendo-angular-grid/dist/es2015/data/data.iterators';
import * as $ from '../../resources/js/jquery.min.js';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',    
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  //usr;
  //formdata;           
  @ViewChild('abc') abc: ElementRef;
  @ViewChild('myId') myId: ElementRef;
  txtValue;
  pwdTxtValue;
  optionTest;
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
    $(document).ready(function () {
      $(".classImAdd").click(function () {
        var defaultSelectValueGeo = $("#Geography").find(":selected").val();
        var defaultSelectValueCou = $("#Country").find(":selected").val();
        var defaultSelectValueStat = $("#States").find(":selected").val();
        var defaultSelectValueReg = $("#Regulation").find(":selected").val();
        var selectedText = $("#Geography").find("option:selected").text();
        var selectedCountryText = $("#Country").find("option:selected").text();
        var selectedStateText = $("#States").find("option:selected").text();
        var selectedRegulationText = $("#Regulation").find("option:selected").text();
        var selectedValue = $("#Geography").val();
        var smsTxtVal = $("#sms").is(':checked') ? "Yes" : "No";
        var webTxtVal = $("#web").is(':checked') ? "Yes" : "No";
        var emailTxtVal = $("#email").is(':checked') ? "Yes" : "No";
        // console.log(smsTxtVal)       
        // if ($("#sms").is(':checked'))
        //   $("#smsInfo").html('YES');  // checked
        // else
        //   $("#smsInfo").html('NO');
        // if ($("#web").is(':checked'))
        //   $("#webInfo").html('YES');  // checked
        // else
        //   $("#webInfo").html('NO');
        // if ($("#email").is(':checked'))
        //   $("#emailInfo").html('YES');  // checked
        // else
        //   $("#emailInfo").html('NO');
        // $('#detailInfo').html(selectedText);
        // $('#countryInfo').html(selectedCountryText);
        // $('#stateInfo').html(selectedStateText);
        // $('#regulationInfo').html(selectedRegulationText);
        //var rowCount = $('#myTable tbody tr').length;  
        //console.log(defaultSelectValueGeo, "geography default value")
        if (defaultSelectValueGeo == "0" && defaultSelectValueCou == "0" && defaultSelectValueStat == "0" && defaultSelectValueReg == "0") {
          //$('#myTable tbody').hide();
          alert("please select geography")
        }
        else {
          $("#myTable tbody").empty();
          if ($('#myTable tbody').is(':empty')) {
            console.log("am empty")
            $('#myTable tbody').append('<tr class="child"><td>' + selectedText + '</td><td>' + selectedCountryText + '</td><td>' + selectedStateText + '</td><td>' + selectedRegulationText + '</td> <td>' + smsTxtVal + '</td> <td>' + webTxtVal + '</td>  <td>' + emailTxtVal + '</td> <td><input type="button" value="Delete" id="btn_a" /></td></tr>');
          }
        }
      });
      $('#myTable tbody').on('click', '#btn_a', function () {
        $("#myTable tbody").empty();
        //console.log('clicked success');                 
      });
    });
  }
  ngAfterViewInit() {
    //let elements = this.elem.nativeElement.querySelectorAll('.classImLookingFor');
    //console.log(elements)  
    //console.log(this.myId.nativeElement);
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
    // this.geoOptionOnly=this.userCollectGeo.filter((dump)=>{     
    //   if(dump.id===Number(geography_id)){return dump.name}  
    // })
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
  // onClick(event) {
  //   let tableId = this.elem.nativeElement.querySelector('#myTable');

  //   let rowCount = tableId.getElementsByTagName('tr').length;
  //   //console.log(tableId);          
  //   if (rowCount == 1) {
  //     var row = tableId.insertRow(0);         
  //     var cell1 = row.insertCell(0);   
  //     var cell2 = row.insertCell(1);
  //     var cell3 = row.insertCell(2);
  //     var cell4 = row.insertCell(3);
  //     var cell5 = row.insertCell(4);
  //     var cell6 = row.insertCell(5);
  //     var cell7 = row.insertCell(6);   
  //     cell1.setAttribute("id","geoInfo"); 
  //     cell2.setAttribute("id","countryInfo");    
  //     cell3.setAttribute("id","stateInfo");  
  //     cell4.setAttribute("id","regulationInfo");  
  //     cell5.setAttribute("id","smsInfo");  
  //     cell6.setAttribute("id","webInfo");     
  //     cell7.setAttribute("id","emailInfo");              
  //     cell1.innerHTML = "NEW CELL1";   
  //     cell2.innerHTML = "NEW CELL2";     
  //     cell3.innerHTML = "NEW CELL3";
  //     cell4.innerHTML = "NEW CELL4";
  //     cell5.innerHTML = "NEW CELL5";
  //     cell6.innerHTML = "NEW CELL6";
  //     cell7.innerHTML = "NEW CELL7";
  //   }
  //   console.log(row);
  // }

}
