import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
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
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HttpModule } from '@angular/http';
import { GeographyComponent } from './geography/geography.component';
import { CountryComponent } from './country/country.component';
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
    CountryComponent
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
    BrowserModule, BrowserAnimationsModule, GridModule
  ],
  providers: [DemoService, RequestService, CreateService, CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
