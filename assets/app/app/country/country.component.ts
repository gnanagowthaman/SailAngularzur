import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CountryService } from './country.service';
import { CountryI, CountryCard } from './cout';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  articleIdToUpdate = null;
  //un optionSelected: any;
  public show: boolean = false;
  geographyLoad:any;
  myData: any;
  geoData:any;geo_Value:any;geo_Text:any;
  public correct: boolean = false;
  couName:any;couDescription:any;couCode:any;couSelectGeography:any;
  optionSelected=0;
  constructor(private http: HttpClient, private countryService: CountryService, private renderer: Renderer2, private elem: ElementRef, private _router: Router) { }
  couInter: CountryI = {

    name: '',
    description: '',
    geo_id: 0,
    country_code: ''
  }
  @ViewChild("countryname") countryname: ElementRef;
  @ViewChild("countrydescription") countrydescription: ElementRef;
  @ViewChild("countrycode") countrycode: ElementRef;
  @ViewChild("selectGeography") selectGeography: ElementRef;
  formdata: FormGroup;
  ngOnInit() {
    this.formdata = new FormGroup({
      countryName: new FormControl(""),
      countryDescription: new FormControl(""),
      countryCode: new FormControl(""),
      countryGeography: new FormControl(""),                                
    });
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.get('http://localhost:1337/country', { headers: headers }).subscribe(
      data => {
        this.myData = data
        console.log(data);
      });   
      this.geographyLoad=this.http.get('http://localhost:1337/geographys', { headers: headers }).subscribe(
      data => {
        this.geoData = data                                     
        console.log(this.geoData,"dfdsfdsfsdf");
      });                
    this.getCountryAll();
    
  }              
  getCountryAll() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/country', { headers: headers }).subscribe(
      data => {
        this.myData = data
        console.log(data);
      });
  }                                                        
  toggle() {
    this.correct = !this.correct;
    this._router.navigate(['/couCreate']);
  }
  ngAfterViewInit() {
        
  }
  onClickSubmit(data: CountryI) {
    
  console.log(this.geo_Value,this.geo_Text)         
  }
  saveEdit() {
          
    if (this.articleIdToUpdate === null) {
      this.couName = this.countryname.nativeElement.value;
      this.couDescription = this.countrydescription.nativeElement.value;
      this.couCode=this.countrycode.nativeElement.value;
      var geoLoadRef=this.selectGeography.nativeElement;    
      var optGeo=geoLoadRef.options[geoLoadRef.selectedIndex]; 
      this.geo_Value = optGeo.value;        
      this.geo_Text = optGeo.text;                   
      console.warn("am in create")
    }
    else {                                      
                                                                               
      console.warn("am in update")
      this.correct = !this.correct;         
    }       
  }
  loadArticleToEdit(couId: string) {   
    this.countryService.getCountryById(couId).subscribe(geot => {   
      console.log(geot)             
      this.articleIdToUpdate = geot[0].id;    
     
     // this.formdata.setValue({ geographyName: geot[0].name, geoDescription: geot[0].description });           
    });            
    this.correct = !this.correct;    
  }
  deleteArticle(couId: string) {
  }
  onOptionSelected(event){

    console.log(event); //option value will be sent as event
  }
}
