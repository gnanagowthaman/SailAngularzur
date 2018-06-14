import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SubdocumentmanagementService } from './subdocumentmanagement.service';
import { SubDocMgtI, SubDocMgtCard } from './subdocmgt';

@Component({
  selector: 'app-subdocumentmanagement',
  templateUrl: './subdocumentmanagement.component.html',
  styleUrls: ['./subdocumentmanagement.component.css']
})
export class SubdocumentmanagementComponent implements OnInit {
  subDocIdToUpdate = null;
  saveSubDoc: any;
  public show: boolean = false;
  public correct: boolean = false;
  subDocMgtResponse: any;
  documentResponse: any;
  subDoc_Name:any;subDoc_Description:any;
  subdoc_Value: any; subdoc_Text: any;
  optionSelected = 0;
  constructor(private http: HttpClient, private subDocService: SubdocumentmanagementService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }
  subDocInter: SubDocMgtI = {
    name: '',
    description: '',
    doc_id:0,
    parent_id: 0                                                
  }
  @ViewChild("subDocname") subDocname: ElementRef;
  @ViewChild("subDocdescription") subDocdescription: ElementRef;
  @ViewChild("selectDocument") selectDocument: ElementRef;
  formdata: FormGroup;
  ngOnInit() {
    this.formdata = new FormGroup({
      subDocName: new FormControl(""),
      subDocDescription: new FormControl(""),
      subDocSelectDocument: new FormControl(""),
    });
    this.loadAllSubDocuments();
    this.loadDropDownDocumentst();
  }
  loadAllSubDocuments(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.get('http://localhost:1337/getAllSubDoc', { headers: headers }).subscribe(
      data => {
        this.subDocMgtResponse = data
        console.log(data);
      });
  }
  loadDropDownDocumentst(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.get('http://localhost:1337/allDoctype', { headers: headers }).subscribe(
      data => {  
        this.documentResponse = data   
        console.log(data);
      });
  }
  toggle() {
    this.correct = !this.correct;
    this._router.navigate(['/subDocCreate']);        
  }
  ngAfterViewInit() {

  }             
  onClickSubmit(data) {       
    console.log("on submit")    
  }
  saveEdit() {
    this.subDoc_Name = this.subDocname.nativeElement.value;          
    this.subDoc_Description = this.subDocdescription.nativeElement.value;
    var subDocLoadRef = this.selectDocument.nativeElement;
    var optSubDoc = subDocLoadRef.options[subDocLoadRef.selectedIndex];
    this.subdoc_Value = optSubDoc.value;
    this.subdoc_Text = optSubDoc.text;                         
    let subDocInter: SubDocMgtI = {  
      name:this.subDoc_Name,
      description:this.subDoc_Description,
      parent_id:this.subdoc_Value,
      doc_id:this.subdoc_Value
    }                          
    console.log("am save edit subdoc value",subDocInter.parent_id);     
    console.log("am save edit subdoc value",subDocInter.doc_id);
    if (this.subDocIdToUpdate === null) {       
                                   
      this.subDocService.saveSubDocument(subDocInter)
      .subscribe(
        mySave => {
          this.saveSubDoc = mySave;
          console.log(this.saveSubDoc)
          this.loadAllSubDocuments();                                        

          this._router.navigate(['/subDocList']);                      
          this.show = !this.show;
        });
      console.warn("am in create")   
    }
    else {      
      subDocInter.id=this.subDocIdToUpdate;                                                      
      this.subDocService.SubDocumentUpdate(subDocInter).subscribe(successCode =>{
        this.loadAllSubDocuments();                                   
      });               
      console.warn("am in update")                          
      this.correct = !this.correct;                     
    }                                                      
  }                                                            
  loadArticleToEdit(subDocId: string) {
             
    this.subDocService.getSubDocumentById(subDocId).subscribe(subdoc => {         
      this.subDocIdToUpdate = subdoc[0].id;                                   
      console.log(this.subDocIdToUpdate)                                                                                
      this.formdata.setValue({ subDocName: subdoc[0].name, subDocDescription: subdoc[0].description,subDocSelectDocument:subdoc[0].id});          
    });
    this.correct = !this.correct;
  }
  deleteArticle(subDocId: string) {
    this.subDocService.deleteSubDocumentById(subDocId)
      .subscribe(subdoc => {             
          this.loadAllSubDocuments();	          
        });    
        this._router.navigate(['/subDocList']);  
  }
}
                    