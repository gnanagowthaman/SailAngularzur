webpackJsonp(["main"],{

/***/ "./assets/app/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./assets/app/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./assets/app/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "#whole{\n    display: inline-block;\n    width: 85%;\n    height: 100%;\n    border: 1px solid black;\n    top: 106px;\n    left: 200px;\n  }   "

/***/ }),

/***/ "./assets/app/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <li *ngFor=\"let food of foods\">{{food.user_name}}</li> -->\n\n<!-- <pre>{{myData | json}}</pre> -->\n\n<!-- <div *ngFor=\"let d of myData\">\n  {{d}}                        \n</div>                \n-->\n<!-- <li *ngFor=\"let item of myData\">\n  {{item.id}}            \n</li>      -->\n<!-- <a routerLink=\"newuser\"><button class=\"btn btn-success pull-right\" > Add User</button></a> -->\n\n<!-- <h1>Zurik</h1>                                                \n  <nav>\n    <a routerLink=\"/crisis-center\" routerLinkActive=\"active\">List Users</a>\n    <a routerLink=\"/heroes\" routerLinkActive=\"active\">Add User</a>  \n  </nav>  -->\n<!-- <app-list></app-list>  \n  <app-newuser></app-newuser>                         -->\n<!-- <router-outlet></router-outlet> -->\n<!-- \n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            \n        </div>\n\n    </div>\n     <div class=\"col-sm-4\" id=\"ttx\">      \n            \n        </div>\n        <div class=\"col-sm-8\" id=\"whole\">\n            <app-main-content></app-main-content>\n            <router-outlet></router-outlet>\n        </div>\n\n</div>    -->\n   \n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">      \n            <app-header></app-header>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-4\">\n            <app-aside></app-aside>\n        </div>            \n        <div class=\"col-sm-8\" id=\"whole\">    \n            <app-main-content></app-main-content>\n            <router-outlet></router-outlet>      \n        </div>\n    </div>  \n</div>\n\n<!--    \n\n<div class=\"container\">\n    <div class=\"row\">   \n        <div class=\"col-sm-12\">\n            \n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-4\">   \n            \n        </div>\n        <div class=\"col-sm-8\" id=\"whole\">       \n               <app-main-content></app-main-content>\n               \n        </div>\n    </div>          \n</div>\n\n\n     <app-header></app-header>\n        <app-aside></app-aside>\n\n        <router-outlet></router-outlet>\n             -->"

/***/ }),

/***/ "./assets/app/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__demo_service__ = __webpack_require__("./assets/app/app/demo.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(_demoService, http) {
        this._demoService = _demoService;
        this.http = http;
        this.title = 'app';
        this.btnClick = function () {
            window.location.href = 'http://localhost:1337/forw';
            // this.router.navigate(['http://localhost:1337/newuser']);
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.getFoods();                  
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/user', { headers: headers }).subscribe(function (data) {
            _this.myData = data;
            console.log(data);
        });
        // this.http.get('http://localhost:1337/user',{withCredentials:true}).subscribe((res: any[]) => {
        //   console.log(res);
        //   this.myData = res;  
        // });  
    };
    AppComponent.prototype.selectAllStudentsChange = function (e) {
        // switch inactive checked value
        //   if (e.target.checked) {   
        //     alert('am checked' + e);
        //     window.location.href = 'http://localhost:1337/forw';
        //   } else {  
        //     alert('am sorry');
        //   }
        // }   
        alert('My id is');
    };
    AppComponent.prototype.editHandler = function (_a) {
        var sender = _a.sender, rowIndex = _a.rowIndex, dataItem = _a.dataItem;
        this.myid = rowIndex;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./assets/app/app/app.component.html"),
            styles: [__webpack_require__("./assets/app/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__demo_service__["a" /* DemoService */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], AppComponent);
    return AppComponent;
}());

//   getFoods() {     
//     this._demoService.getFoods().subscribe(
//       data => { this.foods = data },    
//       err => console.error(err),
//       () => console.log('done loading foods')
//     );
//   }
// }


/***/ }),

