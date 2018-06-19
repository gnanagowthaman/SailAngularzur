import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DocumentuploadService } from './documentupload.service';
import { UploadI } from './upload-i';

@Component({
  selector: 'app-documentupload',
  templateUrl: './documentupload.component.html',
  styleUrls: ['./documentupload.component.css']
})
export class DocumentuploadComponent implements OnInit {
  // public correct: boolean = false;
  // public testdemo: boolean = false;
  // public foo:number;
  myDir = '';
  buttonDisabled: boolean;
  spDocumentResponse: any;
  documentResponse: any;
  resultResponse: any;
  geoArrayResponse: any; countryArrayResponse: any; stateArrayResponse: any; domainArrayResponse: any;
  regulatorArrayResponse: any; regulationArrayResponse: any; documentArrayResponse: any;
  subDocumentArrayResponse: any;
  geoText: any; cou_Text: any;
  optionSelected = 0;
  selectedCountry = 0;
  selectedState = 0;
  selectedDomain = 0;
  selectedRegulator = 0;
  countryVal = [];
  stateVal = [];                       
  domainVal = [];              
  regulatorVal=[];
  butDisabled: boolean = true; buttonDisabledState: boolean = true; buttonDisabledDomain: boolean = true;buttonDisabledRegulator: boolean = true;
  constructor(private http: HttpClient, private documentService: DocumentuploadService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }
  formdata: FormGroup;
  ngOnInit() {
    this.formdata = new FormGroup({
      uploadgeography: new FormControl(""),
      uploadcountry: new FormControl(""),
      uploadstate: new FormControl(""),
      uploaddomain: new FormControl(""),
      uploadregulator: new FormControl("")   
      // subDocDescription: new FormControl(""),
      // subDocSelectDocument: new FormControl(""),                                           
    });
    this.specialDocumentListLoad();
    this.documentListLoad();
    this.findRegulationDataMethod();
  }
  findRegulationDataMethod() {
    this.documentService.getFindRegulationData().subscribe(result => {
      this.resultResponse = result;
      this.geoArrayResponse = this.resultResponse.geoCollection;
      console.log("am geography arry response", this.geoArrayResponse)
      this.countryArrayResponse = this.resultResponse.countryCollection;
      this.stateArrayResponse = this.resultResponse.stateCollection;
      this.domainArrayResponse = this.resultResponse.domainCollection;
      this.regulatorArrayResponse = this.resultResponse.regulatorCollection;
      this.regulationArrayResponse = this.resultResponse.regCollection;
      this.documentArrayResponse = this.resultResponse.documentCollection;
      this.subDocumentArrayResponse = this.resultResponse.subDocumentCollection;
    });
  }
  specialDocumentListLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/document', { headers: headers }).subscribe(
      data => {
        this.documentResponse = data
        console.log(data);
      });
  }
  documentListLoad() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/spdocument', { headers: headers }).subscribe(
      data => {
        this.spDocumentResponse = data
        console.log(data);
      });
  }
  toggle() {
    //this.foo=1;             
    this._router.navigate(['/uploadCreate']);
  }
  ngAfterViewInit() {
  }
  onSelectGeography(evt) {
    var geography_id = evt.target.value;
    this.geoText = evt.target.options[evt.target.selectedIndex].text;
    this.optionSelected = geography_id;

    this.selectedCountry = 0;
    this.selectedState = 0;
    this.selectedDomain = 0;

    this.domainVal = [];
    this.stateVal = [];

    this.buttonDisabled = true;
    this.countryVal = this.countryArrayResponse.filter((item) => {
      console.log("country id", item.geography_id, "geography id", geography_id)
      console.log("item", item)
      return item.geography_id === Number(geography_id)
    });
    console.log(this.geoText)
  }
  onSelectCountry(args) {
    var country_id = args.target.value;
    this.cou_Text = args.target.options[args.target.selectedIndex].text;
    this.selectedCountry = country_id;

    this.selectedState = 0;
    this.selectedDomain = 0;                  

    this.domainVal = [];

    this.buttonDisabledState = true;
    this.stateVal = this.stateArrayResponse.filter((item) => {
      console.log("state id", item.country_id, "country id", country_id)
      return item.country_id === Number(country_id)
    });
  }
  onSelectState(args) {
    var state_id = args.target.value;
    this.selectedState = state_id;
    this.selectedDomain = 0;
    this.buttonDisabledDomain = true;
    this.domainVal = this.domainArrayResponse.filter((item) => {
      console.log("state id", item.sid, "country id", state_id)
      if (item.sid === Number(state_id) && item.gid === Number(this.optionSelected) && item.cntid === Number(this.selectedCountry)) {
        return item.sid;
      }                 
    });
  }
}
