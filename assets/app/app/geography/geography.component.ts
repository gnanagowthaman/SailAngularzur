  import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CreateService } from './create.service';
import { GeoCreate } from './geo';

@Component({
  selector: 'app-geography',
  templateUrl: './geography.component.html',
  styleUrls: ['./geography.component.css']
})
export class GeographyComponent implements OnInit {
  articleIdToUpdate = null;
  saveGeo: any;
  getGeoName: any;
  getGeoDescription: any;
  public show: boolean = false;
  public buttonName: any = 'Show';
  router: any;
  myData: any;
  public correct: boolean = false;

  constructor(private http: HttpClient, private createService: CreateService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }
  geoCreate: GeoCreate = {
    
    name: '',
    description: ''
  }
  @ViewChild("geoname") geoname: ElementRef;
  @ViewChild("geodescription") geodescription: ElementRef;
  formdata: FormGroup;
  ngOnInit() {
    this.formdata = new FormGroup({
      geographyName: new FormControl(""),
      geoDescription: new FormControl("")
    });
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/geography', { headers: headers }).subscribe(
      data => {
        this.myData = data
        console.log(data);                    
      });                                                                             
    this.getGeographyAll();
  }
  
  getGeographyAll() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/geography', { headers: headers }).subscribe(
      data => {
        this.myData = data
        console.log(data);
      });
  }
  toggle() {
    this.correct = !this.correct;
    this._router.navigate(['/geoCreate']);
  }
  onClickSubmit(data) {
    
  }       
  saveEdit(){   
    this.getGeoName = this.geoname.nativeElement.value;
    this.getGeoDescription = this.geodescription.nativeElement.value;
    this.router = Router;

    let geoCreate: GeoCreate = {
      name: this.getGeoName,
      description: this.getGeoDescription
    }
   let geoform=this.formdata.value;
   console.log(this.articleIdToUpdate)        
    if (this.articleIdToUpdate === null) {
      this.createService.saveGeography(geoCreate)
        .subscribe(
          mySave => {
            this.saveGeo = mySave;
            console.log(this.saveGeo)
            this.getGeographyAll();
            this._router.navigate(['/geoList']);                      
            this.show = !this.show;
          });
      console.warn("am in create")
    }
    else {                                      
      geoCreate.id = this.articleIdToUpdate; 	      
      this.createService.updateGeography(geoCreate).subscribe(successCode =>{
        this.getGeographyAll();
      });                                                                                     
      console.warn("am in update")
      this.correct = !this.correct;         
    }
  }
  loadArticleToEdit(geoId: string) {             
                     
    this.createService.getGeographyById(geoId)  
      .subscribe(geot => {                
        this.articleIdToUpdate = geot[0].id;                                                 
        this.formdata.setValue({ geographyName: geot[0].name, geoDescription: geot[0].description });           
      });            
      this.correct = !this.correct;               
  }
  deleteArticle(geoId: string) {
  
    this.createService.deleteGeographyById(geoId)
      .subscribe(geot => {
          this.getGeographyAll();	
        });    
        this._router.navigate(['/geoList']);          
 }
}
// this.articleIdToUpdate = geot[0].id;     
// console.log("am loadArticle",this.articleIdToUpdate)  
 // this.formdata.setValue({ geographyName: geo.name, geoDescription: geo.description });
    // let geoCreate: GeoCreate = {
        //   name: this.getGeoName,
        //   description: this.getGeoDescription
        // }  

/*       useful
  console.log(geot);
        console.log(geot[0].name);
        console.log(geot[0].description);  */