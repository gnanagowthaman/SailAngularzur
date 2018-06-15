import { Component, OnInit } from '@angular/core';
import { DemoService } from './demo.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public foods;
  myData: any;
  myid: number;

  constructor(private _demoService: DemoService, private http: HttpClient) {

  }

  ngOnInit() {
    //this.getFoods();                  
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.get('http://localhost:1337/user', { headers: headers }).subscribe(
      data => {
        this.myData = data
        console.log(data);  
      });
    // this.http.get('http://localhost:1337/user',{withCredentials:true}).subscribe((res: any[]) => {
    //   console.log(res);
    //   this.myData = res;  
    // });  
  }
  selectAllStudentsChange(e): void {  
    // switch inactive checked value
    //   if (e.target.checked) {   
    //     alert('am checked' + e);
    //     window.location.href = 'http://localhost:1337/forw';
    //   } else {  
    //     alert('am sorry');
    //   }
    // }   
    alert('My id is' );
  }
  public editHandler({ sender, rowIndex, dataItem }) {
    this.myid = rowIndex;
  }
  btnClick= function () {           
    window.location.href = 'http://localhost:1337/forw';
   // this.router.navigate(['http://localhost:1337/newuser']);
};

}

//   getFoods() {     
//     this._demoService.getFoods().subscribe(
//       data => { this.foods = data },    
//       err => console.error(err),
//       () => console.log('done loading foods')
//     );
//   }
// }
