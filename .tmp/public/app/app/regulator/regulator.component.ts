import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RegulatorService } from './regulator.service';
import { RegulatorI,RegulatorCard } from './regulator';

@Component({                                
  selector: 'app-regulator',
  templateUrl: './regulator.component.html',
  styleUrls: ['./regulator.component.css']
})
export class RegulatorComponent implements OnInit {
  subRegIdToUpdate=null;
  saveRegulator: any;
  getRegulatorName: any;
  getRegulatorDescription: any;
  public show: boolean = false;
  regulatorResponse: any;
  public correct: boolean = false;
  constructor(private http: HttpClient, private regulatorService: RegulatorService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }
  regObj: RegulatorI = {
    
    name: '',
    description: ''
  }
  @ViewChild("regulatorname") regulatorname: ElementRef;
  @ViewChild("regulatordescription") regulatordescription: ElementRef;
  formdata: FormGroup;
  ngOnInit() {      
    this.formdata = new FormGroup({
      regulatorName: new FormControl(""),
      regulatorDescription: new FormControl("")   
    });
   this.loadAllRegulator();
  }
  loadAllRegulator(){
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   
  this.http.get('http://localhost:1337/regulator', { headers: headers }).subscribe(
    data => {
      this.regulatorResponse = data
      console.log(data);                    
    });                
  }
  toggle() {
    this.correct = !this.correct;
    this._router.navigate(['/regCreate']);
  } 
  saveEdit(){   
    this.getRegulatorName = this.regulatorname.nativeElement.value;
    this.getRegulatorDescription = this.regulatordescription.nativeElement.value;
    let regObj: RegulatorI = {
      name: this.getRegulatorName,
      description: this.getRegulatorDescription
    }
   console.log(this.subRegIdToUpdate)        
    if (this.subRegIdToUpdate === null) {
      this.regulatorService.saveRegulator(regObj)
        .subscribe(
          mySave => {
            this.saveRegulator = mySave;
            console.log(this.saveRegulator)
            this.loadAllRegulator();
            this._router.navigate(['/regList']);                      
            this.show = !this.show;
          });
      console.warn("am in create")
    }     
    else {                                      
      regObj.id = this.subRegIdToUpdate; 	      
      this.regulatorService.updateRegulator(regObj).subscribe(successCode =>{
        this.loadAllRegulator();
      });                                                                                     
      console.warn("am in update")
      this.correct = !this.correct;         
    }
  }
  loadArticleToEdit(regId: string) {                                        
                     
    this.regulatorService.getRegulatorById(regId)  
      .subscribe(regl => {                
        this.subRegIdToUpdate = regl[0].id;                                                 
        this.formdata.setValue({ regulatorName: regl[0].name, regulatorDescription: regl[0].description });           
      });            
      this.correct = !this.correct;                                           
  }
  deleteArticle(regId: string) {
                             
    this.regulatorService.deleteRegulatorById(regId)
      .subscribe(regl => {
          this.loadAllRegulator();	
        });                    
        this._router.navigate(['/regList']);          
 }
}

