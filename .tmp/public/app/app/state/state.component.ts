import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StateService } from './state.service';
import { StateI, StateCard, StateIU, StateCardU } from './state';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit, AfterViewInit {
  stateIdToUpdate = null;
  saveState: any;
  public show: boolean = false;
  stateResponse: any;
  CountryResponse: any;
  GeographyResponse: any;
  geographyOptionValue: any;
  geographyOptionText: any;
  countryOptionValue: any;
  countryOptionText: any;
  public correct: boolean = false;
  refStateName: any;
  refStateDescription: any;
  refStateCode: any;
  refStateGeography: any;
  refStateCountry: any;
  optionSelectedGeography = 0;
  optionSelectedCountry = 0;
  fetchGeography: any;
  fetchCountry: any;
  refGeo_Value: any; refGeo_Text: any; refCou_Value: any; refCou_Text: any;
  countryVal = [];
  stateVal = [];
  constructor(private http: HttpClient, private stateService: StateService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }
  stateInterface: StateI = {
    name: '',
    description: '',
    state_code: '',
    gid: 0,
    country_id: 0
  }
  @ViewChild("statename") statename: ElementRef;
  @ViewChild("statedescription") statedescription: ElementRef;
  @ViewChild("statecode") statecode: ElementRef;
  @ViewChild("selectGeography") selectGeography: ElementRef;
  @ViewChild("selectCountry") selectCountry: ElementRef;
  formdata: FormGroup; 
  ngOnInit() {
    this.formdata = new FormGroup({
      stateName: new FormControl(""),
      stateDescription: new FormControl(""),
      stateCode: new FormControl(""),
      stateGeography: new FormControl(""),
      stateCountry: new FormControl("")
    });
    this.onstateLoad();
    this.onGeographyLoad();
    this.onCountryLoad();
  }
  toggle() {
    this.correct = !this.correct;
    this._router.navigate(['/stateCreate']);
  }
  onstateLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.get('http://localhost:1337/states', { headers: headers }).subscribe(
      data => {
        this.stateResponse = data
        console.log(this.stateResponse, "state Response");
      });
  }
  onGeographyLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.get('http://localhost:1337/geographys', { headers: headers }).subscribe(
      data => {
        this.GeographyResponse = data
        console.log(this.GeographyResponse, "Geography Response");
      });
  }
  onCountryLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.get('http://localhost:1337/country', { headers: headers }).subscribe(
      data => {
        this.CountryResponse = data
        console.log(this.CountryResponse, "CountryResponse");
      });
  }
  ngAfterViewInit() {

  }
  onClickSubmit(data) {
    console.log("on submit")
  }

  saveEdit() {
    this.refStateName = this.statename.nativeElement.value;
    this.refStateDescription = this.statedescription.nativeElement.value;
    this.refStateCode = this.statecode.nativeElement.value;
    this.refStateGeography = this.selectGeography.nativeElement;
    var optGeo = this.refStateGeography.options[this.refStateGeography.selectedIndex];
    this.refGeo_Value = optGeo.value;
    this.refGeo_Text = optGeo.text;
    this.refStateCountry = this.selectCountry.nativeElement;
    var optCou = this.refStateCountry.options[this.refStateCountry.selectedIndex];
    this.refCou_Value = optCou.value;
    this.refCou_Text = optCou.text;
    this.fetchGeography = this.GeographyResponse;
    this.fetchCountry = this.CountryResponse;
    console.log("fetch response", this.fetchGeography)
    let stateInterface: StateI = {
      name: this.refStateName,
      description: this.refStateDescription,
      state_code: this.refStateCode,
      gid: this.refGeo_Value,
      country_id: this.refCou_Value
    }
    let stateInterfaceUpdate: StateIU = {
      name: this.refStateName,
      description: this.refStateDescription,
      state_code: this.refStateCode,
      geography_id: this.refGeo_Value,
      country_id: this.refCou_Value        
    }

    if (this.stateIdToUpdate === null) {  
      this.stateService.saveState(stateInterfaceUpdate).subscribe(
        mySave => {
          this.saveState = mySave;
          console.log(this.saveState)
          this.onstateLoad();
          this._router.navigate(['/stateList']);
          this.show = !this.show;
        });
      console.warn("am in create")
    }
    else {               
      stateInterfaceUpdate.id = this.stateIdToUpdate;
      this.stateService.getStateAll(stateInterfaceUpdate).subscribe(successCode => {
        this.onstateLoad();
      });
      console.warn("am in update")
      this.correct = !this.correct;
    }
  }
  loadStateToEdit(stateId: string) {
    this.stateService.getStateById(stateId).subscribe(sta => {
      this.stateIdToUpdate = sta[0].id;
      console.log(this.stateIdToUpdate)   
      this.formdata.setValue({ stateName: sta[0].name, stateDescription: sta[0].description, stateCode: sta[0].state_code, stateGeography: sta[0].gid, stateCountry: sta[0].country_id });
    });
    this.correct = !this.correct;      
  }
  deleteState(stateId: string) {
    this.stateService.deleteStateById(stateId)
    .subscribe(sta => {
        this.onstateLoad();	                        
      });    
      this._router.navigate(['/stateList']);  
  }
  onOptionsSelectedGeo(event) {
    this.fetchGeography = this.stateResponse;
    console.log("fetch response", this.fetchGeography)
    this.fetchCountry = this.CountryResponse;
    console.log('fetch country response', this.CountryResponse)
    var geography_id = event.target.value;
    this.refGeo_Text = event.target.options[event.target.selectedIndex].text;
    this.optionSelectedGeography = geography_id;
    this.optionSelectedCountry = 0;
    this.stateVal = [];
    this.countryVal = this.fetchCountry.filter((item) => {
      console.log("country id", item.gid, "geography id", geography_id)
      return item.gid === Number(geography_id)
    });
  }
  onOptionsSelectedCountry(event) {
    var country_id = event.target.value;
    this.refCou_Text = event.target.options[event.target.selectedIndex].text;
    this.optionSelectedCountry = country_id;

  }
}