/***/ "./assets/app/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__progress_kendo_angular_grid__ = __webpack_require__("./node_modules/@progress/kendo-angular-grid/dist/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("./assets/app/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__demo_service__ = __webpack_require__("./assets/app/app/demo.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__newuser_newuser_component__ = __webpack_require__("./assets/app/app/newuser/newuser.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_not_found_page_not_found_component__ = __webpack_require__("./assets/app/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__list_list_component__ = __webpack_require__("./assets/app/app/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__newuser_request_service__ = __webpack_require__("./assets/app/app/newuser/request.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__geography_create_service__ = __webpack_require__("./assets/app/app/geography/create.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__header_header_component__ = __webpack_require__("./assets/app/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__aside_aside_component__ = __webpack_require__("./assets/app/app/aside/aside.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__main_content_main_content_component__ = __webpack_require__("./assets/app/app/main-content/main-content.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__geography_geography_component__ = __webpack_require__("./assets/app/app/geography/geography.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var appRoutes = [
    { path: 'userList', component: __WEBPACK_IMPORTED_MODULE_11__list_list_component__["a" /* ListComponent */] },
    {
        path: 'newUser',
        component: __WEBPACK_IMPORTED_MODULE_8__newuser_newuser_component__["a" /* NewuserComponent */]
    },
    {
        path: '',
        redirectTo: '/userList',
        pathMatch: 'full'
    },
    {
        path: 'geoList',
        component: __WEBPACK_IMPORTED_MODULE_18__geography_geography_component__["a" /* GeographyComponent */]
    },
    {
        path: 'geoCreate',
        component: __WEBPACK_IMPORTED_MODULE_18__geography_geography_component__["a" /* GeographyComponent */]
    },
    {
        path: 'geoEdit/:id',
        component: __WEBPACK_IMPORTED_MODULE_18__geography_geography_component__["a" /* GeographyComponent */]
    },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_10__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__newuser_newuser_component__["a" /* NewuserComponent */],
                __WEBPACK_IMPORTED_MODULE_10__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_11__list_list_component__["a" /* ListComponent */],
                __WEBPACK_IMPORTED_MODULE_14__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_15__aside_aside_component__["a" /* AsideComponent */],
                __WEBPACK_IMPORTED_MODULE_16__main_content_main_content_component__["a" /* MainContentComponent */],
                __WEBPACK_IMPORTED_MODULE_18__geography_geography_component__["a" /* GeographyComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["h" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* FormsModule */],
                // RouterModule.forRoot(
                //   appRoutes,  
                //  // { enableTracing: true } // <-- debugging purposes only
                // ),
                __WEBPACK_IMPORTED_MODULE_9__angular_router__["b" /* RouterModule */].forRoot(appRoutes, { useHash: true }),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], __WEBPACK_IMPORTED_MODULE_4__progress_kendo_angular_grid__["a" /* GridModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__demo_service__["a" /* DemoService */], __WEBPACK_IMPORTED_MODULE_12__newuser_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_13__geography_create_service__["a" /* CreateService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./assets/app/app/aside/aside.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/aside/aside.component.html":
/***/ (function(module, exports) {

module.exports = "<aside data-mcs-theme=\"minimal-dark\" class=\"main-sidebar mCustomScrollbar\">\n        <ul id=\"usertest\" class=\"list-unstyled navigation mb-0\" style=\"padding-top:30px;\">\n          <li class=\"sidebar-category\"></li>   \n          <li id=\"dashboard_click\" class=\"panel\">   \n            <a id=\"accdboard\" role=\"button\" data-toggle=\"collapse\" data-parent=\".navigation\" href=\"#collapse1\" aria-expanded=\"false\"\n              aria-controls=\"collapse1\" class=\"bubble active collapsed\">\n              <i class=\"ion-ios-home-outline bg-purple\"></i>\n              <span class=\"sidebar-title accdboard\">Dashboard</span>\n              <span class=\"badge bg-danger\">9</span>\n            </a>             \n                         \n            <ul id=\"collapse1\" class=\"list-unstyled collapse\">\n              <!-- <li>\n                <a id=\"usermgnt\">User Management</a>\n              </li> -->   \n              <li>                        \n                <a routerLink=\"/userList\" routerLinkActive=\"active\">User Management</a>\n              </li>\n              <li>                    \n                <a routerLink=\"/newUser\" routerLinkActive=\"active\">New User</a>  \n              </li>\n               <li>                                                                 \n                <a routerLink=\"/geoList\" routerLinkActive=\"active\">Geography Management</a>\n                             \n              </li>                   \n              <li>           \n                <a id=\"countrymgnt\">Country Management</a>\n              </li>\n              <li>\n                <a id=\"statemgnt\">State Management</a>\n              </li>\n              <li>\n                <a id=\"dommgnt\">Domain Management</a>\n              </li>\n              <li>\n                <a id=\"regulatormgnt\">Regulator Management</a>\n              </li>\n              <li>\n                <a id=\"regmgnt\">Regulation Management</a>\n              </li>\n              <li>\n                <a id=\"doctmgnt\">Document Management</a>\n              </li>\n              <li>\n                <a id=\"subdocMgnt\">Sub Document Management</a>\n              </li>\n              <li>\n                <a id=\"docmgnt\">Document Upload Management</a>\n              </li>\n              <li>\n                <a id=\"newsMgnt\">News Management</a>\n              </li>\n              <li>      \n                <a id=\"alertMgnt\">Alert Management</a>\n              </li>\n            </ul>\n          </li>\n        </ul>\n        <li id=\"user_click\" class=\"panel\">\n          <a role=\"button\" id=\"profileMgnt\" data-toggle=\"collapse\" data-parent=\".navigation\" href=\"#collapse12\" aria-expanded=\"false\"\n            aria-controls=\"collapse12\" class=\"bubble collapsed\">\n            <i class=\"ion-ios-person-outline bg-success\"></i>\n            <span class=\"sidebar-title\">Profile</span>\n            <span class=\"badge bg-danger\"></span>\n          </a>\n          <ul id=\"collapse12\" class=\"list-unstyled collapse\"></ul>\n        </li>\n      </aside>"

/***/ }),

/***/ "./assets/app/app/aside/aside.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsideComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AsideComponent = /** @class */ (function () {
    function AsideComponent() {
    }
    AsideComponent.prototype.ngOnInit = function () {
    };
    AsideComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-aside',
            template: __webpack_require__("./assets/app/app/aside/aside.component.html"),
            styles: [__webpack_require__("./assets/app/app/aside/aside.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AsideComponent);
    return AsideComponent;
}());



/***/ }),

/***/ "./assets/app/app/demo.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' })
};
var DemoService = /** @class */ (function () {
    function DemoService(http) {
        this.http = http;
    }
    // Uses http.get() to load data from a single API endpoint
    // getFoods() {
    //     return this.http.get('http://localhost:1337/user');
    // }
    DemoService.prototype.getNavigate = function () {
    };
    DemoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], DemoService);
    return DemoService;
}());



/***/ }),

/***/ "./assets/app/app/geography/create.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};
var CreateService = /** @class */ (function () {
    function CreateService(http) {
        this.http = http;
    }
    CreateService.prototype.saveGeography = function (geocreate) {
        return this.http.post("http://localhost:1337/createGeo", geocreate, httpOptions);
    };
    CreateService.prototype.updateGeography = function (geo) {
        // return this.http.put("http://localhost:1337/findgeo/"+"/"+geo.id,geo,httpOptions);
        return this.http.put("http://localhost:1337/findgeo" + "/" + geo.id, geo, httpOptions);
    };
    CreateService.prototype.getGeographyById = function (geoId) {
        return this.http.get("http://localhost:1337/findgeo" + "/" + geoId);
    };
    CreateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], CreateService);
    return CreateService;
}());



/***/ }),

