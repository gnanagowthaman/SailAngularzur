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
import { CreateService } from './geography-create/create.service';      
import { GeographyCreateService } from './geography-edit/geography-create.service';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HttpModule } from '@angular/http';
import { GeographyComponent } from './geography/geography.component';
import { GeographyEditComponent } from './geography-edit/geography-edit.component';
import { GeographyCreateComponent } from './geography-create/geography-create.component';
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
    component: GeographyComponent,
    children: [
      { path: '', component: GeographyComponent, pathMatch: 'full' },
      { path: 'createGeography', component: GeographyCreateComponent },
      { path: 'editGeography/:id', component: GeographyEditComponent }                    
    ]
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
    GeographyEditComponent,
    GeographyCreateComponent,
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
  providers: [DemoService, RequestService, GeographyCreateService, CreateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
