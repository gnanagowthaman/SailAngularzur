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
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { MainContentComponent } from './main-content/main-content.component';  
import { HttpModule } from '@angular/http';     
const appRoutes: Routes = [
  { path: 'crisis-center', component: ListComponent },  
  {
    path: 'heroes',
    component: NewuserComponent
  },
  {
    path: '',
    redirectTo: '/crisis-center',
    pathMatch: 'full'
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
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserModule, BrowserAnimationsModule, GridModule
  ],
  providers: [DemoService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