/***/ "./assets/app/app/geography/geography.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/geography/geography.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"!correct\">\n    <div class=\"widget-heading\">\n        <h3 class=\"widget-title\">Geography Management</h3>\n    </div>\n    <div class=\"form-group\">\n        <div class=\"col-sm-offset-3 col-sm-9\">\n            <button id=\"creategeo\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\" (click)=\"toggle()\">create</button>\n\n        </div>\n\n        <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\n            <thead>\n                <tr>\n                    <th style=\"width:15%\" class=\"text-center\">Name</th>\n                    <th style=\"width:15%\" class=\"text-center\">Description</th>\n                    <th style=\"width:30%\" class=\"text-center\">Operation</th>\n                </tr>\n            </thead>\n            <tbody id=\"doc-list-table\">\n\n                <tr *ngFor=\"let employee of myData; let i = index\">\n                    <td class=\"text-center\">\n                        {{employee.name}}\n                    </td>\n                    <td class=\"text-center\">\n                        {{employee.description}}\n                    </td>\n                    <td class=\"text-center\">\n                        <div id=\"hide\">\n                            <span id=\"tocreategeo\" class=\"published\">  \n                                <a class=\"tooltips\">\n                    <span><button type=\"button\" (click)=\"loadArticleToEdit(employee.id)\">Edit</button></span>\n                                    <img src=\"/images/edit.png\" />\n                                </a>\n                            </span>       \n                            <span class=\"delete-doc\" data-toggle=\"modal\" data-target=\"#<%=id%>\">\n                                <a class=\"tooltips\">\n                    <span><td><button type=\"button\" (click)=\"deleteArticle(employee.id)\">Delete</button></td></span>\n                                    <img src=\"/images/delete.png\" />\n                                </a>\n                            </span>\n                        </div>\n                        <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"<%=id%>\">\n                            <div role=\"document\" class=\"modal-dialog modal-sm\">\n                                <div class=\"modal-content\">\n                                    <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                                        <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\n                                            <span aria-hidden=\"true\">×</span>\n                                        </button>\n                                        <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Geography Delete</h4>\n                                    </div>\n                                    <div class=\"modal-body\">\n                                        <p>Do you want to delete?</p>\n                                    </div>\n                                    <div class=\"modal-footer\">\n                                        <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\n                                        <button type=\"button\" id=\"delGeography\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div id=\"findStatus\"></div>\n        <div class=\"user_load\">\n            <div id=\"loadMore\">\n\n            </div>\n        </div>\n    </div>\n</ng-container>\n<ng-container *ngIf=\"correct\">\n    <div class=\"col-md-7\">\n        <div class=\"widget\">\n            <div class=\"widget-heading\">\n                <h3 class=\"widget-title\">Geography Set Up</h3>\n            </div>\n            <div class=\"widget-body\">\n                <form class=\"form-horizontal\" [formGroup]=\"formdata\" (ngSubmit)=\"onClickSubmit(formdata.value)\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">Name</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"geographyName\" [(ngModel)]=\" geoCreate.name\" #geoname/>\n                            <div id=\"geo_name_error\" class=\"geo_name_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">Description</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"geoDescription\" [(ngModel)]=\" geoCreate.description\" #geodescription/>\n                            <div id=\"geo_description_error\" class=\"geo_description_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <div class=\"col-sm-offset-3 col-sm-9\">\n                            <!-- <input type=\"submit\" class=\"btn btn-outline btn-success\" value=\"Save\"> -->\n<button *ngIf=\"!articleIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">CREATE</button>  \n<button *ngIf=\"articleIdToUpdate\" class=\"btn btn-outline btn-success\">UPDATE</button>                \n                            <button id=\"cancel\" class=\"btn btn-outline btn-black\">Cancel</button>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</ng-container>"

/***/ }),

/***/ "./assets/app/app/geography/geography.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeographyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_service__ = __webpack_require__("./assets/app/app/geography/create.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GeographyComponent = /** @class */ (function () {
    function GeographyComponent(http, createService, renderer, elem, _router) {
        this.http = http;
        this.createService = createService;
        this.renderer = renderer;
        this.elem = elem;
        this._router = _router;
        this.articleIdToUpdate = null;
        this.show = false;
        this.buttonName = 'Show';
        this.correct = false;
        this.geoCreate = {
            name: '',
            description: ''
        };
    }
    GeographyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formdata = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            geographyName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            geoDescription: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]("")
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/geography', { headers: headers }).subscribe(function (data) {
            _this.myData = data;
            console.log(data);
        });
        this.getGeographyAll();
    };
    GeographyComponent.prototype.getGeographyAll = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/geography', { headers: headers }).subscribe(function (data) {
            _this.myData = data;
            console.log(data);
        });
    };
    GeographyComponent.prototype.toggle = function () {
        this.correct = !this.correct;
        this._router.navigate(['/geoCreate']);
    };
    GeographyComponent.prototype.onClickSubmit = function (data) {
    };
    GeographyComponent.prototype.saveEdit = function () {
        var _this = this;
        this.getGeoName = this.geoname.nativeElement.value;
        this.getGeoDescription = this.geodescription.nativeElement.value;
        this.router = __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */];
        var geoCreate = {
            name: this.getGeoName,
            description: this.getGeoDescription
        };
        var geoform = this.formdata.value;
        if (this.articleIdToUpdate === null) {
            this.createService.saveGeography(geoCreate)
                .subscribe(function (mySave) {
                _this.saveGeo = mySave;
                console.log(_this.saveGeo);
                _this.getGeographyAll();
                _this._router.navigate(['/geoList']);
                _this.show = !_this.show;
            });
            console.warn("am in create");
        }
        else {
            geoCreate.id = this.articleIdToUpdate;
            this.createService.updateGeography(geoCreate).subscribe(function (successCode) {
                _this.getGeographyAll();
            });
            console.warn("am in update");
        }
    };
    GeographyComponent.prototype.loadArticleToEdit = function (geoId) {
        var _this = this;
        this.createService.getGeographyById(geoId)
            .subscribe(function (geot) {
            _this.formdata.setValue({ geographyName: geot[0].name, geoDescription: geot[0].description });
        });
        this.correct = !this.correct;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("geoname"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], GeographyComponent.prototype, "geoname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("geodescription"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], GeographyComponent.prototype, "geodescription", void 0);
    GeographyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-geography',
            template: __webpack_require__("./assets/app/app/geography/geography.component.html"),
            styles: [__webpack_require__("./assets/app/app/geography/geography.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__create_service__["a" /* CreateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], GeographyComponent);
    return GeographyComponent;
}());

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


/***/ }),

/***/ "./assets/app/app/header/header.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\n        <a href=\"javascript:;\" role=\"button\" class=\"hamburger-menu pull-left\">\n          <span></span>  \n        </a>            \n        <div>  \n          <div style=\"float:right; overflow: visible\" align=\"top\">\n            <h4 class=\"media-heading fs-16\">user_name</h4>\n            <div class=\"dropdown\">\n              <a id=\"dropdown-status\" href=\"javascript:;\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"true\"\n                class=\"dropdown-toggle\">\n                <span class=\"status bg-success\"></span>\n                <a href=\"/logout\">Logout</a>    host\n              </a>\n            </div>\n          </div>\n          <div class=\"image-container234\" style=\"position:absolute; top:20px;right:180px\">\n            <div id=\"esp-user-profile\" data-percent=\"66\" style=\"height: 56px; width: 56px; line-height: 40px; padding: 8px; cursor: pointer;\"\n              class=\"easy-pie-chart\">\n              <img src=\"{profile_image_link}\" alt=\"\" class=\"avatar img-circle\" width=\"42\" height=\"42\" align=\"top\">\n            </div>\n          </div>\n        </div>\n        <div class=\"zurik-con\" style=\"height: 56px; width: 56px; line-height: 40px; padding: 8px;\">\n          <a style=\"left: 100px; top: 20px;\" href=\"/adminDashboard\" class=\"brand\"></a>\n        </div>\n      </header>"

/***/ }),

