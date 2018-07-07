import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DocumentService } from './document.service';
import { DocumentI, DocCard } from './document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documentIdToUpdate = null;
  saveDoc: any;
  getDocName: any;
  getDocDescription: any;
  public show: boolean = false;
  documentResponse: any;
  public correct: boolean = false;

  constructor(private http: HttpClient, private documentService: DocumentService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }
  docInter: DocumentI = {
    name: '',
    description: ''
  }    
  @ViewChild("doctypename") doctypename: ElementRef;
  @ViewChild("doctypedescription") doctypedescription: ElementRef;
  formdata: FormGroup;
  ngOnInit() {
    this.formdata = new FormGroup({
      documentName: new FormControl(""),
      documentDescription: new FormControl("")
    });
    this.loadAllDocuments();
  }
  loadAllDocuments() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/doctype', { headers: headers }).subscribe(
      data => {
        this.documentResponse = data
        console.log(data);
      });
  }
  toggle() {
    this.correct = !this.correct;
    this._router.navigate(['/docCreate']);
  }
  saveEdit() {
    this.getDocName = this.doctypename.nativeElement.value;
    this.getDocDescription = this.doctypedescription.nativeElement.value;
    let docInter: DocumentI = {
      name: this.getDocName,
      description: this.getDocDescription
    }     
    if (this.documentIdToUpdate === null) {
      this.documentService.saveDocument(docInter)
        .subscribe(
          mySave => {
            this.saveDoc = mySave;                                       
            console.log(this.saveDoc)
            this.loadAllDocuments();
            this._router.navigate(['/docList']);
            this.show = !this.show;
          });       
      console.warn("am in create")
    }
    else {
      docInter.id = this.documentIdToUpdate;
      this.documentService.updateDocument(docInter).subscribe(successCode => {
        this.loadAllDocuments();
      });
      console.warn("am in update")
      this.correct = !this.correct;
    }
  }
  loadArticleToEdit(documentId: string) {

    this.documentService.getDocumentById(documentId)
      .subscribe(doc => {
        this.documentIdToUpdate = doc[0].id;                       
        this.formdata.setValue({ documentName: doc[0].name, documentDescription: doc[0].description });
      });
    this.correct = !this.correct;
  }
  deleteArticle(documentId: string) {
   
    this.documentService.deleteDocumentById(documentId)
      .subscribe(doc => {      
        this.loadAllDocuments();           
      });
    this._router.navigate(['/docList']);
  }

}
