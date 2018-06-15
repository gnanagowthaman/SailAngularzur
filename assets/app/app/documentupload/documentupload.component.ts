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
  public correct: boolean = false;              
  spDocumentResponse: any;
  documentResponse:any;
  constructor(private http: HttpClient, private documentService: DocumentuploadService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }

  ngOnInit() {
    this.specialDocumentListLoad();
    this.documentListLoad();
  }
  specialDocumentListLoad(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     
    this.http.get('http://localhost:1337/document', { headers: headers }).subscribe(
      data => {
        this.documentResponse = data
        console.log(data);                                   
      });    
  }
  documentListLoad(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     
    this.http.get('http://localhost:1337/spdocument', { headers: headers }).subscribe(
      data => {
        this.spDocumentResponse = data
        console.log(data);                    
      });    
  }
}     