/***/ "./assets/app/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-header',
            template: __webpack_require__("./assets/app/app/header/header.component.html"),
            styles: [__webpack_require__("./assets/app/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./assets/app/app/list/list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <button type=\"button\" class=\"btn btn-primary-outline pull-right\" (click)=\"btnClick();\">\n    <i class=\"fa fa-plus\"></i> Add User</button>    -->\n\n<!-- <kendo-grid [data]=\"myData\" [height]=\"410\">\n  <kendo-grid-column field=\"id\" title=\"ID\" width=\"40\">       \n  </kendo-grid-column>\n  <kendo-grid-column field=\"user_name\" title=\"Name\" width=\"250\">\n  </kendo-grid-column>\n  <kendo-grid-column field=\"type\" title=\"Category\">\n  </kendo-grid-column>   \n  <kendo-grid-column field=\"access_reg\" title=\"Access\" width=\"80\">\n  </kendo-grid-column>\n  <kendo-grid-column field=\"access1_reg\" title=\"Access 1\" width=\"80\">\n  </kendo-grid-column>\n  <kendo-grid-column field=\"mobile_no\" title=\"Mobile\" width=\"80\">\n  </kendo-grid-column>\n  <kendo-grid-column field=\"email_id\" title=\"Email\" width=\"80\">\n  </kendo-grid-column> -->\n<!-- <kendo-grid-column field=\"access_geo\" title=\"Geo\" width=\"80\">\n  </kendo-grid-column> -->\n<!-- <kendo-grid-column field=\"renewal_date\" title=\"Date\" width=\"80\">\n  </kendo-grid-column>\n  <kendo-grid-column field=\"Discontinued\" title=\"Edit\" width=\"120\">\n      <ng-template kendoGridCellTemplate let-dataItem>\n          <input type=\"checkbox\" (click)=\"selectAllStudentsChange($event)\"   \n          [checked]=\"dataItem.Discontinued\"/>\n      </ng-template>\n  </kendo-grid-column>          \n  <kendo-grid-column field=\"Discontinued\" title=\"Delete\" width=\"120\">\n    <ng-template kendoGridCellTemplate let-dataItem>\n        <input type=\"checkbox\" [checked]=\"dataItem.Discontinued\"/>   \n    </ng-template>\n</kendo-grid-column>\n</kendo-grid> -->    \n\n<div class=\"widget-heading\">\n    <h3 class=\"widget-title\">User Management</h3>\n</div>\n<div class=\"form-group\">\n    <div class=\"col-sm-offset-3 col-sm-9\">\n        <div class=\"input-group input-group-search\">\n            <input id=\"searchUserTxt\" type=\"text\" placeholder=\"Search for...\" class=\"form-control\">\n            <span class=\"input-group-btn\">\n                <button id=\"searchUser\" type=\"button\" class=\"btn btn-outline\">Go!</button>           \n            </span>\n        </div>\n        <!-- {#createAdmin} -->\n        <button id=\"renderCreateUserFormPage\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\">Create User</button>\n        <button id=\"renderCreateAdminUserFormPage\" class=\"btn btn-success btn-rounded btn-block\" style=\"position: absolute;right: 50px;bottom: 0px;width: 150px;\">Create Admin</button>\n       \n    </div>\n</div>\n<table id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\n    <thead>\n        <tr>\n            <th style=\"width:15%\" class=\"text-center\" style=\"position: relative;right: 14px;width: 1%;\">User</th>\n            <th style=\"width:10%\" class=\"text-center\" style=\"left: 23px;width:10%;position: relative;\">Type</th>\n            <th style=\"width:10%\" class=\"text-center\" style=\"position: relative;left: 63px;width:10%;\">Email Id</th>\n            <th style=\"width:10%\" class=\"text-center\" style=\"position:  relative;left: 161px;width:10%;\">Mobile No</th>\n            <th style=\"width:15%\" class=\"text-center\" style=\"position:  relative;left: 160px;width:15%;\">Renewal Date</th>\n            <th style=\"width:30%\" class=\"text-center\" style=\"position: relative;left: 63px;width:30%;\">Operation</th>\n        </tr>\n        <tr style=\"display:show\" id=\"no-record-found\">\n            <th colspan=\"6\">\n                <span id=\"SearchResult\"></span>\n            </th>\n        </tr>\n    </thead>       \n    <div id=\"user-list-table\"></div>\n</table>        \n<div id=\"findStatus\"></div>\n<div class=\"user_load\">\n    <div id=\"loadMore\"></div>           \n</div>         \n<table class=\"table table-hover\">   \n    <tbody>   \n        <tr *ngFor=\"let employee of myData; let i = index\">\n            <td>\n                <div class=\"media\">\n                    <div class=\"media-body\">\n                        <h5 class=\"media-heading\">{{employee.user_name}}</h5>\n                    </div>\n                </div>            \n            </td>\n            <td class=\"text-center\">{{employee.type}}</td>\n            <td class=\"text-center\">{{employee.email_id}}</td>\n            <td class=\"text-center\">{{employee.mobile_no}}</td>\n            <td id='<%=user_name%><%=type%>' class=\"text-center\">{{employee.renewal_date}}</td>\n            <td class=\"text-center\">\n                <div>\n                    <!-- {#edituser} -->\n                    <span class=\"edit-user\" id=\"editUser\">\n                        <a class=\"tooltips\">\n                            <span>Edit</span>\n                            <img src=\"/images/edit.png\" />\n                        </a>\n                    </span>\n                    <!-- {/edituser} -->\n                    <!-- {#deleteuser}   -->\n                    <span class=\"delete-user\" data-toggle=\"modal\" data-target=\"#<%=id%>\">\n                        <a class=\"tooltips\">\n                            <span>Delete</span>\n                            <img src=\"/images/delete.png\" />\n                        </a>\n                    </span>\n                    <!-- {/deleteuser}   -->\n                </div>\n                <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"<%=id%>\">\n                    <div role=\"document\" class=\"modal-dialog modal-sm\">\n                        <div class=\"modal-content\">\n                            <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                                <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\n                                    <span aria-hidden=\"true\">×</span>\n                                </button>\n                                <h4 id=\"mySmallModalLabel\" class=\"modal-title\">User Delete</h4>\n                            </div>\n                            <div class=\"modal-body\">\n                                <p>Do you want to delete?</p>\n                            </div>\n                            <div class=\"modal-footer\">\n                                <button type=\"button\" data-dismiss=\"modal\" class=\"btn  btn-outline btn-primary-red\">Close</button>\n                                <button type=\"button\" data-dismiss=\"modal\" id=\"delUser\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </td>\n        </tr>\n    </tbody>\n</table>"

/***/ }),

/***/ "./assets/app/app/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListComponent = /** @class */ (function () {
    function ListComponent(http) {
        this.http = http;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/user', { headers: headers }).subscribe(function (data) {
            _this.myData = data;
            console.log(data);
        });
    };
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-list',
            template: __webpack_require__("./assets/app/app/list/list.component.html"),
            styles: [__webpack_require__("./assets/app/app/list/list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ListComponent);
    return ListComponent;
}());



/***/ }),

