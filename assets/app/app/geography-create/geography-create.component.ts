import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {CreateService} from './create.service';
import { GeoCreate } from './geocreate';

@Component({
  selector: 'app-geography-create',
  templateUrl: './geography-create.component.html',
  styleUrls: ['./geography-create.component.css']
})
export class GeographyCreateComponent implements OnInit {
  router:any;
  saveGeo:any;
  getGeoName:any;
  getGeoDescription:any;
  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor(private http: HttpClient,private createService:CreateService,private renderer: Renderer2, private elem: ElementRef,private _router:Router) { }
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
  }
  ngAfterViewInit() {
  }
  onClickSubmit(data){                             
    this.getGeoName = this.geoname.nativeElement.value;
    this.getGeoDescription = this.geodescription.nativeElement.value;
    this.router=Router;
                            
    let geoCreate: GeoCreate = {
      name: this.getGeoName,
      description: this.getGeoDescription                                                                                   
    }
    this.createService.saveGeography(geoCreate)
    .subscribe(
      mySave => { 
      this.saveGeo = mySave; 
      console.log(this.saveGeo)
      this._router.navigate(['/geoList']);    
      this.show = !this.show;                              
    })  
    console.warn("am in onsubmit geography")  
  }          
}
