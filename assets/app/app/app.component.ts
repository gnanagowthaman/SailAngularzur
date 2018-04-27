import { Component, OnInit } from '@angular/core';
import { DemoService } from './demo.service';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public foods;                              
  myData: any;
  goodResponse = [];
  constructor(private _demoService: DemoService, private http: HttpClient) {

  }

  ngOnInit() {
    //this.getFoods();

    this.http.get('http://localhost:1337/user').subscribe(
      data => {
        this.myData = data;
        console.log(data);
      },
      error => {
        alert("ERROR");  
      }  
    );
    let evilResponseProps = Object.keys(this.myData);
    for (let prop of evilResponseProps) {
      this.myData.push(evilResponseProps[prop]);
    }
  }
}

//   getFoods() {     
//     this._demoService.getFoods().subscribe(
//       data => { this.foods = data },    
//       err => console.error(err),
//       () => console.log('done loading foods')
//     );
//   }
// }