/***/ "./assets/app/app/main-content/main-content.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/main-content/main-content.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  main-content works!\n</p>\n"

/***/ }),

/***/ "./assets/app/app/main-content/main-content.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainContentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainContentComponent = /** @class */ (function () {
    function MainContentComponent() {
    }
    MainContentComponent.prototype.ngOnInit = function () {
    };
    MainContentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-main-content',
            template: __webpack_require__("./assets/app/app/main-content/main-content.component.html"),
            styles: [__webpack_require__("./assets/app/app/main-content/main-content.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MainContentComponent);
    return MainContentComponent;
}());



/***/ }),

/***/ "./assets/app/app/newuser/newuser.component.css":
/***/ (function(module, exports) {

module.exports = "table {\n    font-family: arial, sans-serif;\n    border-collapse: collapse;\n    width: 100%;\n}\n\ntd, th {\n    border: 1px solid #dddddd;\n    text-align: left;\n    padding: 8px;\n}\n\ntr:nth-child(even) {\n    background-color: #dddddd;\n}"

/***/ }),

/***/ "./assets/app/app/newuser/newuser.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formdata\" (ngSubmit)=\"onClickSubmit(formdata.value)\">\n  <div class=\"form-group\">\n    <label for=\"usr\">Name:</label>  \n    <input type=\"text\" class=\"form-control\" formControlName=\"user_name\" [(ngModel)]=\" client.user_name\" #refusername>\n  </div>\n   \n  <div class=\"form-group\">    \n    <label for=\"pwd\">Email:</label>\n    <input type=\"text\" class=\"form-control\" formControlName=\"email_id\" [(ngModel)]=\" client.email_id\" #refemail>\n  </div>\n\n  <div class=\"form-group\">        \n    <label class=\"center-block\">Mobile No:   \n      <input class=\"form-control\" formControlName=\"mobile_no\" [(ngModel)]=\"client.mobile_no\" #refmob>\n    </label>\n  </div>         \n\n  <div class=\"form-group radio\">\n    <h4>Subscription:</h4>      \n    <label class=\"center-block\">   \n      <input type=\"radio\" formControlName=\"subscription\" value=\"paid\" [(ngModel)]=\"client.subscription\" #refsub>Paid Subscription</label>\n    <label class=\"center-block\">   \n      <input type=\"radio\" formControlName=\"subscription\" value=\"free\" [(ngModel)]=\"client.subscription\" #refsub>Free Trial</label>\n  </div>\n\n   <div class=\"form-group radio\">      \n    <h4>Access:</h4>           \n    <label class=\"center-block\">               \n      <input type=\"radio\" formControlName=\"access\" value=\"full\" [(ngModel)]=\"client.access\" (change)=\"handleChange($event)\" #refacc>Full</label>\n    <label class=\"center-block\">      \n      <input type=\"radio\" formControlName=\"access\" value=\"restricted\" [(ngModel)]=\"client.access\" (change)=\"handleChangeRest($event)\" #refacc>Restricted</label>\n  </div>\n  <div class=\"checkbox\">         \n    <h4>Alert Type:</h4>\n    <label class=\"center-block\">\n      <input type=\"checkbox\" formControlName=\"smsaccess\" [(ngModel)]=\"client.smsaccess\" value=\"sms\" class=\"classImLookingFor\" (change)=\"smsChoose($event)\" #sms>Sms      \n    </label>\n    <label class=\"center-block\">\n      <input type=\"checkbox\" formControlName=\"webaccess\" [(ngModel)]=\"client.webaccess\" value=\"web\" class=\"classImLookingFor\" (change)=\"webChoose($event)\" #web>Web      \n    </label>   \n    <label class=\"center-block\">                       \n      <input type=\"checkbox\" formControlName=\"emailaccess\" [(ngModel)]=\"client.emailaccess\" value=\"email\" class=\"classImLookingFor\" (change)=\"emailChoose($event)\" #email>E-mail       \n    </label>\n  </div>           \n  <div class=\"form-group\">         \n    <label class=\"control-label\" for=\"Geography\">Geography</label>\n    <select *ngIf=\"requests\" [(ngModel)]=\"selecteGeography\"  (change)=\"onSelectGeography($event)\"\n      class=\"form-control input-lg\"  class=\"classImLookingFor\" formControlName=\"geopgrpahy\" class=\"ge\" #Geography >\n      <option value=\"0\">Select Geography</option>   \n      <!-- <option *ngFor=\"let geograph of requests\" value={{geograph.id}}>{{geograph.name}}</option> -->\n       <option *ngFor=\"let geograph of requests\" [value]=\"geograph.id\">{{geograph.name}}</option>\n    </select>\n  </div>    \n  <div class=\"form-group\">      \n    <label class=\"control-label\" for=\"Country\">Country</label>\n    <select *ngIf=\"countryVal\" [(ngModel)]=\"selectedCountry\"  (change)=\"onSelectCountry($event)\"\n      class=\"form-control input-lg\"  class=\"classImLookingFor\" formControlName=\"country\" #Country>\n      <option value=\"0\">Select Country</option>  \n      <option *ngFor=\"let cout of countryVal\" value={{cout.id}}>{{cout.name}}</option>\n    </select>\n  </div>\n  <div class=\"form-group\">       \n    <label class=\"control-label\" for=\"States\">State</label>\n    <select *ngIf=\"stateVal\" [(ngModel)]=\"selectedState\"  (change)=\"onSelectState($event)\"\n      class=\"form-control input-lg\"  class=\"classImLookingFor\" formControlName=\"state\" #States>\n      <option value=\"0\">Select State</option>  \n      <option *ngFor=\"let stat of stateVal\" value={{stat.id}}>{{stat.name}}</option>\n    </select>\n  </div>                                   \n  <div class=\"form-group\">\n    <label class=\"control-label\" for=\"Regulation\">Regulation</label>\n    <select class=\"form-control input-lg\"  class=\"classImLookingFor\" #Regulation>  \n      <option *ngIf=\"!selectedState\" value=\"0\">Select Reg</option>     \n      <option *ngFor=\"let reg of regulationVal\" value={{reg.rlid}}>{{reg.name}}</option>\n    </select>  \n   </div>     \n    \n  <input type=\"button\" value=\"Add\" (click)=\"addFunction()\">\n  <input type=\"submit\" class=\"forsubmit\" value=\"Save\">\n  <input type=\"button\" value=\"cancel\">\n</form>\n\n\n\n<table id=\"myTable\">\n  <thead>\n    <tr>\n      <th>GEOGRAPHY</th>\n      <th>COUNTRY</th>\n      <th>STATE</th>\n      <th>REGULATION</th>\n      <th>SMS</th>\n      <th>WEB</th>\n      <th>EMAIL</th>\n      <th>OPERATION</th>\n    </tr>\n  </thead>\n  <tbody #ir>                       \n   \n<div *ngIf=\"!myFlag;else myFlagTrue;\" >\n</div>\n<ng-template #myFlagTrue>   \n  <tr *ngFor=\"let item of regulation_new; let i = index\">\n  <!-- <td>{{i+1}}</td>                 -->\n  <td>{{item.geography}}</td>                                          \n  <td>{{item.country}}</td>\n  <td>{{item.state}}</td>         \n  <td>{{item.regulation_name}}</td>                                                 \n  <td>{{item.smsaccess}}</td>               \n  <td>{{item.webaccess}}</td>                    \n  <td>{{item.emailaccess}}</td>\n  <td><button class=\"btn btn-default\"  type=\"button\" (click)=\"deleteFieldValue(i)\">Delete</button></td>          \n</tr>   \n</ng-template>  \n  </tbody>        \n</table>        \n"

