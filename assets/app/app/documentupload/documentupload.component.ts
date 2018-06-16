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
  myDir= '';
  spDocumentResponse: any;
  documentResponse: any;
  resultResponse:any;
  geoArrayResponse:any;countryArrayResponse:any;stateArrayResponse:any;domainArrayResponse:any;
  regulatorArrayResponse:any;regulationArrayResponse:any;documentArrayResponse:any;
  subDocumentArrayResponse:any;
  optionSelected=0;
  constructor(private http: HttpClient, private documentService: DocumentuploadService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }
  formdata: FormGroup;
  ngOnInit() {
    this.formdata = new FormGroup({
      uploadGeography: new FormControl(""),
      // subDocDescription: new FormControl(""),
      // subDocSelectDocument: new FormControl(""),                                           
    });
    this.specialDocumentListLoad();
    this.documentListLoad();
    this.findRegulationDataMethod();                           
  }
  findRegulationDataMethod(){
    this.documentService.getFindRegulationData().subscribe(result => {
      this.resultResponse=result;
      this.geoArrayResponse=this.resultResponse.geoCollection;
      console.log("am geography arry response",this.geoArrayResponse)                     
      this.countryArrayResponse=this.resultResponse.countryCollection;
      this.stateArrayResponse=this.resultResponse.stateCollection;
      this.domainArrayResponse=this.resultResponse.domainCollection;
      this.regulatorArrayResponse=this.resultResponse.regulatorCollection;
      this.regulationArrayResponse=this.resultResponse.regCollection;
      this.documentArrayResponse=this.resultResponse.documentCollection;
      this.subDocumentArrayResponse=this.resultResponse.subDocumentCollection;       
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
  onSelectGeography(evt){

  }
}     
