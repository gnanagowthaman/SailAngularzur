import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { GeographyCreateService } from './geography-create.service';
@Component({
  selector: 'app-geography-edit',
  templateUrl: './geography-edit.component.html',
  styleUrls: ['./geography-edit.component.css']
})
export class GeographyEditComponent implements OnInit {

  constructor() { }


  ngOnInit() {

  }


}