/***/ }),

/***/ "./assets/app/app/newuser/newuser.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewuserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__request_service__ = __webpack_require__("./assets/app/app/newuser/request.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewuserComponent = /** @class */ (function () {
    function NewuserComponent(fb, http, _http, renderer, elem) {
        this.fb = fb;
        this.http = http;
        this._http = _http;
        this.renderer = renderer;
        this.elem = elem;
        //usr;                    
        //formdata; 
        this.default_state = 18;
        this.default_country = 23;
        this.default_smsaccess = 'none';
        this.default_webaccess = 'none';
        this.default_emailaccess = 'none';
        // client: Client = {
        //   user_name: '',
        //   email_id: '',
        //   mobile_no: 0,
        //   company_name: 'others',
        //   role_id: 3,
        //   subscription: 'paid',
        //   access: '',
        //   cliaccess: '',
        //   resaccess: '',
        //   smsaccess: 'none',
        //   webaccess: 'none',
        //   emailaccess: 'none',
        //   country: 23,
        //   geopgrpahy: '',
        //   state: 18
        // }
        this.client = {
            user_name: '',
            email_id: '',
            mobile_no: 0,
            company_name: '',
            role_id: 3,
            subscription: '',
            access: '',
            smsaccess: 0,
            webaccess: 0,
            emailaccess: 0,
            country: 23,
            geopgrpahy: '',
            state: 18
        };
        this.selecteGeography = 0;
        this.selectedCountry = 0;
        this.selectedState = 0;
        this.title = 'app';
        this.countryVal = [];
        this.stateVal = [];
        this.regulationVal = [];
        this.a = [];
        this.b = [];
        this.regu = [];
        this.regulation_new = [];
        //flag = false;
        this.tmpArray = [];
        this.test = [];
        this.t = [];
        this.obj2 = [];
        this.inc = 0;
        this.myFlag = false;
        this.mySecFlag = false;
        this.sms_Text = "none";
        this.email_Text = "none";
        this.web_Text = "none";
        this.smsVal = 0;
        this.webVal = 0;
        this.emailVal = 0;
        this.match = false;
        var idGet = document.querySelectorAll('#save_button');
    }
    NewuserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this._http.getRequest().subscribe(function (res) { _this.requests = res; console.log(_this.requests); });
        this._http.getRegByGeo().subscribe(function (res) {
            _this.regRequest = res;
            console.log(_this.regRequest);
            _this.userCollectCountry = _this.regRequest.countryCollection;
            _this.userCollectState = _this.regRequest.stateCollection;
            _this.userCollectRegulation = _this.regRequest.regCollection;
            _this.userCollectGeo = _this.regRequest.usergeoCollection;
            console.log(_this.userCollectCountry, _this.userCollectState, _this.userCollectRegulation, _this.userCollectGeo);
            _this.uncheckAll();
        });
        this.formdata = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            // usr: new FormControl("", Validators.compose([
            //   Validators.required
            // ])),
            // pwd: new FormControl('', Validators.required)
            user_name: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            email_id: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            mobile_no: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            subscription: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            access: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            smsaccess: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            webaccess: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            emailaccess: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            geopgrpahy: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](''),
            country: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            state: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            reg: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]("")
        });
        this.formdata.patchValue({
            'country': this.default_country,
            'state': this.default_state,
            'smsaccess': this.default_smsaccess,
            'webaccess': this.default_webaccess,
            'emailaccess': this.default_emailaccess
        });
    };
    NewuserComponent.prototype.ngAfterViewInit = function () {
    };
    NewuserComponent.prototype.UncheckAll = function () {
        var w = document.getElementsByTagName('input');
        for (var i = 0; i < w.length; i++) {
            if (w[i].type == 'checkbox') {
                w[i].checked = false;
                console.log("www");
            }
            if (w[i].type == 'radio') {
                w[i].checked = false;
                console.log("www");
            }
        }
    };
    NewuserComponent.prototype.addFunction = function () {
        this.getUser_name = this.refusername.nativeElement.value;
        this.getEmail = this.refemail.nativeElement.value;
        this.getMobile = this.refmob.nativeElement.value;
        this.getSubsr = this.refsub.nativeElement.value;
        this.getAcce = this.refacc.nativeElement.value;
        var selGeoRef = this.Geography.nativeElement; // like getElementById           
        var optGeo = selGeoRef.options[selGeoRef.selectedIndex];
        this.geo_Value = optGeo.value;
        this.geo_Text = optGeo.text;
        var selCouRef = this.Country.nativeElement;
        var optCou = selCouRef.options[selCouRef.selectedIndex];
        this.cou_Value = optCou.value;
        this.cou_Text = optCou.text;
        var selStaRef = this.States.nativeElement;
        var optSta = selStaRef.options[selStaRef.selectedIndex];
        this.sta_Value = optSta.value;
        this.sta_Text = optSta.text;
        var selRegRef = this.Regulation.nativeElement;
        var optReg = selRegRef.options[selRegRef.selectedIndex];
        this.reg_Value = optReg.value;
        this.reg_Text = optReg.text;
        var valData;
        if (this.geo_Value == "0" || this.cou_Value == "0" || this.sta_Value == "0" || this.reg_Value == "0") {
            alert("please select geography");
        }
        else {
            this.count = this.regu.length;
            console.log(this.count);
            if (this.count === 0) {
                console.log("first if");
                console.log(this.getUser_name);
                console.log("am in", this.count);
                this.myFlag = !this.myFlag;
                if (this.inc >= 2) {
                    this.myFlag = true;
                }
                /*unwanted*/ var d = this.geo_Value + ',' + this.cou_Value + ',' + this.sta_Value + ',' + this.reg_Value + ',' + this.sms_Text + ',' + this.web_Text + ',' + this.email_Text;
                /*unwanted*/ var len = d.length;
                valData = this.geo_Value + ',' + this.cou_Value + ',' + this.sta_Value + ',' + this.reg_Value;
                var valNew = valData.split(',');
                this.obj1 = {
                    regulation_id: this.reg_Value,
                    regulation_name: this.reg_Text,
                    geography_id: this.geo_Value,
                    country_id: this.cou_Value,
                    state_id: this.sta_Value,
                    sms: this.smsVal,
                    web: this.webVal,
                    email: this.webVal
                };
                this.t.push(this.obj1);
                // for (var x in this.t) {
                //   console.log(x)
                // }
                console.log(this.t);
                this.obj = {
                    "user_name": this.getUser_name,
                    "email_id": this.getEmail,
                    "mobile_no": this.getMobile,
                    "company_name": "others",
                    "role_id": 3,
                    "subscription": this.getSubsr,
                    "access": this.getAcce,
                    "smsaccess": this.sms_Text,
                    "webaccess": this.web_Text,
                    "emailaccess": this.email_Text,
                    "country": this.cou_Text,
                    "geography": this.geo_Text,
                    "state": this.sta_Text,
                    "regulation_name": this.reg_Text,
                    regulation: this.t
                };
                this.regulation_new.push(this.obj);
                console.log("am done", this.regulation_new);
                this.regu.push(valNew);
            }
            else if (this.count >= 1 && this.regulation_new.length > 1) {
                console.log("if else");
                this.myFlag = false;
                valData = this.geo_Value + ',' + this.cou_Value + ',' + this.sta_Value + ',' + this.reg_Value;
                var valNew = valData.split(',');
                console.log(valNew, this.regu);
                for (var i = 0; i < this.regu.length; i++) {
                    if (JSON.stringify(valNew) == JSON.stringify(this.regu[i])) {
                        this.match = true;
                        break;
                    }
                }
                console.log(this.match);
                if (this.match == false) {
                    console.log("else if match");
                    this.myFlag = !this.myFlag;
                    this.obj1 = {
                        regulation_id: this.reg_Value,
                        regulation_name: this.reg_Text,
                        geography_id: this.geo_Value,
                        country_id: this.cou_Value,
                        state_id: this.sta_Value,
                        sms: this.smsVal,
                        web: this.webVal,
                        email: this.webVal
                    };
                    this.t.push(this.obj1);
                    console.log(this.t);
                    this.obj = {
                        "user_name": this.getUser_name,
                        "email_id": this.getEmail,
                        "mobile_no": this.getMobile,
                        "company_name": "others",
                        "role_id": 3,
                        "subscription": this.getSubsr,
                        "access": this.getAcce,
                        "smsaccess": this.sms_Text,
                        "webaccess": this.web_Text,
                        "emailaccess": this.email_Text,
                        "country": this.cou_Text,
                        "geography": this.geo_Text,
                        "state": this.sta_Text,
                        "regulation_name": this.reg_Text,
                        regulation: this.t
                    };
                    this.regulation_new.push(this.obj);
                    console.log("am done", this.regulation_new);
                    this.regu.push(valNew);
                }
                else {
                    console.log("if else else");
                    this.myFlag = true;
                    this.inc++;
                    console.log("not not  doma ok", this.inc);
                }
            }
            else {
                console.log("main else");
                this.myFlag = false;
                valData = this.geo_Value + ',' + this.cou_Value + ',' + this.sta_Value + ',' + this.reg_Value;
                var valNew = valData.split(',');
                for (var i = 0; i < this.regu.length; i++) {
                    if (JSON.stringify(valNew) == JSON.stringify(this.regu[i])) {
                        this.match = true;
                        break;
                    }
                    else {
                        this.match = false;
                    }
                }
                // console.log("else block")       
                console.log(this.match, valNew, this.regu);
                if (this.match == false) {
                    console.log("main match if");
                    this.myFlag = !this.myFlag;
                    // this.mySecFlag=!this.mySecFlag;  
                    // this.obj = {
                    //   "geography": this.geo_Text,
                    //   "country": this.cou_Text,
                    //   "state": this.sta_Text,
                    //   "regulation": this.reg_Text,
                    //   "sms": this.sms_Text,
                    //   "web": this.web_Text,
                    //   "email": this.email_Text
                    // }
                    // this.regulation_new.push(this.obj);
                    // console.log(this.regulation_new)
                    this.obj1 = {
                        regulation_id: this.reg_Value,
                        regulation_name: this.reg_Text,
                        geography_id: this.geo_Value,
                        country_id: this.cou_Value,
                        state_id: this.sta_Value,
                        sms: this.smsVal,
                        web: this.webVal,
                        email: this.emailVal
                    };
                    this.t.push(this.obj1);
                    // for (var x in this.t) {
                    //   console.log(x)
                    // }
                    console.log(this.t);
                    this.obj = {
                        "user_name": this.getUser_name,
                        "email_id": this.getEmail,
                        "mobile_no": this.getMobile,
                        "company_name": "others",
                        "role_id": 3,
                        "subscription": this.getSubsr,
                        "access": this.getAcce,
                        "smsaccess": this.sms_Text,
                        "webaccess": this.web_Text,
                        "emailaccess": this.email_Text,
                        "country": this.cou_Text,
                        "geography": this.geo_Text,
                        "state": this.sta_Text,
                        "regulation_name": this.reg_Text,
                        regulation: this.t
                    };
                    this.regulation_new.push(this.obj);
                    console.log("am done", this.regulation_new);
                    this.regu.push(valNew);
                    // this.regu.push(valNew);            
                }
                else {
                    console.log("outer else");
                    this.myFlag = true;
                    this.inc++;
                    console.log("not doma ok", this.inc);
                }
            }
        }
    };
    NewuserComponent.prototype.onClickSubmit = function (data) {
        var _this = this;
        console.log(data);
        // this.spc_reg=JSON.stringify(data);
        // console.log("this is specific reg json",this.spc_reg)
        // useful console.log(data.access, JSON.stringify(data));
        if (data.access == "full") {
            console.log("hello am full access");
            this._http.newClient(data)
                .subscribe(function (hero) { _this.addUse = hero; console.log(_this.addUse); });
        }
        else {
            console.log("hello am restricted access");
            /*make use it*/
            var fClient = {
                user_name: this.getUser_name,
                email_id: this.getEmail,
                mobile_no: this.getMobile,
                company_name: 'others',
                role_id: 3,
                subscription: this.getSubsr,
                access: this.getAcce,
                smsaccess: this.smsVal,
                webaccess: this.webVal,
                emailaccess: this.emailVal,
                country: this.cou_Value,
                geopgrpahy: this.geo_Value,
                state: this.sta_Value,
                regulation: this.t
            };
            this._http.fullClient(fClient).subscribe(function (myFull) { _this.fullUse = myFull; console.log(_this.fullUse); });
        }
        // this._http.newClient(data)                              
        //   .subscribe(hero => { this.addUse = hero; console.log(this.addUse) });
        //useful console.log("account subscription", data);
    };
    NewuserComponent.prototype.uncheckAll = function () {
        var i;
        var list = this.elem.nativeElement.querySelectorAll("input[type=checkbox]");
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            console.log(item);
            item.checked = false;
        }
    };
    NewuserComponent.prototype.onSelectGeography = function (args) {
        var geography_id = args.target.value;
        this.geo_txt = args.target.options[args.target.selectedIndex].text;
        this.selecteGeography = geography_id;
        this.selectedCountry = 0;
        this.stateVal = [];
        this.regulationVal = [];
        this.countryVal = this.userCollectCountry.filter(function (item) {
            console.log("country id", item.gid, "geography id", geography_id);
            return item.gid === Number(geography_id);
        });
        console.log(this.geo_txt);
    };
    NewuserComponent.prototype.onSelectCountry = function (args) {
        var country_id = args.target.value;
        this.cou_Text = args.target.options[args.target.selectedIndex].text;
        this.selectedCountry = country_id;
        this.selectedState = 0;
        this.regulationVal = [];
        this.stateVal = this.userCollectState.filter(function (item) {
            console.log("state id", item.gid, "country id", country_id);
            return item.scid === Number(country_id);
        });
    };
    NewuserComponent.prototype.onSelectState = function (args) {
        var stat_id = args.target.value;
        console.log("new state", stat_id);
        this.sta_Text = args.target.options[args.target.selectedIndex].text;
        this.selectedState = stat_id;
        var finish = document.querySelector('#ret');
        this.regulationVal = this.userCollectRegulation.filter(function (item) {
            console.log("geography id", item.state_id, "state id", stat_id);
            return item.state_id == Number(stat_id);
        });
        // this.spc_reg=              
    };
    NewuserComponent.prototype.handleChange = function (evt) {
        var i;
        var elements = this.elem.nativeElement.querySelectorAll(".classImLookingFor");
        var addElement = this.elem.nativeElement.querySelectorAll(".classImAdd");
        var target = evt.target;
        if (target.checked) {
            for (i = 0; i < elements.length; i++) {
                elements[i].disabled = true;
            }
            for (i = 0; i < addElement.length; i++) {
                addElement[i].style.visibility = "hidden";
            }
        }
        else {
            alert("fails");
        }
    };
    NewuserComponent.prototype.handleChangeRest = function (evt) {
        var i;
        var elements = this.elem.nativeElement.querySelectorAll(".classImLookingFor");
        var addElement = this.elem.nativeElement.querySelectorAll(".classImAdd");
        var target = evt.target;
        if (target.checked) {
            for (i = 0; i < elements.length; i++) {
                elements[i].disabled = false;
            }
            for (i = 0; i < addElement.length; i++) {
                addElement[i].style.visibility = "visible";
            }
        }
        else {
            alert("fails");
        }
    };
    NewuserComponent.prototype.smsChoose = function (event) {
        var sms_Chk = this.sms.nativeElement.value;
        if (event.target.checked == true && sms_Chk === "sms") {
            this.sms_Text = "sms";
            this.smsVal = (this.sms_Text === "sms") ? 1 : 0;
        }
        else {
            this.sms_Text = "none";
            console.log(this.sms_Text);
            this.smsVal = (this.sms_Text === "none") ? 0 : 1;
            console.log(this.smsVal);
        }
    };
    NewuserComponent.prototype.webChoose = function (event) {
        var web_Chk = this.web.nativeElement.value;
        if (event.target.checked == true && web_Chk === "web") {
            this.web_Text = "web";
            this.webVal = (this.web_Text === "web") ? 1 : 0;
        }
        else {
            this.web_Text = "none";
            this.webVal = (this.web_Text === "none") ? 0 : 1;
        }
    };
    NewuserComponent.prototype.emailChoose = function (event) {
        var email_Chk = this.email.nativeElement.value;
        if (event.target.checked == true && email_Chk === "email") {
            this.email_Text = "email";
            this.emailVal = (this.email_Text === "email") ? 1 : 0;
        }
        else {
            this.email_Text = "none";
            this.emailVal = (this.email_Text === "none") ? 0 : 1;
        }
    };
    NewuserComponent.prototype.deleteFieldValue = function (index) {
        this.regulation_new.splice(index, 1);
        this.regu.splice(index, 1);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("refusername"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "refusername", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("refemail"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "refemail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("refmob"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "refmob", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("refsub"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "refsub", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("refacc"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "refacc", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("Geography"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "Geography", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("Country"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "Country", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("States"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "States", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("Regulation"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "Regulation", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("sms"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "sms", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("web"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "web", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("email"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "email", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('ir'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], NewuserComponent.prototype, "ir", void 0);
    NewuserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-newuser',
            template: __webpack_require__("./assets/app/app/newuser/newuser.component.html"),
            styles: [__webpack_require__("./assets/app/app/newuser/newuser.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
    ], NewuserComponent);
    return NewuserComponent;
}());



/***/ }),

