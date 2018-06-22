import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';    
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DemoService } from './demo.service';
import { NewuserComponent } from './newuser/newuser.component';
import { RouterModule, Routes } from '@angular/router';   
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListComponent } from './list/list.component';
import { RequestService } from './newuser/request.service';       
import { CountryService } from './country/country.service';
import { CreateService } from './geography/create.service';
import { StateService } from './state/state.service';
import { DocumentService } from './document/document.service';        
import { SubdocumentmanagementService } from './subdocumentmanagement/subdocumentmanagement.service';
import {RegulatorService} from './regulator/regulator.service'
import { DocumentuploadService } from './documentupload/documentupload.service';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HttpModule } from '@angular/http';
import { GeographyComponent } from './geography/geography.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { DocumentComponent } from './document/document.component';
import { SubdocumentmanagementComponent } from './subdocumentmanagement/subdocumentmanagement.component';
import { RegulatorComponent } from './regulator/regulator.component';
import { DocumentuploadComponent } from './documentupload/documentupload.component';
const appRoutes: Routes = [
  { path: 'userList', component: ListComponent },
  {
    path: 'newUser',
    component: NewuserComponent
  },
  {
    path: '',
    redirectTo: '/userList',
    pathMatch: 'full'
  },
  {
    path: 'geoList',
    component: GeographyComponent
  },
  {
    path: 'geoCreate',
    component: GeographyComponent
  },
  {
    path: 'geoBack',
    component: GeographyComponent
  },
  {
    path: 'geoEdit/:id',
    component: GeographyComponent
  },
  {
    path: 'couList',
    component: CountryComponent
  },
  {
    path: 'couCreate',
    component: CountryComponent
  },
  {
    path: 'stateList',
    component: StateComponent
  },
  {
    path: 'stateCreate',
    component: StateComponent
  },
  {
    path: 'docList',
    component: DocumentComponent
  },
  {
    path: 'docCreate',
    component: DocumentComponent
  },
  {
    path: 'subDocList',
    component: SubdocumentmanagementComponent
  },
  {
    path: 'subDocCreate',
    component: SubdocumentmanagementComponent
  },
  {
    path: 'regList',        
    component: RegulatorComponent                   
  },        
  {
    path: 'regCreate',
    component: RegulatorComponent
  },
  {
   path:'docUplMgtList',
   component:DocumentuploadComponent                  
  },
  {
    path:'uploadCreate',
    component:DocumentuploadComponent 
  },                       
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    NewuserComponent,
    PageNotFoundComponent,
    ListComponent,
    HeaderComponent,
    AsideComponent,
    MainContentComponent,
    GeographyComponent,
    CountryComponent,
    StateComponent,
    DocumentComponent,
    SubdocumentmanagementComponent,  
    RegulatorComponent,
    DocumentuploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    // RouterModule.forRoot(
    //   appRoutes,  
    //  // { enableTracing: true } // <-- debugging purposes only
    // ),
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserModule, BrowserAnimationsModule
  ],                    
  providers: [DemoService, RequestService, CreateService, CountryService, StateService, DocumentService, SubdocumentmanagementService,RegulatorService,DocumentuploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