/***/ "./assets/app/app/newuser/request.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var httpOptions = {
    headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};
var RequestService = /** @class */ (function () {
    //clients: any[] = [];
    //client: Observable<any>;                     
    function RequestService(http, _http) {
        this.http = http;
        this._http = _http;
    }
    RequestService.prototype.getRequest = function () {
        return this.http.get("http://localhost:1337/geographys").map(function (res) { return res; });
    };
    RequestService.prototype.getRegByGeo = function () {
        return this.http.get("http://localhost:1337/getRegbygeostate").map(function (res) { return res; });
    };
    RequestService.prototype.newClient = function (client) {
        // Pushing Client object to clients which is a FirebaseListObservable
        //this.clients.push(client);    
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });    
        // return this.http.post("http://localhost:1337/getRegbygeostate", client, options).toPromise()
        //        .then(this.extractData)   
        //        .catch(this.handleErrorPromise);       
        console.log("new client in");
        client.role_id = 3;
        client.country = 23;
        client.geopgrpahy = '';
        client.state = 18;
        console.log(client);
        return this.http.post("http://localhost:1337/createUser", client, httpOptions);
    };
    RequestService.prototype.fullClient = function (client) {
        return this.http.post("http://localhost:1337/createUser", client, httpOptions);
    };
    RequestService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], RequestService);
    return RequestService;
}());



/***/ }),

/***/ "./assets/app/app/page-not-found/page-not-found.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  page-not-found works!\n</p>\n"

/***/ }),

/***/ "./assets/app/app/page-not-found/page-not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-page-not-found',
            template: __webpack_require__("./assets/app/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__("./assets/app/app/page-not-found/page-not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "./assets/app/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./assets/app/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./assets/app/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./assets/app/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./assets/app/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map