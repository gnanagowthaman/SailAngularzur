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

module.exports = "#whole{\r\n    display: inline-block;\r\n    width: 85%;\r\n    height: 100%;\r\n    border: 1px solid black;\r\n    top: 106px;\r\n    left: 200px;\r\n  }   "

/***/ }),

/***/ "./assets/app/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <li *ngFor=\"let food of foods\">{{food.user_name}}</li> -->\r\n\r\n<!-- <pre>{{myData | json}}</pre> -->\r\n\r\n<!-- <div *ngFor=\"let d of myData\">\r\n  {{d}}                        \r\n</div>                \r\n-->\r\n<!-- <li *ngFor=\"let item of myData\">\r\n  {{item.id}}            \r\n</li>      -->\r\n<!-- <a routerLink=\"newuser\"><button class=\"btn btn-success pull-right\" > Add User</button></a> -->\r\n\r\n<!-- <h1>Zurik</h1>                                                \r\n  <nav>\r\n    <a routerLink=\"/crisis-center\" routerLinkActive=\"active\">List Users</a>\r\n    <a routerLink=\"/heroes\" routerLinkActive=\"active\">Add User</a>  \r\n  </nav>  -->\r\n<!-- <app-list></app-list>  \r\n  <app-newuser></app-newuser>                         -->\r\n<!-- <router-outlet></router-outlet> -->\r\n<!-- \r\n<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-12\">\r\n            \r\n        </div>\r\n\r\n    </div>\r\n     <div class=\"col-sm-4\" id=\"ttx\">      \r\n            \r\n        </div>\r\n        <div class=\"col-sm-8\" id=\"whole\">\r\n            <app-main-content></app-main-content>\r\n            <router-outlet></router-outlet>\r\n        </div>\r\n\r\n</div>    -->\r\n   \r\n<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-12\">      \r\n            <app-header></app-header>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-4\">\r\n            <app-aside></app-aside>\r\n        </div>            \r\n        <div class=\"col-sm-8\" id=\"whole\">    \r\n            <app-main-content></app-main-content>\r\n            <router-outlet></router-outlet>      \r\n        </div>\r\n    </div>  \r\n</div>\r\n\r\n<!--    \r\n\r\n<div class=\"container\">\r\n    <div class=\"row\">   \r\n        <div class=\"col-sm-12\">\r\n            \r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-4\">   \r\n            \r\n        </div>\r\n        <div class=\"col-sm-8\" id=\"whole\">       \r\n               <app-main-content></app-main-content>\r\n               \r\n        </div>\r\n    </div>          \r\n</div>\r\n\r\n\r\n     <app-header></app-header>\r\n        <app-aside></app-aside>\r\n\r\n        <router-outlet></router-outlet>\r\n             -->"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__country_country_service__ = __webpack_require__("./assets/app/app/country/country.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__geography_create_service__ = __webpack_require__("./assets/app/app/geography/create.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__state_state_service__ = __webpack_require__("./assets/app/app/state/state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__document_document_service__ = __webpack_require__("./assets/app/app/document/document.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__subdocumentmanagement_subdocumentmanagement_service__ = __webpack_require__("./assets/app/app/subdocumentmanagement/subdocumentmanagement.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__regulator_regulator_service__ = __webpack_require__("./assets/app/app/regulator/regulator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__documentupload_documentupload_service__ = __webpack_require__("./assets/app/app/documentupload/documentupload.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__header_header_component__ = __webpack_require__("./assets/app/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__aside_aside_component__ = __webpack_require__("./assets/app/app/aside/aside.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__main_content_main_content_component__ = __webpack_require__("./assets/app/app/main-content/main-content.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__geography_geography_component__ = __webpack_require__("./assets/app/app/geography/geography.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__country_country_component__ = __webpack_require__("./assets/app/app/country/country.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__state_state_component__ = __webpack_require__("./assets/app/app/state/state.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__document_document_component__ = __webpack_require__("./assets/app/app/document/document.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__subdocumentmanagement_subdocumentmanagement_component__ = __webpack_require__("./assets/app/app/subdocumentmanagement/subdocumentmanagement.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__regulator_regulator_component__ = __webpack_require__("./assets/app/app/regulator/regulator.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__documentupload_documentupload_component__ = __webpack_require__("./assets/app/app/documentupload/documentupload.component.ts");
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
        component: __WEBPACK_IMPORTED_MODULE_24__geography_geography_component__["a" /* GeographyComponent */]
    },
    {
        path: 'geoCreate',
        component: __WEBPACK_IMPORTED_MODULE_24__geography_geography_component__["a" /* GeographyComponent */]
    },
    {
        path: 'geoBack',
        component: __WEBPACK_IMPORTED_MODULE_24__geography_geography_component__["a" /* GeographyComponent */]
    },
    {
        path: 'geoEdit/:id',
        component: __WEBPACK_IMPORTED_MODULE_24__geography_geography_component__["a" /* GeographyComponent */]
    },
    {
        path: 'couList',
        component: __WEBPACK_IMPORTED_MODULE_25__country_country_component__["a" /* CountryComponent */]
    },
    {
        path: 'couCreate',
        component: __WEBPACK_IMPORTED_MODULE_25__country_country_component__["a" /* CountryComponent */]
    },
    {
        path: 'stateList',
        component: __WEBPACK_IMPORTED_MODULE_26__state_state_component__["a" /* StateComponent */]
    },
    {
        path: 'stateCreate',
        component: __WEBPACK_IMPORTED_MODULE_26__state_state_component__["a" /* StateComponent */]
    },
    {
        path: 'docList',
        component: __WEBPACK_IMPORTED_MODULE_27__document_document_component__["a" /* DocumentComponent */]
    },
    {
        path: 'docCreate',
        component: __WEBPACK_IMPORTED_MODULE_27__document_document_component__["a" /* DocumentComponent */]
    },
    {
        path: 'subDocList',
        component: __WEBPACK_IMPORTED_MODULE_28__subdocumentmanagement_subdocumentmanagement_component__["a" /* SubdocumentmanagementComponent */]
    },
    {
        path: 'subDocCreate',
        component: __WEBPACK_IMPORTED_MODULE_28__subdocumentmanagement_subdocumentmanagement_component__["a" /* SubdocumentmanagementComponent */]
    },
    {
        path: 'regList',
        component: __WEBPACK_IMPORTED_MODULE_29__regulator_regulator_component__["a" /* RegulatorComponent */]
    },
    {
        path: 'regCreate',
        component: __WEBPACK_IMPORTED_MODULE_29__regulator_regulator_component__["a" /* RegulatorComponent */]
    },
    {
        path: 'docUplMgtList',
        component: __WEBPACK_IMPORTED_MODULE_30__documentupload_documentupload_component__["a" /* DocumentuploadComponent */]
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
                __WEBPACK_IMPORTED_MODULE_20__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_21__aside_aside_component__["a" /* AsideComponent */],
                __WEBPACK_IMPORTED_MODULE_22__main_content_main_content_component__["a" /* MainContentComponent */],
                __WEBPACK_IMPORTED_MODULE_24__geography_geography_component__["a" /* GeographyComponent */],
                __WEBPACK_IMPORTED_MODULE_25__country_country_component__["a" /* CountryComponent */],
                __WEBPACK_IMPORTED_MODULE_26__state_state_component__["a" /* StateComponent */],
                __WEBPACK_IMPORTED_MODULE_27__document_document_component__["a" /* DocumentComponent */],
                __WEBPACK_IMPORTED_MODULE_28__subdocumentmanagement_subdocumentmanagement_component__["a" /* SubdocumentmanagementComponent */],
                __WEBPACK_IMPORTED_MODULE_29__regulator_regulator_component__["a" /* RegulatorComponent */],
                __WEBPACK_IMPORTED_MODULE_30__documentupload_documentupload_component__["a" /* DocumentuploadComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_23__angular_http__["b" /* HttpModule */],
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
            providers: [__WEBPACK_IMPORTED_MODULE_7__demo_service__["a" /* DemoService */], __WEBPACK_IMPORTED_MODULE_12__newuser_request_service__["a" /* RequestService */], __WEBPACK_IMPORTED_MODULE_14__geography_create_service__["a" /* CreateService */], __WEBPACK_IMPORTED_MODULE_13__country_country_service__["a" /* CountryService */], __WEBPACK_IMPORTED_MODULE_15__state_state_service__["a" /* StateService */], __WEBPACK_IMPORTED_MODULE_16__document_document_service__["a" /* DocumentService */], __WEBPACK_IMPORTED_MODULE_17__subdocumentmanagement_subdocumentmanagement_service__["a" /* SubdocumentmanagementService */], __WEBPACK_IMPORTED_MODULE_18__regulator_regulator_service__["a" /* RegulatorService */], __WEBPACK_IMPORTED_MODULE_19__documentupload_documentupload_service__["a" /* DocumentuploadService */]],
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

module.exports = "<aside data-mcs-theme=\"minimal-dark\" class=\"main-sidebar mCustomScrollbar\">\r\n    <ul id=\"usertest\" class=\"list-unstyled navigation mb-0\" style=\"padding-top:30px;\">\r\n        <li class=\"sidebar-category\"></li>\r\n        <li id=\"dashboard_click\" class=\"panel\">\r\n            <a id=\"accdboard\" role=\"button\" data-toggle=\"collapse\" data-parent=\".navigation\" href=\"#collapse1\" aria-expanded=\"false\" aria-controls=\"collapse1\" class=\"bubble active collapsed\">\r\n                <i class=\"ion-ios-home-outline bg-purple\"></i>\r\n                <span class=\"sidebar-title accdboard\">Dashboard</span>\r\n                <span class=\"badge bg-danger\">9</span>\r\n            </a>\r\n\r\n            <ul id=\"collapse1\" class=\"list-unstyled collapse\">\r\n                <!-- <li>\r\n                <a id=\"usermgnt\">User Management</a>\r\n              </li> -->\r\n                <li>\r\n                    <a routerLink=\"/userList\" routerLinkActive=\"active\">User Management</a>\r\n                </li>\r\n                <li>\r\n                    <a routerLink=\"/newUser\" routerLinkActive=\"active\">New User</a>\r\n                </li>\r\n                <li>\r\n                    <a routerLink=\"/geoList\" routerLinkActive=\"active\">Geography Management</a>\r\n\r\n                </li>\r\n                <li>\r\n                    <a routerLink=\"/couList\" routerLinkActive=\"active\">Country Management</a>\r\n                </li>\r\n                <li>\r\n                    <a routerLink=\"/stateList\" routerLinkActive=\"active\">State Management</a>\r\n                </li>\r\n                <li>\r\n                    <a id=\"dommgnt\">Domain Management</a>\r\n                </li>\r\n                <li>\r\n                    <a routerLink=\"/regList\" routerLinkActive=\"active\">Regulator Management</a>\r\n                </li>\r\n                <li>\r\n                    <a id=\"regmgnt\">Regulation Management</a>\r\n                </li>\r\n                <li>\r\n                    <a routerLink=\"/docList\" routerLinkActive=\"active\">Document Management</a>\r\n                </li>\r\n                <li>\r\n                    <a routerLink=\"/subDocList\" routerLinkActive=\"active\">Sub Document Management</a>\r\n                </li>\r\n                <li>\r\n                    <a routerLink=\"/docUplMgtList\" routerLinkActive=\"active\">Document Upload Management</a>\r\n                </li>\r\n                <li>\r\n                    <a id=\"newsMgnt\">News Management</a>\r\n                </li>\r\n                <li>\r\n                    <a id=\"alertMgnt\">Alert Management</a>\r\n                </li>\r\n            </ul>\r\n        </li>\r\n    </ul>\r\n    <li id=\"user_click\" class=\"panel\">\r\n        <a role=\"button\" id=\"profileMgnt\" data-toggle=\"collapse\" data-parent=\".navigation\" href=\"#collapse12\" aria-expanded=\"false\" aria-controls=\"collapse12\" class=\"bubble collapsed\">\r\n            <i class=\"ion-ios-person-outline bg-success\"></i>\r\n            <span class=\"sidebar-title\">Profile</span>\r\n            <span class=\"badge bg-danger\"></span>\r\n        </a>\r\n        <ul id=\"collapse12\" class=\"list-unstyled collapse\"></ul>\r\n    </li>\r\n</aside>"

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

/***/ "./assets/app/app/country/country.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/country/country.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"!correct\">\r\n    <div class=\"widget-heading\">\r\n        <h3 class=\"widget-title\">Country Management</h3>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <div class=\"col-sm-offset-3 col-sm-9\">\r\n            <button id=\"createcountry\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\" (click)=\"toggle()\">create</button>\r\n\r\n        </div>\r\n    </div>\r\n    <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\r\n        <thead>\r\n            <tr>\r\n                <th style=\"width:15%\" class=\"text-center\">Name</th>\r\n                <th style=\"width:15%\" class=\"text-center\">Description</th>\r\n                <th style=\"width:15%\" class=\"text-center\">Country Code</th>\r\n                <th style=\"width:15%\" class=\"text-center\">Geography</th>\r\n                <th style=\"width:30%\" class=\"text-center\">Operation</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody id=\"country-list-table\">\r\n            <tr *ngFor=\"let country of myData; let i = index\">\r\n                <!--  ngfor comes here for list operation -->\r\n                <td class=\"text-center\">\r\n                    {{country.name}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    {{country.description}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    {{country.country_code}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    {{country.geoname}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    <div id=\"hide\">\r\n                        <span id=\"tocreatecountry\" class=\"published\">\r\n                            <a class=\"tooltips\">\r\n                                <span>\r\n                                    <button type=\"button\" (click)=\"loadArticleToEdit(country.id)\">Edit</button>\r\n                                </span>\r\n                                <img src=\"/images/edit.png\" />\r\n                            </a>\r\n                        </span>\r\n                        <span class=\"delete-country\" data-toggle=\"modal\" data-target=\"\">\r\n                            <a class=\"tooltips\">\r\n                                <span>\r\n                                    <td>\r\n                                        <button type=\"button\" (click)=\"deleteArticle(country.id)\">Delete</button>\r\n                                    </td>\r\n                                </span>\r\n                                <img src=\"/images/delete.png\" />\r\n                            </a>\r\n                        </span>\r\n                    </div>\r\n                    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"\">\r\n                        <div role=\"document\" class=\"modal-dialog modal-sm\">\r\n                            <div class=\"modal-content\">\r\n                                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\r\n                                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\r\n                                        <span aria-hidden=\"true\">×</span>\r\n                                    </button>\r\n                                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Country Delete</h4>\r\n                                </div>\r\n                                <div class=\"modal-body\">\r\n                                    <p>Do you want to delete?</p>\r\n                                </div>\r\n                                <div class=\"modal-footer\">\r\n                                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\r\n                                    <button type=\"button\" id=\"deleteCountry\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n    <div id=\"findStatus\"></div>\r\n    <div class=\"user_load\">\r\n        <div id=\"loadMore\"></div>\r\n    </div>\r\n</ng-container>\r\n<ng-container *ngIf=\"correct\">\r\n    <div class=\"col-md-7\">\r\n        <div class=\"widget\">\r\n            <div class=\"widget-heading\">   \r\n                <h3 class=\"widget-title\">Country Set Up</h3>\r\n            </div>\r\n            <div class=\"widget-body\">\r\n                <form class=\"form-horizontal\" [formGroup]=\"formdata\" (ngSubmit)=\"onClickSubmit(formdata.value)\">\r\n                    <div class=\"form-group\">\r\n                        <label class=\"col-sm-3 control-label\">Name</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"countryName\" [(ngModel)]=\" couInter.name\" #countryname/>\r\n                            <div id=\"country_name_error\" class=\"country_name_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label class=\"col-sm-3 control-label\">Description</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"countryDescription\" [(ngModel)]=\" couInter.description\" #countrydescription/>\r\n                            <div id=\"country_description_error\" class=\"country_description_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label class=\"col-sm-3 control-label\">Country Code</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <input type=\"text\" class=\"form-control\" maxlength=\"3\" formControlName=\"countryCode\" [(ngModel)]=\" couInter.country_code\"\r\n                                #countrycode/>\r\n                            <div id=\"country_code_error\" class=\"country_code_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                            <label for=\"selectGeography\" class=\"col-sm-3 control-label\">Geography</label>\r\n                            <div class=\"col-sm-9\">           \r\n                                <select class=\"form-control\" required formControlName=\"countryGeography\" [(ngModel)]=\"optionSelected\" (change)='onOptionsSelected($event)'\r\n                                    #selectGeography>       \r\n                                    <!-- <option value=\"0\"></option> -->\r\n                                    <option *ngFor='let option of geoData' [value]=\"option.id\">{{option.name}}</option> \r\n                                      \r\n                                </select>\r\n                                <div id=\"geo_error\" class=\"geo_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                            </div>\r\n                        </div>    \r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-offset-3 col-sm-9\">      \r\n                            <button *ngIf=\"!countryIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">CREATE</button>\r\n                            <button *ngIf=\"countryIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">UPDATE</button>\r\n                            <button id=\"cancel\" class=\"btn btn-outline btn-black\">Cancel</button>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</ng-container>"

/***/ }),

/***/ "./assets/app/app/country/country.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__country_service__ = __webpack_require__("./assets/app/app/country/country.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CountryComponent = /** @class */ (function () {
    function CountryComponent(http, countryService, renderer, elem, _router) {
        this.http = http;
        this.countryService = countryService;
        this.renderer = renderer;
        this.elem = elem;
        this._router = _router;
        this.countryIdToUpdate = null;
        this.show = false;
        this.correct = false;
        this.optionSelected = 0;
        this.couInter = {
            name: '',
            description: '',
            geography_id: 0,
            country_code: ''
        };
    }
    CountryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formdata = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            countryName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            countryDescription: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            countryCode: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            countryGeography: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
        });
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/country', { headers: headers }).subscribe(function (data) {
            _this.myData = data;
            console.log(data);
        });
        this.geographyLoad = this.http.get('http://localhost:1337/geographys', { headers: headers }).subscribe(function (data) {
            _this.geoData = data;
            console.log(_this.geoData, "dfdsfdsfsdf");
        });
        this.getCountryAll();
    };
    CountryComponent.prototype.getCountryAll = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/country', { headers: headers }).subscribe(function (data) {
            _this.myData = data;
            console.log(data);
        });
    };
    CountryComponent.prototype.toggle = function () {
        this.correct = !this.correct;
        this._router.navigate(['/couCreate']);
    };
    CountryComponent.prototype.ngAfterViewInit = function () {
    };
    CountryComponent.prototype.onClickSubmit = function (data) {
        console.log(this.geo_Value, this.geo_Text);
    };
    CountryComponent.prototype.saveEdit = function () {
        var _this = this;
        this.couName = this.countryname.nativeElement.value;
        this.couDescription = this.countrydescription.nativeElement.value;
        this.couCode = this.countrycode.nativeElement.value;
        var geoLoadRef = this.selectGeography.nativeElement;
        var optGeo = geoLoadRef.options[geoLoadRef.selectedIndex];
        this.geo_Value = optGeo.value;
        this.geo_Text = optGeo.text;
        var couInter = {
            name: this.couName,
            description: this.couDescription,
            geography_id: this.geo_Value,
            country_code: this.couCode
        };
        if (this.countryIdToUpdate === null) {
            this.countryService.saveCountry(couInter)
                .subscribe(function (mySave) {
                _this.saveCou = mySave;
                console.log(_this.saveCou);
                _this.getCountryAll();
                _this._router.navigate(['/couList']);
                _this.show = !_this.show;
            });
            console.warn("am in create");
        }
        else {
            couInter.id = this.countryIdToUpdate;
            this.countryService.updateCountryAll(couInter).subscribe(function (successCode) {
                _this.getCountryAll();
            });
            console.warn("am in update");
            this.correct = !this.correct;
        }
    };
    CountryComponent.prototype.loadArticleToEdit = function (couId) {
        var _this = this;
        console.log(this.geoData, "am a response");
        this.countryService.getCountryById(couId).subscribe(function (geot) {
            _this.countryIdToUpdate = geot[0].id;
            console.log(_this.countryIdToUpdate);
            _this.formdata.setValue({ countryName: geot[0].name, countryDescription: geot[0].description, countryCode: geot[0].country_code, countryGeography: geot[0].geo_id });
        });
        this.correct = !this.correct;
    };
    CountryComponent.prototype.deleteArticle = function (couId) {
        var _this = this;
        this.countryService.deleteCountryById(couId)
            .subscribe(function (geot) {
            _this.getCountryAll();
        });
        this._router.navigate(['/couList']);
    };
    CountryComponent.prototype.onOptionSelected = function (event) {
        console.log(event); //option value will be sent as event
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("countryname"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], CountryComponent.prototype, "countryname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("countrydescription"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], CountryComponent.prototype, "countrydescription", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("countrycode"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], CountryComponent.prototype, "countrycode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("selectGeography"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], CountryComponent.prototype, "selectGeography", void 0);
    CountryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-country',
            template: __webpack_require__("./assets/app/app/country/country.component.html"),
            styles: [__webpack_require__("./assets/app/app/country/country.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__country_service__["a" /* CountryService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], CountryComponent);
    return CountryComponent;
}());



/***/ }),

/***/ "./assets/app/app/country/country.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountryService; });
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
var CountryService = /** @class */ (function () {
    function CountryService(http) {
        this.http = http;
    }
    CountryService.prototype.saveCountry = function (couCreate) {
        return this.http.post("http://localhost:1337/createcountry", couCreate, httpOptions);
    };
    CountryService.prototype.getCountryById = function (geoId) {
        return this.http.get("http://localhost:1337/findcountry" + "/" + geoId);
    };
    CountryService.prototype.getGeographyOnly = function () {
        return this.http.get("http://localhost:1337/geographys").map(function (res) { return res; });
    };
    CountryService.prototype.updateCountryAll = function (cou) {
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.post("http://localhost:1337/updatecountry", cou, httpOptions);
    };
    CountryService.prototype.deleteCountryById = function (couId) {
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.request('delete', 'http://localhost:1337/destroycountry', { body: { country_id: couId }, headers: httpHeaders, responseType: 'text' });
    };
    CountryService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], CountryService);
    return CountryService;
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

/***/ "./assets/app/app/document/document.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/document/document.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"!correct\">\r\n  <div class=\"widget-heading\">      \r\n    <h3 class=\"widget-title\">Document Management</h3>\r\n                       \r\n  </div>\r\n  <div class=\"form-group\">                     \r\n    <div class=\"col-sm-offset-3 col-sm-9\">\r\n      <button id=\"createdoctype\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\" (click)=\"toggle()\">create</button>\r\n\r\n    </div>\r\n  </div>\r\n  <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\r\n    <thead>\r\n      <tr>\r\n        <th class=\"text-center\">Name</th>\r\n        <th class=\"text-center\">Description</th>\r\n        <th class=\"text-center\">Operation</th>\r\n      </tr>\r\n    </thead>           \r\n    <tbody id=\"doc-list-table\">   \r\n      <tr *ngFor=\"let doc of documentResponse; let i = index\">\r\n        <!-- ngfor goes here -->\r\n        <td class=\"text-left\">\r\n          {{doc.name}}\r\n        </td>\r\n        <td class=\"text-center\">\r\n          {{doc.description}}\r\n        </td>\r\n        <td class=\"text-center\">\r\n          <div>\r\n            <span id=\"toeditdoctype\" class=\"published\">\r\n              <a class=\"tooltips\">\r\n                <span>\r\n                  <button type=\"button\" (click)=\"loadArticleToEdit(doc.id)\">Edit</button>\r\n                </span>\r\n                <img src=\"/images/edit.png\" />\r\n              </a>\r\n            </span>\r\n            <span class=\"delete-doc\" data-toggle=\"modal\" data-target=\"\">\r\n              <a class=\"tooltips\">\r\n                <span>\r\n                  <button type=\"button\" (click)=\"deleteArticle(doc.id)\">Delete</button>\r\n                </span>\r\n                <img src=\"/images/delete.png\" />\r\n              </a>\r\n            </span>\r\n          </div>\r\n          <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"\">\r\n            <div role=\"document\" class=\"modal-dialog modal-sm\">\r\n              <div class=\"modal-content\">\r\n                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\r\n                  <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                  </button>\r\n                  <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Document Delete</h4>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                  <p>Do you want to delete?</p>\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                  <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\r\n                  <button type=\"button\" data-dismiss=\"modal\" id=\"delDocumentType\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <div id=\"findStatus\"></div>\r\n  <div class=\"doc_load\">\r\n    <div id=\"loadMore\"></div>\r\n  </div>\r\n</ng-container>\r\n<ng-container *ngIf=\"correct\">\r\n  <div class=\"col-md-7\">\r\n    <div class=\"widget\">\r\n      <div class=\"widget-heading\">           \r\n        <h3 class=\"widget-title\">Document Set Up</h3>\r\n        <h3 class=\"widget-title\" *ngIf=\"documentIdToUpdate\">Edit Document</h3>      \r\n      </div>\r\n      <div class=\"widget-body\">\r\n        <form class=\"form-horizontal\" [formGroup]=\"formdata\" (ngSubmit)=\"onClickSubmit(formdata.value)\">\r\n          <div class=\"form-group\">\r\n            <label class=\"col-sm-3 control-label\">Name</label>\r\n            <div class=\"col-sm-9\">\r\n              <input type=\"text\" class=\"form-control\" formControlName=\"documentName\" [(ngModel)]=\"docInter.name\" #doctypename/>\r\n              <div id=\"doctype_name_error\" class=\"doctype_name_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label class=\"col-sm-3 control-label\">Description</label>\r\n            <div class=\"col-sm-9\">\r\n              <input type=\"text\" class=\"form-control\" formControlName=\"documentDescription\" [(ngModel)]=\"docInter.description\" #doctypedescription/>\r\n              <div id=\"doctype_description_error\" class=\"doctype_description_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <div class=\"col-sm-offset-3 col-sm-9\">\r\n              <button *ngIf=\"!documentIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">CREATE</button>\r\n              <button *ngIf=\"documentIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">UPDATE</button>\r\n              <button id=\"cancel\" class=\"btn btn-outline btn-black\">Cancel</button>\r\n            </div>\r\n          </div>\r\n        \r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-container>"

/***/ }),

/***/ "./assets/app/app/document/document.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__document_service__ = __webpack_require__("./assets/app/app/document/document.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DocumentComponent = /** @class */ (function () {
    function DocumentComponent(http, documentService, renderer, elem, _router) {
        this.http = http;
        this.documentService = documentService;
        this.renderer = renderer;
        this.elem = elem;
        this._router = _router;
        this.documentIdToUpdate = null;
        this.show = false;
        this.correct = false;
        this.docInter = {
            name: '',
            description: ''
        };
    }
    DocumentComponent.prototype.ngOnInit = function () {
        this.formdata = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            documentName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            documentDescription: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]("")
        });
        this.loadAllDocuments();
    };
    DocumentComponent.prototype.loadAllDocuments = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/doctype', { headers: headers }).subscribe(function (data) {
            _this.documentResponse = data;
            console.log(data);
        });
    };
    DocumentComponent.prototype.toggle = function () {
        this.correct = !this.correct;
        this._router.navigate(['/docCreate']);
    };
    DocumentComponent.prototype.saveEdit = function () {
        var _this = this;
        this.getDocName = this.doctypename.nativeElement.value;
        this.getDocDescription = this.doctypedescription.nativeElement.value;
        var docInter = {
            name: this.getDocName,
            description: this.getDocDescription
        };
        if (this.documentIdToUpdate === null) {
            this.documentService.saveDocument(docInter)
                .subscribe(function (mySave) {
                _this.saveDoc = mySave;
                console.log(_this.saveDoc);
                _this.loadAllDocuments();
                _this._router.navigate(['/docList']);
                _this.show = !_this.show;
            });
            console.warn("am in create");
        }
        else {
            docInter.id = this.documentIdToUpdate;
            this.documentService.updateDocument(docInter).subscribe(function (successCode) {
                _this.loadAllDocuments();
            });
            console.warn("am in update");
            this.correct = !this.correct;
        }
    };
    DocumentComponent.prototype.loadArticleToEdit = function (documentId) {
        var _this = this;
        this.documentService.getDocumentById(documentId)
            .subscribe(function (doc) {
            _this.documentIdToUpdate = doc[0].id;
            _this.formdata.setValue({ documentName: doc[0].name, documentDescription: doc[0].description });
        });
        this.correct = !this.correct;
    };
    DocumentComponent.prototype.deleteArticle = function (documentId) {
        var _this = this;
        this.documentService.deleteDocumentById(documentId)
            .subscribe(function (doc) {
            _this.loadAllDocuments();
        });
        this._router.navigate(['/docList']);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("doctypename"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], DocumentComponent.prototype, "doctypename", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("doctypedescription"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], DocumentComponent.prototype, "doctypedescription", void 0);
    DocumentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-document',
            template: __webpack_require__("./assets/app/app/document/document.component.html"),
            styles: [__webpack_require__("./assets/app/app/document/document.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__document_service__["a" /* DocumentService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], DocumentComponent);
    return DocumentComponent;
}());



/***/ }),

/***/ "./assets/app/app/document/document.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentService; });
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
var DocumentService = /** @class */ (function () {
    function DocumentService(http) {
        this.http = http;
    }
    DocumentService.prototype.saveDocument = function (insertDocument) {
        return this.http.post("http://localhost:1337/createDocType", insertDocument, httpOptions);
    };
    DocumentService.prototype.updateDocument = function (updateDocument) {
        return this.http.post("http://localhost:1337/updateDocType", updateDocument, httpOptions);
    };
    DocumentService.prototype.getDocumentById = function (doumentId) {
        return this.http.get("http://localhost:1337/findDocType" + "/" + doumentId);
    };
    DocumentService.prototype.deleteDocumentById = function (doumentId) {
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.request('delete', 'http://localhost:1337/destroydocument', { body: { document_id: doumentId }, headers: httpHeaders, responseType: 'text' });
    };
    DocumentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], DocumentService);
    return DocumentService;
}());



/***/ }),

/***/ "./assets/app/app/documentupload/documentupload.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/documentupload/documentupload.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"!correct\">\n    <div class=\"widget-heading\">\n        <h3 class=\"widget-title\">Document Upload Management</h3>\n    </div>\n    <div class=\"form-group\">\n        <div class=\"col-sm-offset-3 col-sm-9\">\n            <!-- {#upload} -->\n            <button id=\"renderFileUploadPage\" class=\"btn btn-success btn-rounded btn-block\">Upload File</button>\n            <!-- {/upload} -->\n            <!--click event for upload documents-->\n        </div>\n    </div>\n    <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\n        <thead>\n            <tr>\n                <th style=\"width:6%\" class=\"text-center\">Geography</th>\n                <th style=\"width:10%\" class=\"text-center\">Domain</th>\n                <th style=\"width:10%\" class=\"text-center\">Country</th>\n                <th style=\"width:10%\" class=\"text-center\">State</th>\n                <th style=\"width:10%\" class=\"text-center\">Regulator</th>\n                <th style=\"width:10%\" class=\"text-center\">Regulation</th>\n                <th style=\"width:10%\" class=\"text-center\">Document</th>\n                <th style=\"width:10%\" class=\"text-center\">SubDocument</th>\n                <th style=\"width:30%\" class=\"text-center\">Uploaded File</th>\n                <th style=\"width:30%\" class=\"text-center\">Operation</th>\n            </tr>\n        </thead>\n        <tbody id=\"doc-list-table\">\n            <tr *ngFor=\"let dres of documentResponse; let i = index\">\n                <!-- ngfor goes here -->\n                <td class=\"text-center\">\n                    {{dres.gname}}\n                </td>\n                <td class=\"text-center\">\n                    {{dres.dname}}\n                </td>\n                <td class=\"text-center\">\n                    {{dres.coname}}\n                </td>\n                <td class=\"text-center\">\n                    {{dres.stname}}\n                </td>\n                <td class=\"text-center\">\n                    {{dres.regtrName}}\n                </td>\n                <td class=\"text-center\">\n                    {{dres.rname}}\n                </td>\n                <td class=\"text-center\">\n                    {{dres.docname}}\n                </td>\n                <td class=\"text-center\">\n                    {{dres.sdocname}}\n                </td>\n\n                <td class=\"text-center\">\n                    {{dres.fname}}\n                </td>\n                <td class=\"text-center\">\n                    <div>\n                        <!-- {#publish} -->\n\n                        <!-- <% if (tobepublished == 1) {%> -->\n                        <span class=\"published\" data-toggle=\"modal\" data-target=\"#pub<%=fid%>\"><a class=\"tooltips\"><span>Published</span><img src=\"/images/published.png\" /></a>\n                        </span>\n                        <!-- <% } else { %> -->\n                        <span class=\"not-published\" data-toggle=\"modal\" data-target=\"#pub<%=fid%>\"><a class=\"tooltips\"><span>Publish</span><img src=\"/images/publish.png\" /></a>\n                        </span>\n                        <!-- <% } %> -->\n                        <!-- {/publish} {#delete} -->\n                        <span class=\"delete-doc\" data-toggle=\"modal\" data-target=\"#<%=fid%>\"><a class=\"tooltips\"><span>Delete</span><img src=\"/images/delete.png\" /></a>\n                        </span>\n                        <!-- {/delete} -->\n                    </div>\n                    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"pub<%=fid%>\">\n                        <div role=\"document\" class=\"modal-dialog modal-sm\">\n                            <div class=\"modal-content\">\n                                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button>\n                                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Document Publish</h4>\n                                </div>\n                                <div class=\"modal-body\">\n                                    <p>Do you want to publish?</p>\n                                </div>\n                                <div class=\"modal-footer\">\n                                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\n                                    <button type=\"button\" data-dismiss=\"modal\" id=\"publishDocument\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"<%=fid%>\">\n                        <div role=\"document\" class=\"modal-dialog modal-sm\">\n                            <div class=\"modal-content\">\n                                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button>\n                                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Document Delete</h4>\n                                </div>\n                                <div class=\"modal-body\">\n                                    <p>Do you want to delete?</p>\n                                </div>\n                                <div class=\"modal-footer\">\n                                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\n                                    <button type=\"button\" data-dismiss=\"modal\" id=\"delDocument\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <div id=\"findStatus\"></div>\n    <div class=\"user_load\">\n        <div id=\"loadMore\"></div>\n    </div>\n\n    <div class=\"widget-heading\">\n        <h3 class=\"widget-title\">Lifecycle Document Upload Management</h3>\n    </div>\n\n    <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\n        <thead>\n            <tr>\n                <th style=\"width:6%\" class=\"text-center\">DocumentType</th>\n                <th style=\"width:10%\" class=\"text-center\">Description</th>\n                <th style=\"width:10%\" class=\"text-center\">Date</th>\n                <th style=\"width:30%\" class=\"text-center\">Uploaded File</th>\n                <th style=\"width:30%\" class=\"text-center\">Operation</th>\n            </tr>\n        </thead>\n        <tbody id=\"spdoc-list-table\">\n            <tr *ngFor=\"let spres of spDocumentResponse; let i = index\">\n                <!-- ngfor goes here -->\n                <td class=\"text-center\">\n                    {{spres.document_type}}\n                </td>\n                <td class=\"text-center\">\n                    {{spres.description}}\n                </td>\n                <td class=\"text-center\">\n                    {{spres.date}}\n                </td>\n                <td class=\"text-center\">\n                    {{spres.file_name}}\n                </td>\n                <td class=\"text-center\">\n                    <div>\n\n                        <span id=\"editSpclDoc\" class=\"published\"><a class=\"tooltips\"><span>Edit</span><img src=\"/images/edit.png\" /></a>\n                        </span>\n                        <!-- {#publish} -->\n\n                        <!-- <% if (is_published == 1) {%> -->\n                        <span class=\"published\" data-toggle=\"modal\" data-target=\"#pub<%=spid%>\"><a class=\"tooltips\"><span>Published</span><img src=\"/images/published.png\" /></a>\n                        </span>\n                        <!-- <% } else { %> -->\n                        <span class=\"not-published\" data-toggle=\"modal\" data-target=\"#pub<%=spid%>\"><a class=\"tooltips\"><span>Publish</span><img src=\"/images/publish.png\" /></a>\n                        </span>\n                        <!-- <% } %> -->\n                        <!-- {/publish} {#delete} -->\n                        <span class=\"delete-doc\" data-toggle=\"modal\" data-target=\"#del<%=spid%>\"><a class=\"tooltips\"><span>Delete</span><img src=\"/images/delete.png\" /></a>\n                        </span>\n                        <!-- {/delete} -->\n                    </div>\n                    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"pub<%=spid%>\">\n                        <div role=\"document\" class=\"modal-dialog modal-sm\">\n                            <div class=\"modal-content\">\n                                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button>\n                                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Document Publish</h4>\n                                </div>\n                                <div class=\"modal-body\">\n                                    <p>Do you want to publish?</p>\n                                </div>\n                                <div class=\"modal-footer\">\n                                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\n                                    <button type=\"button\" data-dismiss=\"modal\" id=\"publishDocument\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"del<%=spid%>\">\n                        <div role=\"document\" class=\"modal-dialog modal-sm\">\n                            <div class=\"modal-content\">\n                                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button>\n                                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Document Delete</h4>\n                                </div>\n                                <div class=\"modal-body\">\n                                    <p>Do you want to delete?</p>\n                                </div>\n                                <div class=\"modal-footer\">\n                                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\n                                    <button type=\"button\" data-dismiss=\"modal\" id=\"delDocument\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <div id=\"findStatusSpclDoc\"></div>\n    <div class=\"user_load\">\n        <div id=\"loadMoreSpclDoc\"></div>\n    </div>\n</ng-container>\n<!--file upload after click action for container  starts-->\n<ng-container *ngIf=\"correct\">\n\n    <div id=\"filePage\">\n        <span style=\"width:130px; position: relative; left: 1px; float: left; margin-top: 0px 20px;\">       \n              <label for=\"message_name\">Message</label>\n                <input id=\"message_name\" type=\"text\" class=\"form-control\" style=\"width:500px;\">\n                <div id=\"message_name_error\" class=\"message_name_error\" style=\"font-size: 12px; color: #FF0000; \">\n          </div> \n          </span><br><br><br><br>\n\n        <span style=\"width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n            <div class=\"form-group\">\n              <label for=\"selectGeo\">Select Geography</label>\n              <select id=\"selectGeo\" class=\"form-control\">\n                \n              </select>\n            </div>      \n          </span>\n        <span style=\"width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\"> \n            <div class=\"form-group\">\n              <label for=\"selectCountry\">Select Country</label>\n              <select id=\"selectCountry\" class=\"form-control\" disabled=\"disabled\">\n                \n              </select>\n            </div>          \n          </span>\n        <span style=\"width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n              <div class=\"form-group\">\n              <label for=\"selectState\">Select State</label>\n              <select id=\"selectState\" class=\"form-control\" disabled=\"disabled\">  \n              </select>\n            </div>   \n          </span>\n        <br><br><br><br>\n        <span style=\"width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n          <div class=\"form-group\">\n              <label for=\"selectDomain\">Select Domain</label>\n              <select id=\"selectDomain\" class=\"form-control\" disabled=\"disabled\">\n                \n              </select>\n            </div>     \n          </span>\n        <span style=\"width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n            <div class=\"form-group\">\n              <label for=\"selectRegulator\">Select Regulator</label>\n              <select id=\"selectRegulator\" class=\"form-control\" disabled=\"disabled\">\n                \n              </select>\n            </div>      \n          </span>\n        <span style=\"width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n            <div class=\"form-group\">\n              <label for=\"selectReg\">Select Regulation</label>\n              <select id=\"selectReg\" class=\"form-control\" disabled=\"disabled\">\n                \n              </select>\n            </div>      \n          </span><br><br><br><br>\n\n        <span style=\"width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n            <div class=\"form-group\">\n              <label for=\"selectRootDoc\">Select Document</label>\n              <select id=\"selectRootDoc\" class=\"form-control\" disabled=\"disabled\">          \n              </select>\n            </div>      \n          </span>\n\n        <span style=\"width:190px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n            <div class=\"form-group\">\n              <label for=\"selectSubDoc\" id=\"selectDocName\">Select Sub Document</label>\n              <select id=\"selectSubDoc\" class=\"form-control parent_control\" disabled=\"disabled\">  \n              </select>\n              </div>\n          </span>\n\n        <span id=\"upload-span\" style=\"width:190px; position: relative; left: 10px; margin-top: 0px 20px;float: left;\">\n            <div class=\"form-group\">\n              <label for=\"uploadFile\">Upload File</label>\n              <input type=\"file\" name=\"uploadFile\" id=\"uploadFile\" disabled=\"\" data-buttonname=\"btn-outline btn-primary\" data-iconname=\"ion-image mr-5\" class=\"filestyle\" style=\"position: absolute; clip: rect(0px, 0px, 0px, 0px);\" tabindex=\"-1\">\n              <div style=\"width:300px; position: relative; left: 10px; margin-top: 0px 20px;\" class=\"bootstrap-filestyle input-group\">\n                <input id=\"fileName\" class=\"form-control \" placeholder=\"\" disabled=\"\" type=\"text\"> \n                <div id=\"file_error\" class=\"file_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\n                <span class=\"group-span-filestyle input-group-btn\" tabindex=\"0\">\n                  <label id=\"uploadFileLabel\" disable=\"\" for=\"uploadFile\" class=\"btn btn-outline btn-primary-red\" style=\"cursor: not-allowed;\">\n                    <span class=\"icon-span-filestyle ion-image mr-5\"></span>\n        <span class=\"buttonText\">Choose file</span>\n        </label>\n        </span>\n    </div>\n    </div>\n    </span>\n\n    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"chooseFileid\">\n        <div role=\"document\" class=\"modal-dialog modal-sm\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button>\n                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Upload Document</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <p>Please upload pdf/xlsx documents</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\" id=\"modalClose\">Ok</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    </div>\n\n</ng-container>\n<!--file upload after click action for container ends-->\n<!--after life tracker dropdown click-->\n<ng-container *ngIf=\"correct\">\n    <div class=\"widget-heading\" id=\"title\">\n        <h3 class=\"widget-title\">LifeTracker Document</h3>\n    </div>\n\n    <div id=\"addTracker\">\n        <div id=\"trackerList\">\n            <span style=\"width:195px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n        <div class=\"form-group\">\n          <label for=\"document_type\">Select DocumentType</label>\n          <select id=\"document_type\" class=\"form-control select_document_type\">\n        \n        </select>  \n        </div>      \n      </span>\n\n            <span style=\"width:195px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n        <div class=\"form-group\">\n          <label for=\"description\">Description</label>\n              <input id=\"docTypedescription\" name=\"docTypedescription\" type=\"text\" class=\"form-control docTypedescription\" maxlength=\"2400\"/>\n\n        </div>\n      </span>\n\n            <span style=\"width:195px; position: relative; left: 10px; float: left; margin: 0 15px 0 0px;\">\n        <div class=\"form-group\">\n          <label for=\"date\">Date</label>\n            \n                <div id=\"datetimepicker1\" class=\"input-group date\">\n                  <input type=\"text\" id=\"dateDoc\" name=\"dateDoc\" data-date-format='YYYY-MM-DD' class=\"form-control dateDoc\">\n                   <div id=\"news_date_error\" class=\"\" style=\"font-size: 12px; color: #FF0000; \"></div>\n                </div>             \n        </div>\n      </span>\n\n            <span style=\"width:195px; position: relative; left: 10px; margin-top: 0px 20px;float: left;\">\n    <div class=\"form-group\">\n      <label for=\"uploadFileDoc\">Upload File</label>\n      <input type=\"file\" name=\"uploadFileDoc\" id=\"uploadFileDoc\" data-buttonname=\"btn-outline btn-primary\" data-iconname=\"ion-image mr-5\" class=\"filestyle\" style=\"position: absolute; clip: rect(0px, 0px, 0px, 0px);\" tabindex=\"-1\">\n      <div style=\"width:300px; position: relative; left: 10px; margin-top: 0px 20px;\" class=\"bootstrap-filestyle input-group\">\n        <input id=\"lifeTrackerfileName\" class=\"form-control lifeTrackerfileName\" placeholder=\"\" disabled=\"\" type=\"text\"> \n        <div id=\"file_error_doc\" class=\"file_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\n        <span class=\"group-span-filestyle input-group-btn\" tabindex=\"0\">\n          <label id=\"uploadFileLabelDoc\" for=\"uploadFileDoc\" class=\"btn btn-outline btn-primary-red\">\n            <span class=\"icon-span-filestyle ion-image mr-5\"></span>\n            <span class=\"buttonText\">Choose file</span>\n            </label>\n            </span>\n        </div>\n    </div>\n    </span>\n\n    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"chooseFileidDoc\">\n        <div role=\"document\" class=\"modal-dialog modal-sm\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button>\n                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Upload Document</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <p>Please upload pdf/xlsx documents</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\" id=\"modalDocClose\">Ok</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    </div>\n    </div>\n\n    <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\n        <thead>\n            <tr>\n                <th style=\"width:6%\" class=\"text-center\">DocumentType</th>\n                <th style=\"width:10%\" class=\"text-center\">Description</th>\n                <th style=\"width:10%\" class=\"text-center\">Date</th>\n                <th style=\"width:30%\" class=\"text-center\">Uploaded File</th>\n                <th style=\"width:30%\" class=\"text-center\">Operation</th>\n            </tr>\n        </thead>\n        <tbody id=\"doc-list-table\"></tbody>\n    </table>\n</ng-container>"

/***/ }),

/***/ "./assets/app/app/documentupload/documentupload.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentuploadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__documentupload_service__ = __webpack_require__("./assets/app/app/documentupload/documentupload.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DocumentuploadComponent = /** @class */ (function () {
    function DocumentuploadComponent(http, documentService, renderer, elem, _router) {
        this.http = http;
        this.documentService = documentService;
        this.renderer = renderer;
        this.elem = elem;
        this._router = _router;
        this.correct = false;
    }
    DocumentuploadComponent.prototype.ngOnInit = function () {
        this.specialDocumentListLoad();
        this.documentListLoad();
    };
    DocumentuploadComponent.prototype.specialDocumentListLoad = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/document', { headers: headers }).subscribe(function (data) {
            _this.documentResponse = data;
            console.log(data);
        });
    };
    DocumentuploadComponent.prototype.documentListLoad = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/spdocument', { headers: headers }).subscribe(function (data) {
            _this.spDocumentResponse = data;
            console.log(data);
        });
    };
    DocumentuploadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-documentupload',
            template: __webpack_require__("./assets/app/app/documentupload/documentupload.component.html"),
            styles: [__webpack_require__("./assets/app/app/documentupload/documentupload.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__documentupload_service__["a" /* DocumentuploadService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], DocumentuploadComponent);
    return DocumentuploadComponent;
}());



/***/ }),

/***/ "./assets/app/app/documentupload/documentupload.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentuploadService; });
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

var DocumentuploadService = /** @class */ (function () {
    function DocumentuploadService() {
    }
    DocumentuploadService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DocumentuploadService);
    return DocumentuploadService;
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
        return this.http.post("http://localhost:1337/updateGeo", geo, httpOptions);
    };
    CreateService.prototype.getGeographyById = function (geoId) {
        return this.http.get("http://localhost:1337/findgeo" + "/" + geoId);
    };
    CreateService.prototype.deleteGeographyById = function (geoId) {
        // return this.http.request('delete', 'http://localhost:1337/destroygeography', { body: { geography_id: geoId} });
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.request('delete', 'http://localhost:1337/destroygeography', { body: { geography_id: geoId }, headers: httpHeaders, responseType: 'text' });
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

module.exports = "<ng-container *ngIf=\"!correct\">\r\n    <div class=\"widget-heading\">\r\n        <h3 class=\"widget-title\">Geography Management</h3>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <div class=\"col-sm-offset-3 col-sm-9\">\r\n            <button id=\"creategeo\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\" (click)=\"toggle()\">create</button>\r\n\r\n        </div>\r\n\r\n        <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\r\n            <thead>\r\n                <tr>\r\n                    <th style=\"width:15%\" class=\"text-center\">Name</th>\r\n                    <th style=\"width:15%\" class=\"text-center\">Description</th>\r\n                    <th style=\"width:30%\" class=\"text-center\">Operation</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody id=\"doc-list-table\">\r\n\r\n                <tr *ngFor=\"let employee of myData; let i = index\">\r\n                    <td class=\"text-center\">\r\n                        {{employee.name}}\r\n                    </td>\r\n                    <td class=\"text-center\">\r\n                        {{employee.description}}\r\n                    </td>\r\n                    <td class=\"text-center\">\r\n                        <div id=\"hide\">\r\n                            <span id=\"tocreategeo\" class=\"published\">  \r\n                                <a class=\"tooltips\">\r\n                    <span><button type=\"button\" (click)=\"loadArticleToEdit(employee.id)\">Edit</button></span>\r\n                                    <img src=\"/images/edit.png\" />\r\n                                </a>\r\n                            </span>       \r\n                            <span class=\"delete-doc\" data-toggle=\"modal\" data-target=\"#<%=id%>\">\r\n                                <a class=\"tooltips\">\r\n                    <span><td><button type=\"button\" (click)=\"deleteArticle(employee.id)\">Delete</button></td></span>\r\n                                    <img src=\"/images/delete.png\" />\r\n                                </a>\r\n                            </span>\r\n                        </div>\r\n                        <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"<%=id%>\">\r\n                            <div role=\"document\" class=\"modal-dialog modal-sm\">\r\n                                <div class=\"modal-content\">\r\n                                    <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\r\n                                        <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\r\n                                            <span aria-hidden=\"true\">×</span>\r\n                                        </button>\r\n                                        <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Geography Delete</h4>\r\n                                    </div>\r\n                                    <div class=\"modal-body\">\r\n                                        <p>Do you want to delete?</p>\r\n                                    </div>\r\n                                    <div class=\"modal-footer\">\r\n                                        <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\r\n                                        <button type=\"button\" id=\"delGeography\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div id=\"findStatus\"></div>\r\n        <div class=\"user_load\">\r\n            <div id=\"loadMore\">\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</ng-container>\r\n<ng-container *ngIf=\"correct\">\r\n    <div class=\"col-md-7\">\r\n        <div class=\"widget\">\r\n            <div class=\"widget-heading\">\r\n                <h3 class=\"widget-title\">Geography Set Up</h3>\r\n            </div>\r\n            <div class=\"widget-body\">\r\n                <form class=\"form-horizontal\" [formGroup]=\"formdata\" (ngSubmit)=\"onClickSubmit(formdata.value)\">\r\n                    <div class=\"form-group\">\r\n                        <label class=\"col-sm-3 control-label\">Name</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"geographyName\" [(ngModel)]=\" geoCreate.name\" #geoname/>\r\n                            <div id=\"geo_name_error\" class=\"geo_name_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label class=\"col-sm-3 control-label\">Description</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"geoDescription\" [(ngModel)]=\" geoCreate.description\" #geodescription/>\r\n                            <div id=\"geo_description_error\" class=\"geo_description_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-offset-3 col-sm-9\">\r\n                            <!-- <input type=\"submit\" class=\"btn btn-outline btn-success\" value=\"Save\"> -->\r\n<button *ngIf=\"!articleIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">CREATE</button>  \r\n<button *ngIf=\"articleIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">UPDATE</button>                       \r\n                            <button id=\"cancel\" class=\"btn btn-outline btn-black\">Cancel</button>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>     \r\n    </div>\r\n</ng-container>"

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
        console.log(this.articleIdToUpdate);
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
            this.correct = !this.correct;
        }
    };
    GeographyComponent.prototype.loadArticleToEdit = function (geoId) {
        var _this = this;
        this.createService.getGeographyById(geoId)
            .subscribe(function (geot) {
            _this.articleIdToUpdate = geot[0].id;
            _this.formdata.setValue({ geographyName: geot[0].name, geoDescription: geot[0].description });
        });
        this.correct = !this.correct;
    };
    GeographyComponent.prototype.deleteArticle = function (geoId) {
        var _this = this;
        this.createService.deleteGeographyById(geoId)
            .subscribe(function (geot) {
            _this.getGeographyAll();
        });
        this._router.navigate(['/geoList']);
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

module.exports = "<header>\r\n        <a href=\"javascript:;\" role=\"button\" class=\"hamburger-menu pull-left\">\r\n          <span></span>  \r\n        </a>            \r\n        <div>  \r\n          <div style=\"float:right; overflow: visible\" align=\"top\">\r\n            <h4 class=\"media-heading fs-16\">user_name</h4>\r\n            <div class=\"dropdown\">\r\n              <a id=\"dropdown-status\" href=\"javascript:;\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"true\"\r\n                class=\"dropdown-toggle\">\r\n                <span class=\"status bg-success\"></span>\r\n                <a href=\"/logout\">Logout</a>    host\r\n              </a>\r\n            </div>\r\n          </div>\r\n          <div class=\"image-container234\" style=\"position:absolute; top:20px;right:180px\">\r\n            <div id=\"esp-user-profile\" data-percent=\"66\" style=\"height: 56px; width: 56px; line-height: 40px; padding: 8px; cursor: pointer;\"\r\n              class=\"easy-pie-chart\">\r\n              <img src=\"{profile_image_link}\" alt=\"\" class=\"avatar img-circle\" width=\"42\" height=\"42\" align=\"top\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"zurik-con\" style=\"height: 56px; width: 56px; line-height: 40px; padding: 8px;\">\r\n          <a style=\"left: 100px; top: 20px;\" href=\"/adminDashboard\" class=\"brand\"></a>\r\n        </div>\r\n      </header>"

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

module.exports = "<!-- <button type=\"button\" class=\"btn btn-primary-outline pull-right\" (click)=\"btnClick();\">\r\n    <i class=\"fa fa-plus\"></i> Add User</button>    -->\r\n\r\n<!-- <kendo-grid [data]=\"myData\" [height]=\"410\">\r\n  <kendo-grid-column field=\"id\" title=\"ID\" width=\"40\">       \r\n  </kendo-grid-column>\r\n  <kendo-grid-column field=\"user_name\" title=\"Name\" width=\"250\">\r\n  </kendo-grid-column>\r\n  <kendo-grid-column field=\"type\" title=\"Category\">\r\n  </kendo-grid-column>   \r\n  <kendo-grid-column field=\"access_reg\" title=\"Access\" width=\"80\">\r\n  </kendo-grid-column>\r\n  <kendo-grid-column field=\"access1_reg\" title=\"Access 1\" width=\"80\">\r\n  </kendo-grid-column>\r\n  <kendo-grid-column field=\"mobile_no\" title=\"Mobile\" width=\"80\">\r\n  </kendo-grid-column>\r\n  <kendo-grid-column field=\"email_id\" title=\"Email\" width=\"80\">\r\n  </kendo-grid-column> -->\r\n<!-- <kendo-grid-column field=\"access_geo\" title=\"Geo\" width=\"80\">\r\n  </kendo-grid-column> -->\r\n<!-- <kendo-grid-column field=\"renewal_date\" title=\"Date\" width=\"80\">\r\n  </kendo-grid-column>\r\n  <kendo-grid-column field=\"Discontinued\" title=\"Edit\" width=\"120\">\r\n      <ng-template kendoGridCellTemplate let-dataItem>\r\n          <input type=\"checkbox\" (click)=\"selectAllStudentsChange($event)\"   \r\n          [checked]=\"dataItem.Discontinued\"/>\r\n      </ng-template>\r\n  </kendo-grid-column>          \r\n  <kendo-grid-column field=\"Discontinued\" title=\"Delete\" width=\"120\">\r\n    <ng-template kendoGridCellTemplate let-dataItem>\r\n        <input type=\"checkbox\" [checked]=\"dataItem.Discontinued\"/>   \r\n    </ng-template>\r\n</kendo-grid-column>\r\n</kendo-grid> -->    \r\n\r\n<div class=\"widget-heading\">\r\n    <h3 class=\"widget-title\">User Management</h3>\r\n</div>\r\n<div class=\"form-group\">\r\n    <div class=\"col-sm-offset-3 col-sm-9\">\r\n        <div class=\"input-group input-group-search\">\r\n            <input id=\"searchUserTxt\" type=\"text\" placeholder=\"Search for...\" class=\"form-control\">\r\n            <span class=\"input-group-btn\">\r\n                <button id=\"searchUser\" type=\"button\" class=\"btn btn-outline\">Go!</button>           \r\n            </span>\r\n        </div>\r\n        <!-- {#createAdmin} -->\r\n        <button id=\"renderCreateUserFormPage\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\">Create User</button>\r\n        <button id=\"renderCreateAdminUserFormPage\" class=\"btn btn-success btn-rounded btn-block\" style=\"position: absolute;right: 50px;bottom: 0px;width: 150px;\">Create Admin</button>\r\n       \r\n    </div>\r\n</div>\r\n<table id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\r\n    <thead>\r\n        <tr>\r\n            <th style=\"width:15%\" class=\"text-center\" style=\"position: relative;right: 14px;width: 1%;\">User</th>\r\n            <th style=\"width:10%\" class=\"text-center\" style=\"left: 23px;width:10%;position: relative;\">Type</th>\r\n            <th style=\"width:10%\" class=\"text-center\" style=\"position: relative;left: 63px;width:10%;\">Email Id</th>\r\n            <th style=\"width:10%\" class=\"text-center\" style=\"position:  relative;left: 161px;width:10%;\">Mobile No</th>\r\n            <th style=\"width:15%\" class=\"text-center\" style=\"position:  relative;left: 160px;width:15%;\">Renewal Date</th>\r\n            <th style=\"width:30%\" class=\"text-center\" style=\"position: relative;left: 63px;width:30%;\">Operation</th>\r\n        </tr>\r\n        <tr style=\"display:show\" id=\"no-record-found\">\r\n            <th colspan=\"6\">\r\n                <span id=\"SearchResult\"></span>\r\n            </th>\r\n        </tr>\r\n    </thead>       \r\n    <div id=\"user-list-table\"></div>\r\n</table>        \r\n<div id=\"findStatus\"></div>\r\n<div class=\"user_load\">\r\n    <div id=\"loadMore\"></div>           \r\n</div>         \r\n<table class=\"table table-hover\">   \r\n    <tbody>   \r\n        <tr *ngFor=\"let employee of myData; let i = index\">\r\n            <td>\r\n                <div class=\"media\">\r\n                    <div class=\"media-body\">\r\n                        <h5 class=\"media-heading\">{{employee.user_name}}</h5>\r\n                    </div>\r\n                </div>            \r\n            </td>\r\n            <td class=\"text-center\">{{employee.type}}</td>\r\n            <td class=\"text-center\">{{employee.email_id}}</td>\r\n            <td class=\"text-center\">{{employee.mobile_no}}</td>\r\n            <td id='<%=user_name%><%=type%>' class=\"text-center\">{{employee.renewal_date}}</td>\r\n            <td class=\"text-center\">\r\n                <div>\r\n                    <!-- {#edituser} -->\r\n                    <span class=\"edit-user\" id=\"editUser\">\r\n                        <a class=\"tooltips\">\r\n                            <span>Edit</span>\r\n                            <img src=\"/images/edit.png\" />\r\n                        </a>\r\n                    </span>\r\n                    <!-- {/edituser} -->\r\n                    <!-- {#deleteuser}   -->\r\n                    <span class=\"delete-user\" data-toggle=\"modal\" data-target=\"#<%=id%>\">\r\n                        <a class=\"tooltips\">\r\n                            <span>Delete</span>\r\n                            <img src=\"/images/delete.png\" />\r\n                        </a>\r\n                    </span>\r\n                    <!-- {/deleteuser}   -->\r\n                </div>\r\n                <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"<%=id%>\">\r\n                    <div role=\"document\" class=\"modal-dialog modal-sm\">\r\n                        <div class=\"modal-content\">\r\n                            <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\r\n                                <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\r\n                                    <span aria-hidden=\"true\">×</span>\r\n                                </button>\r\n                                <h4 id=\"mySmallModalLabel\" class=\"modal-title\">User Delete</h4>\r\n                            </div>\r\n                            <div class=\"modal-body\">\r\n                                <p>Do you want to delete?</p>\r\n                            </div>\r\n                            <div class=\"modal-footer\">\r\n                                <button type=\"button\" data-dismiss=\"modal\" class=\"btn  btn-outline btn-primary-red\">Close</button>\r\n                                <button type=\"button\" data-dismiss=\"modal\" id=\"delUser\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n        </tr>\r\n    </tbody>\r\n</table>"

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

module.exports = "<p>\r\n  main-content works!\r\n</p>\r\n"

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

module.exports = "table {\r\n    font-family: arial, sans-serif;\r\n    border-collapse: collapse;\r\n    width: 100%;\r\n}\r\n\r\ntd, th {\r\n    border: 1px solid #dddddd;\r\n    text-align: left;\r\n    padding: 8px;\r\n}\r\n\r\ntr:nth-child(even) {\r\n    background-color: #dddddd;\r\n}"

/***/ }),

/***/ "./assets/app/app/newuser/newuser.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formdata\" (ngSubmit)=\"onClickSubmit(formdata.value)\">\r\n  <div class=\"form-group\">\r\n    <label for=\"usr\">Name:</label>  \r\n    <input type=\"text\" class=\"form-control\" formControlName=\"user_name\" [(ngModel)]=\" client.user_name\" #refusername>\r\n  </div>\r\n   \r\n  <div class=\"form-group\">    \r\n    <label for=\"pwd\">Email:</label>\r\n    <input type=\"text\" class=\"form-control\" formControlName=\"email_id\" [(ngModel)]=\" client.email_id\" #refemail>\r\n  </div>\r\n\r\n  <div class=\"form-group\">        \r\n    <label class=\"center-block\">Mobile No:   \r\n      <input class=\"form-control\" formControlName=\"mobile_no\" [(ngModel)]=\"client.mobile_no\" #refmob>\r\n    </label>\r\n  </div>         \r\n\r\n  <div class=\"form-group radio\">\r\n    <h4>Subscription:</h4>      \r\n    <label class=\"center-block\">   \r\n      <input type=\"radio\" formControlName=\"subscription\" value=\"paid\" [(ngModel)]=\"client.subscription\" #refsub>Paid Subscription</label>\r\n    <label class=\"center-block\">   \r\n      <input type=\"radio\" formControlName=\"subscription\" value=\"free\" [(ngModel)]=\"client.subscription\" #refsub>Free Trial</label>\r\n  </div>\r\n\r\n   <div class=\"form-group radio\">      \r\n    <h4>Access:</h4>           \r\n    <label class=\"center-block\">               \r\n      <input type=\"radio\" formControlName=\"access\" value=\"full\" [(ngModel)]=\"client.access\" (change)=\"handleChange($event)\" #refacc>Full</label>\r\n    <label class=\"center-block\">      \r\n      <input type=\"radio\" formControlName=\"access\" value=\"restricted\" [(ngModel)]=\"client.access\" (change)=\"handleChangeRest($event)\" #refacc>Restricted</label>\r\n  </div>\r\n  <div class=\"checkbox\">         \r\n    <h4>Alert Type:</h4>\r\n    <label class=\"center-block\">\r\n      <input type=\"checkbox\" formControlName=\"smsaccess\" [(ngModel)]=\"client.smsaccess\" value=\"sms\" class=\"classImLookingFor\" (change)=\"smsChoose($event)\" #sms>Sms      \r\n    </label>\r\n    <label class=\"center-block\">\r\n      <input type=\"checkbox\" formControlName=\"webaccess\" [(ngModel)]=\"client.webaccess\" value=\"web\" class=\"classImLookingFor\" (change)=\"webChoose($event)\" #web>Web      \r\n    </label>   \r\n    <label class=\"center-block\">                       \r\n      <input type=\"checkbox\" formControlName=\"emailaccess\" [(ngModel)]=\"client.emailaccess\" value=\"email\" class=\"classImLookingFor\" (change)=\"emailChoose($event)\" #email>E-mail       \r\n    </label>\r\n  </div>           \r\n  <div class=\"form-group\">         \r\n    <label class=\"control-label\" for=\"Geography\">Geography</label>\r\n    <select *ngIf=\"requests\" [(ngModel)]=\"selecteGeography\"  (change)=\"onSelectGeography($event)\"\r\n      class=\"form-control input-lg\"  class=\"classImLookingFor\" formControlName=\"geopgrpahy\" class=\"ge\" #Geography >\r\n      <option value=\"0\">Select Geography</option>   \r\n      <!-- <option *ngFor=\"let geograph of requests\" value={{geograph.id}}>{{geograph.name}}</option> -->\r\n       <option *ngFor=\"let geograph of requests\" [value]=\"geograph.id\">{{geograph.name}}</option>\r\n    </select>\r\n  </div>    \r\n  <div class=\"form-group\">      \r\n    <label class=\"control-label\" for=\"Country\">Country</label>\r\n    <select *ngIf=\"countryVal\" [(ngModel)]=\"selectedCountry\"  (change)=\"onSelectCountry($event)\"\r\n      class=\"form-control input-lg\"  class=\"classImLookingFor\" formControlName=\"country\" #Country>\r\n      <option value=\"0\">Select Country</option>  \r\n      <option *ngFor=\"let cout of countryVal\" value={{cout.id}}>{{cout.name}}</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"form-group\">       \r\n    <label class=\"control-label\" for=\"States\">State</label>\r\n    <select *ngIf=\"stateVal\" [(ngModel)]=\"selectedState\"  (change)=\"onSelectState($event)\"\r\n      class=\"form-control input-lg\"  class=\"classImLookingFor\" formControlName=\"state\" #States>\r\n      <option value=\"0\">Select State</option>  \r\n      <option *ngFor=\"let stat of stateVal\" value={{stat.id}}>{{stat.name}}</option>\r\n    </select>\r\n  </div>                                   \r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"Regulation\">Regulation</label>\r\n    <select class=\"form-control input-lg\"  class=\"classImLookingFor\" #Regulation>  \r\n      <option *ngIf=\"!selectedState\" value=\"0\">Select Reg</option>     \r\n      <option *ngFor=\"let reg of regulationVal\" value={{reg.rlid}}>{{reg.name}}</option>\r\n    </select>  \r\n   </div>     \r\n    \r\n  <input type=\"button\" value=\"Add\" (click)=\"addFunction()\">\r\n  <input type=\"submit\" class=\"forsubmit\" value=\"Save\">\r\n  <input type=\"button\" value=\"cancel\">\r\n</form>\r\n\r\n\r\n\r\n<table id=\"myTable\">\r\n  <thead>\r\n    <tr>\r\n      <th>GEOGRAPHY</th>\r\n      <th>COUNTRY</th>\r\n      <th>STATE</th>\r\n      <th>REGULATION</th>\r\n      <th>SMS</th>\r\n      <th>WEB</th>\r\n      <th>EMAIL</th>\r\n      <th>OPERATION</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody #ir>                       \r\n   \r\n<div *ngIf=\"!myFlag;else myFlagTrue;\" >\r\n</div>\r\n<ng-template #myFlagTrue>   \r\n  <tr *ngFor=\"let item of regulation_new; let i = index\">\r\n  <!-- <td>{{i+1}}</td>                 -->\r\n  <td>{{item.geography}}</td>                                          \r\n  <td>{{item.country}}</td>\r\n  <td>{{item.state}}</td>         \r\n  <td>{{item.regulation_name}}</td>                                                 \r\n  <td>{{item.smsaccess}}</td>               \r\n  <td>{{item.webaccess}}</td>                    \r\n  <td>{{item.emailaccess}}</td>\r\n  <td><button class=\"btn btn-default\"  type=\"button\" (click)=\"deleteFieldValue(i)\">Delete</button></td>          \r\n</tr>   \r\n</ng-template>  \r\n  </tbody>        \r\n</table>        \r\n"

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

module.exports = "<p>\r\n  page-not-found works!\r\n</p>\r\n"

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

/***/ "./assets/app/app/regulator/regulator.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/regulator/regulator.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"!correct\">\n    <div class=\"widget-heading\">\n        <h3 class=\"widget-title\">Regulator Management</h3>\n    </div>\n    <div class=\"form-group\">\n        <div class=\"col-sm-offset-3 col-sm-9\">\n            <button id=\"createregulator\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\" (click)=\"toggle()\">create</button>\n        </div>\n    </div>\n    <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\n        <thead>\n            <tr>\n                <th style=\"width:15%\" class=\"text-center\">Name</th>\n                <th style=\"width:15%\" class=\"text-center\">Description</th>\n                <th style=\"width:30%\" class=\"text-center\">Operation</th>\n            </tr>\n        </thead>\n        <tbody id=\"regulator-list-table\">\n            <tr *ngFor=\"let reg of regulatorResponse; let i = index\">\n                <!-- ngfor goes here -->\n                <td class=\"text-center\">\n                    {{reg.name}}\n                </td>\n                <td class=\"text-center\">\n                    {{reg.description}}\n                </td>\n                <td class=\"text-center\">\n                    <div>\n                        <span id=\"tocreateregulator\" class=\"published\"><a class=\"tooltips\">\n                          <span>\n                              <span><button type=\"button\" (click)=\"loadArticleToEdit(reg.id)\">Edit</button></span>\n                        </span>\n                        <img src=\"/images/edit.png\" /></a>\n                        </span>\n                        <span class=\"delete-doc\" data-toggle=\"modal\" data-target=\"\"><a class=\"tooltips\">\n                          <span>\n                              <button type=\"button\" (click)=\"deleteArticle(reg.id)\">Delete</button>                    \n                          </span>\n                        <img src=\"/images/delete.png\" /></a>\n                        </span>\n                    </div>\n                    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"\">\n                        <div role=\"document\" class=\"modal-dialog modal-sm\">\n                            <div class=\"modal-content\">\n                                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n                                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\"><span aria-hidden=\"true\">×</span></button>\n                                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Regulator Delete</h4>\n                                </div>\n                                <div class=\"modal-body\">\n                                    <p>Do you want to delete?</p>\n                                </div>\n                                <div class=\"modal-footer\">\n                                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\n                                    <button type=\"button\" id=\"delRegulator\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <div id=\"findStatus\"></div>\n    <div class=\"user_load\">\n        <div id=\"loadMore\"></div>\n    </div>\n</ng-container>\n<ng-container *ngIf=\"correct\">\n    <div class=\"col-md-7\">\n        <div class=\"widget\">\n            <div class=\"widget-heading\">\n                <h3 *ngIf=\"!subRegIdToUpdate\" class=\"widget-title\">Regulator Set Up</h3>\n                <h3 *ngIf=\"subRegIdToUpdate\" class=\"widget-title\">Edit Regulator</h3>\n            </div>\n            <div class=\"widget-body\">\n                <form class=\"form-horizontal\" [formGroup]=\"formdata\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">Name</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"regulatorName\" [(ngModel)]=\" regObj.name\" #regulatorname/>\n                            <div id=\"regulator_name_error\" class=\"regulator_name_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-3 control-label\">Description</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"regulatorDescription\" [(ngModel)]=\" regObj.description\" #regulatordescription/>\n                            <div id=\"regulator_description_error\" class=\"regulator_description_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-sm-offset-3 col-sm-9\">\n                            <button *ngIf=\"!subRegIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">CREATE</button>\n                            <button *ngIf=\"subRegIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">UPDATE</button>\n                            <button id=\"cancel\" class=\"btn btn-outline btn-black\">Cancel</button>\n                        </div>\n                    </div>\n\n                </form>\n            </div>\n        </div>\n    </div>\n</ng-container>"

/***/ }),

/***/ "./assets/app/app/regulator/regulator.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegulatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__regulator_service__ = __webpack_require__("./assets/app/app/regulator/regulator.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegulatorComponent = /** @class */ (function () {
    function RegulatorComponent(http, regulatorService, renderer, elem, _router) {
        this.http = http;
        this.regulatorService = regulatorService;
        this.renderer = renderer;
        this.elem = elem;
        this._router = _router;
        this.subRegIdToUpdate = null;
        this.show = false;
        this.correct = false;
        this.regObj = {
            name: '',
            description: ''
        };
    }
    RegulatorComponent.prototype.ngOnInit = function () {
        this.formdata = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            regulatorName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            regulatorDescription: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]("")
        });
        this.loadAllRegulator();
    };
    RegulatorComponent.prototype.loadAllRegulator = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/regulator', { headers: headers }).subscribe(function (data) {
            _this.regulatorResponse = data;
            console.log(data);
        });
    };
    RegulatorComponent.prototype.toggle = function () {
        this.correct = !this.correct;
        this._router.navigate(['/regCreate']);
    };
    RegulatorComponent.prototype.saveEdit = function () {
        var _this = this;
        this.getRegulatorName = this.regulatorname.nativeElement.value;
        this.getRegulatorDescription = this.regulatordescription.nativeElement.value;
        var regObj = {
            name: this.getRegulatorName,
            description: this.getRegulatorDescription
        };
        console.log(this.subRegIdToUpdate);
        if (this.subRegIdToUpdate === null) {
            this.regulatorService.saveRegulator(regObj)
                .subscribe(function (mySave) {
                _this.saveRegulator = mySave;
                console.log(_this.saveRegulator);
                _this.loadAllRegulator();
                _this._router.navigate(['/regList']);
                _this.show = !_this.show;
            });
            console.warn("am in create");
        }
        else {
            regObj.id = this.subRegIdToUpdate;
            this.regulatorService.updateRegulator(regObj).subscribe(function (successCode) {
                _this.loadAllRegulator();
            });
            console.warn("am in update");
            this.correct = !this.correct;
        }
    };
    RegulatorComponent.prototype.loadArticleToEdit = function (regId) {
        var _this = this;
        this.regulatorService.getRegulatorById(regId)
            .subscribe(function (regl) {
            _this.subRegIdToUpdate = regl[0].id;
            _this.formdata.setValue({ regulatorName: regl[0].name, regulatorDescription: regl[0].description });
        });
        this.correct = !this.correct;
    };
    RegulatorComponent.prototype.deleteArticle = function (regId) {
        var _this = this;
        this.regulatorService.deleteRegulatorById(regId)
            .subscribe(function (regl) {
            _this.loadAllRegulator();
        });
        this._router.navigate(['/regList']);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("regulatorname"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], RegulatorComponent.prototype, "regulatorname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("regulatordescription"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], RegulatorComponent.prototype, "regulatordescription", void 0);
    RegulatorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-regulator',
            template: __webpack_require__("./assets/app/app/regulator/regulator.component.html"),
            styles: [__webpack_require__("./assets/app/app/regulator/regulator.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__regulator_service__["a" /* RegulatorService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], RegulatorComponent);
    return RegulatorComponent;
}());



/***/ }),

/***/ "./assets/app/app/regulator/regulator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegulatorService; });
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
var RegulatorService = /** @class */ (function () {
    function RegulatorService(http) {
        this.http = http;
    }
    RegulatorService.prototype.saveRegulator = function (regCreate) {
        return this.http.post("http://localhost:1337/createRegulator", regCreate, httpOptions);
    };
    RegulatorService.prototype.updateRegulator = function (regUpdate) {
        return this.http.post("http://localhost:1337/updateRegulator", regUpdate, httpOptions);
    };
    RegulatorService.prototype.getRegulatorById = function (regId) {
        return this.http.get("http://localhost:1337/findRegulator" + "/" + regId);
    };
    RegulatorService.prototype.deleteRegulatorById = function (regId) {
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.request('delete', 'http://localhost:1337/destroyregulator', { body: { regulator_id: regId }, headers: httpHeaders, responseType: 'text' });
    };
    RegulatorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], RegulatorService);
    return RegulatorService;
}());



/***/ }),

/***/ "./assets/app/app/state/state.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/state/state.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"!correct\">\r\n    <div class=\"widget-heading\">\r\n        <h3 class=\"widget-title\">State Management</h3>   \r\n    </div>\r\n    <div class=\"form-group\">     \r\n        <div class=\"col-sm-offset-3 col-sm-9\">\r\n            <button id=\"createstate\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\" (click)=\"toggle()\">create</button>\r\n\r\n        </div>\r\n    </div>\r\n    <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\r\n        <thead>\r\n            <tr>\r\n                <th style=\"width:15%\" class=\"text-center\">Name</th>\r\n                <th style=\"width:15%\" class=\"text-center\">Description</th>\r\n                <th style=\"width:15%\" class=\"text-center\">State Code</th>\r\n                <th style=\"width:15%\" class=\"text-center\">Country</th>\r\n                <th style=\"width:30%\" class=\"text-center\">Operation</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody id=\"state-list-table\">         \r\n            <tr *ngFor=\"let state of stateResponse; let i = index\">        \r\n                <!-- ngfor goes here  -->\r\n                <td class=\"text-center\">\r\n                    {{state.name}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    {{state.description}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    {{state.state_code}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    {{state.cname}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    <div id=\"hide\">\r\n                        <span id=\"tocreatestate\" class=\"published\">\r\n                            <a class=\"tooltips\">         \r\n                                <span>\r\n                                    <button type=\"button\" (click)=\"loadStateToEdit(state.id)\">Edit</button>\r\n                                </span>\r\n                                <img src=\"/images/edit.png\" />\r\n                            </a>\r\n                        </span>\r\n                        <span class=\"delete-state\" data-toggle=\"modal\" data-target=\"\">\r\n                            <a class=\"tooltips\">\r\n                                <span>\r\n                                    <td>\r\n                                        <button type=\"button\" (click)=\"deleteState(state.id)\">Delete</button>\r\n                                    </td>\r\n                                </span>\r\n                                <img src=\"/images/delete.png\" />\r\n                            </a>\r\n                        </span>\r\n                    </div>\r\n                    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"\">\r\n                        <div role=\"document\" class=\"modal-dialog modal-sm\">\r\n                            <div class=\"modal-content\">\r\n                                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\r\n                                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\r\n                                        <span aria-hidden=\"true\">×</span>\r\n                                    </button>\r\n                                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">State Delete</h4>\r\n                                </div>\r\n                                <div class=\"modal-body\">\r\n                                    <p>Do you want to delete?</p>\r\n                                </div>\r\n                                <div class=\"modal-footer\">\r\n                                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\r\n                                    <button type=\"button\" id=\"deleteState\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n    <div id=\"findStatus\"></div>\r\n    <div class=\"user_load\">\r\n        <div id=\"loadMore\"></div>\r\n    </div>\r\n</ng-container>\r\n<ng-container *ngIf=\"correct\">\r\n    <div class=\"col-md-7\">\r\n        <div class=\"widget\">\r\n            <div class=\"widget-heading\">\r\n                <h3 class=\"widget-title\">State Set Up</h3>\r\n            </div>\r\n            <div class=\"widget-body\">\r\n                <form class=\"form-horizontal\" [formGroup]=\"formdata\" (ngSubmit)=\"onClickSubmit(formdata.value)\">\r\n                    <div class=\"form-group\">\r\n                        <label class=\"col-sm-3 control-label\">Name</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"stateName\" [(ngModel)]=\" stateInterface.name\" #statename />\r\n                            <div id=\"state_name_error\" class=\"state_name_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <label class=\"col-sm-3 control-label\">Description</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"stateDescription\" [(ngModel)]=\" stateInterface.description\" #statedescription\r\n                            />\r\n                            <div id=\"state_description_error\" class=\"state_description_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"form-group\">\r\n                        <label class=\"col-sm-3 control-label\">State Code</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <input type=\"text\" class=\"form-control\" maxlength=\"3\" formControlName=\"stateCode\" [(ngModel)]=\" stateInterface.countrycode\" #statecode\r\n                            />\r\n                            <div id=\"state_code_error\" class=\"state_code_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>                                               \r\n           \r\n                    <div class=\"form-group\">                        \r\n                        <label for=\"selectGeography\" class=\"col-sm-3 control-label\">Geography</label>\r\n                        <div class=\"col-sm-9\">                                                                  \r\n                            <select *ngIf=\"GeographyResponse\" class=\"form-control\" formControlName=\"stateGeography\" [(ngModel)]=\"optionSelectedGeography\" (change)='onOptionsSelectedGeo($event)'\r\n                                #selectGeography>                                                                     \r\n                                <option value=\"0\">Select Geography</option>   \r\n                                <option *ngFor='let option of GeographyResponse' [value]=\"option.id\">{{option.name}}</option>\r\n                            </select>\r\n                            <div id=\"geo_error\" class=\"reg_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>              \r\n                    <div class=\"form-group\">\r\n                        <label for=\"selectCountry\" class=\"col-sm-3 control-label\">Country</label>\r\n                        <div class=\"col-sm-9\">\r\n                            <select class=\"form-control\" formControlName=\"stateCountry\" [(ngModel)]=\"optionSelectedCountry\" (change)='onOptionsSelectedCountry($event)'\r\n                                #selectCountry>\r\n                                <option *ngIf=\"!optionSelectedGeography\" value=\"0\">Select Country</option>                                                                           \r\n                                <option *ngFor='let cout of countryVal' [value]=\"cout.gid\">{{cout.name}}</option>\r\n                            </select>\r\n                            <div id=\"country_error\" class=\"reg_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                        </div>\r\n                    </div>                            \r\n   \r\n                    <div class=\"form-group\">       \r\n                        <div class=\"col-sm-offset-3 col-sm-9\">  \r\n                            <button *ngIf=\"!stateIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">CREATE</button>\r\n                            <button *ngIf=\"stateIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">UPDATE</button>\r\n                            <button id=\"cancel\" class=\"btn btn-outline btn-black\">Cancel</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>   \r\n</ng-container>"

/***/ }),

/***/ "./assets/app/app/state/state.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state_service__ = __webpack_require__("./assets/app/app/state/state.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StateComponent = /** @class */ (function () {
    function StateComponent(http, stateService, renderer, elem, _router) {
        this.http = http;
        this.stateService = stateService;
        this.renderer = renderer;
        this.elem = elem;
        this._router = _router;
        this.stateIdToUpdate = null;
        this.show = false;
        this.correct = false;
        this.optionSelectedGeography = 0;
        this.optionSelectedCountry = 0;
        this.countryVal = [];
        this.stateVal = [];
        this.stateInterface = {
            name: '',
            description: '',
            state_code: '',
            gid: 0,
            country_id: 0
        };
    }
    StateComponent.prototype.ngOnInit = function () {
        this.formdata = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            stateName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            stateDescription: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            stateCode: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            stateGeography: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            stateCountry: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]("")
        });
        this.onstateLoad();
        this.onGeographyLoad();
        this.onCountryLoad();
    };
    StateComponent.prototype.toggle = function () {
        this.correct = !this.correct;
        this._router.navigate(['/stateCreate']);
    };
    StateComponent.prototype.onstateLoad = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/states', { headers: headers }).subscribe(function (data) {
            _this.stateResponse = data;
            console.log(_this.stateResponse, "state Response");
        });
    };
    StateComponent.prototype.onGeographyLoad = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/geographys', { headers: headers }).subscribe(function (data) {
            _this.GeographyResponse = data;
            console.log(_this.GeographyResponse, "Geography Response");
        });
    };
    StateComponent.prototype.onCountryLoad = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/country', { headers: headers }).subscribe(function (data) {
            _this.CountryResponse = data;
            console.log(_this.CountryResponse, "CountryResponse");
        });
    };
    StateComponent.prototype.ngAfterViewInit = function () {
    };
    StateComponent.prototype.onClickSubmit = function (data) {
        console.log("on submit");
    };
    StateComponent.prototype.saveEdit = function () {
        var _this = this;
        this.refStateName = this.statename.nativeElement.value;
        this.refStateDescription = this.statedescription.nativeElement.value;
        this.refStateCode = this.statecode.nativeElement.value;
        this.refStateGeography = this.selectGeography.nativeElement;
        var optGeo = this.refStateGeography.options[this.refStateGeography.selectedIndex];
        this.refGeo_Value = optGeo.value;
        this.refGeo_Text = optGeo.text;
        this.refStateCountry = this.selectCountry.nativeElement;
        var optCou = this.refStateCountry.options[this.refStateCountry.selectedIndex];
        this.refCou_Value = optCou.value;
        this.refCou_Text = optCou.text;
        this.fetchGeography = this.GeographyResponse;
        this.fetchCountry = this.CountryResponse;
        console.log("fetch response", this.fetchGeography);
        var stateInterface = {
            name: this.refStateName,
            description: this.refStateDescription,
            state_code: this.refStateCode,
            gid: this.refGeo_Value,
            country_id: this.refCou_Value
        };
        var stateInterfaceUpdate = {
            name: this.refStateName,
            description: this.refStateDescription,
            state_code: this.refStateCode,
            geography_id: this.refGeo_Value,
            country_id: this.refCou_Value
        };
        if (this.stateIdToUpdate === null) {
            this.stateService.saveState(stateInterfaceUpdate).subscribe(function (mySave) {
                _this.saveState = mySave;
                console.log(_this.saveState);
                _this.onstateLoad();
                _this._router.navigate(['/stateList']);
                _this.show = !_this.show;
            });
            console.warn("am in create");
        }
        else {
            stateInterfaceUpdate.id = this.stateIdToUpdate;
            this.stateService.getStateAll(stateInterfaceUpdate).subscribe(function (successCode) {
                _this.onstateLoad();
            });
            console.warn("am in update");
            this.correct = !this.correct;
        }
    };
    StateComponent.prototype.loadStateToEdit = function (stateId) {
        var _this = this;
        this.stateService.getStateById(stateId).subscribe(function (sta) {
            _this.stateIdToUpdate = sta[0].id;
            console.log(_this.stateIdToUpdate);
            _this.formdata.setValue({ stateName: sta[0].name, stateDescription: sta[0].description, stateCode: sta[0].state_code, stateGeography: sta[0].gid, stateCountry: sta[0].country_id });
        });
        this.correct = !this.correct;
    };
    StateComponent.prototype.deleteState = function (stateId) {
        var _this = this;
        this.stateService.deleteStateById(stateId)
            .subscribe(function (sta) {
            _this.onstateLoad();
        });
        this._router.navigate(['/stateList']);
    };
    StateComponent.prototype.onOptionsSelectedGeo = function (event) {
        this.fetchGeography = this.stateResponse;
        console.log("fetch response", this.fetchGeography);
        this.fetchCountry = this.CountryResponse;
        console.log('fetch country response', this.CountryResponse);
        var geography_id = event.target.value;
        this.refGeo_Text = event.target.options[event.target.selectedIndex].text;
        this.optionSelectedGeography = geography_id;
        this.optionSelectedCountry = 0;
        this.stateVal = [];
        this.countryVal = this.fetchCountry.filter(function (item) {
            console.log("country id", item.gid, "geography id", geography_id);
            return item.gid === Number(geography_id);
        });
    };
    StateComponent.prototype.onOptionsSelectedCountry = function (event) {
        var country_id = event.target.value;
        this.refCou_Text = event.target.options[event.target.selectedIndex].text;
        this.optionSelectedCountry = country_id;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("statename"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], StateComponent.prototype, "statename", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("statedescription"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], StateComponent.prototype, "statedescription", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("statecode"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], StateComponent.prototype, "statecode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("selectGeography"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], StateComponent.prototype, "selectGeography", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("selectCountry"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], StateComponent.prototype, "selectCountry", void 0);
    StateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-state',
            template: __webpack_require__("./assets/app/app/state/state.component.html"),
            styles: [__webpack_require__("./assets/app/app/state/state.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__state_service__["a" /* StateService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], StateComponent);
    return StateComponent;
}());



/***/ }),

/***/ "./assets/app/app/state/state.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StateService; });
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
var StateService = /** @class */ (function () {
    function StateService(http) {
        this.http = http;
    }
    StateService.prototype.saveState = function (stateCreate) {
        return this.http.post("http://localhost:1337/createstate", stateCreate, httpOptions);
    };
    StateService.prototype.getStateById = function (stateId) {
        return this.http.get("http://localhost:1337/findstate" + "/" + stateId);
    };
    StateService.prototype.getStateAll = function (stateAll) {
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.post("http://localhost:1337/updatestate", stateAll, httpOptions);
    };
    StateService.prototype.deleteStateById = function (stateId) {
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.request('delete', 'http://localhost:1337/destroystate', { body: { state_id: stateId }, headers: httpHeaders, responseType: 'text' });
    };
    StateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], StateService);
    return StateService;
}());



/***/ }),

/***/ "./assets/app/app/subdocumentmanagement/subdocumentmanagement.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./assets/app/app/subdocumentmanagement/subdocumentmanagement.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"!correct\">\r\n    <div class=\"widget-heading\">\r\n        <h3 class=\"widget-title\">Sub Document Management</h3>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <div class=\"col-sm-offset-3 col-sm-9\">\r\n            <button id=\"createSubDoc\" class=\"btn btn-success btn-rounded btn-block\" style=\"width: 150px;\" (click)=\"toggle()\">create</button>\r\n        </div>\r\n    </div>\r\n    <table border=\"0\" id=\"order-table\" style=\"width: 100%\" class=\"table table-hover dt-responsive nowrap\">\r\n        <thead>\r\n            <tr>\r\n                <th class=\"text-center\">Name </th>\r\n                <th class=\"text-center\">Description</th>\r\n                <th class=\"text-center\">Document Name </th>\r\n                <th class=\"text-center\">Operation</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody id=\"subDocList\">\r\n            <tr *ngFor=\"let sdm of subDocMgtResponse; let i = index\">\r\n                <td class=\"text-left\">\r\n                    {{sdm.name}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    {{sdm.description}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    {{sdm.docname}}\r\n                </td>\r\n                <td class=\"text-center\">\r\n                    <div>\r\n                        <span id=\"editSubDoc\" class=\"\">\r\n              <a class=\"tooltips\">\r\n                <span>\r\n                  <button type=\"button\" (click)=\"loadArticleToEdit(sdm.id)\">Edit</button>\r\n                </span>\r\n                        <img src=\"/images/edit.png\" />\r\n                        </a>\r\n                        </span>\r\n                        <span class=\"delete-subDoc\" data-toggle=\"modal\" data-target=\"\">\r\n              <a class=\"tooltips\">\r\n                <span>\r\n                  <button type=\"button\" (click)=\"deleteArticle(sdm.id)\">Delete</button>\r\n                </span>\r\n                        <img src=\"/images/delete.png\" />\r\n                        </a>\r\n                        </span>\r\n                    </div>\r\n                    <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"\">\r\n                        <div role=\"document\" class=\"modal-dialog modal-sm\">\r\n                            <div class=\"modal-content\">\r\n                                <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\r\n                                    <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                  </button>\r\n                                    <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Sub Document Delete</h4>\r\n                                </div>\r\n                                <div class=\"modal-body\">\r\n                                    <p>Do you want to delete?</p>\r\n                                </div>\r\n                                <div class=\"modal-footer\">\r\n                                    <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\">Close</button>\r\n                                    <button type=\"button\" data-dismiss=\"modal\" id=\"deleteSubDoc\" class=\"btn btn-outline btn-primary-red\">Confirm</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n    <div id=\"findStatus\"></div>\r\n    <div class=\"user_load\">\r\n        <div id=\"loadMore\"></div>\r\n    </div>\r\n</ng-container>\r\n<ng-container *ngIf=\"correct\">\r\n    <div class=\"container\">\r\n        <div class=\"col-md-6\">\r\n            <div class=\"widget\">\r\n                <div class=\"widget-heading\">\r\n                    <h3 *ngIf=\"!subDocIdToUpdate\" class=\"widget-title\">Sub Document Create</h3>\r\n                    <h3 *ngIf=\"subDocIdToUpdate\" class=\"widget-title\">Edit Sub Document</h3>\r\n                </div>\r\n                <div class=\"widget-body\">\r\n                    <form class=\"form-horizontal\" [formGroup]=\"formdata\">\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-sm-3 control-label\">Name</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"subDocName\" [(ngModel)]=\" subDocInter.name\" #subDocname/>\r\n                                <div id=\"subDocName_error\" class=\"sub_doc_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-sm-3 control-label\">Description</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"text\" class=\"form-control\" formControlName=\"subDocDescription\" [(ngModel)]=\" subDocInter.description\" #subDocdescription/>\r\n\r\n                                <div id=\"subDoc_content_error\" style=\"font-size: 12px; color: #FF0000;\"></div>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <!-- <div class=\"form-group\">\r\n              <label for=\"selectDocument\" class=\"col-sm-3 control-label\">Document</label>\r\n              <div class=\"col-sm-9\">            \r\n                <select id=\"selectDocument\" class=\"form-control\">\r\n                </select>\r\n                <div id=\"doc_error\" class=\"doc_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n              </div>\r\n            </div> -->\r\n                        <div class=\"form-group\">\r\n                            <label for=\"selectDocument\" class=\"col-sm-3 control-label\">Document</label>\r\n                            <div class=\"col-sm-9\">\r\n                                <select class=\"form-control\" formControlName=\"subDocSelectDocument\" [(ngModel)]=\"optionSelected\" #selectDocument>                                                          \r\n                  <!-- <option value=\"0\"></option> -->                                                                                                                             \r\n                  <option *ngFor='let option of documentResponse' [value]=\"option.id\">{{option.name}}</option>        \r\n\r\n                </select>\r\n                                <div id=\"geo_error\" class=\"geo_error\" style=\"font-size: 12px; color: #FF0000; \"></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-sm-offset-3 col-sm-9\">\r\n                                <button *ngIf=\"!subDocIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">CREATE</button>\r\n                                <button *ngIf=\"subDocIdToUpdate\" class=\"btn btn-outline btn-success\" (click)=\"saveEdit()\">UPDATE</button>\r\n                                <button id=\"cancel\" class=\"btn btn-outline btn-black\">Cancel</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</ng-container>"

/***/ }),

/***/ "./assets/app/app/subdocumentmanagement/subdocumentmanagement.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubdocumentmanagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__subdocumentmanagement_service__ = __webpack_require__("./assets/app/app/subdocumentmanagement/subdocumentmanagement.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SubdocumentmanagementComponent = /** @class */ (function () {
    function SubdocumentmanagementComponent(http, subDocService, renderer, elem, _router) {
        this.http = http;
        this.subDocService = subDocService;
        this.renderer = renderer;
        this.elem = elem;
        this._router = _router;
        this.subDocIdToUpdate = null;
        this.show = false;
        this.correct = false;
        this.optionSelected = 0;
        this.subDocInter = {
            name: '',
            description: '',
            doc_id: 0,
            parent_id: 0
        };
    }
    SubdocumentmanagementComponent.prototype.ngOnInit = function () {
        this.formdata = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            subDocName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            subDocDescription: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
            subDocSelectDocument: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](""),
        });
        this.loadAllSubDocuments();
        this.loadDropDownDocumentst();
    };
    SubdocumentmanagementComponent.prototype.loadAllSubDocuments = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/getAllSubDoc', { headers: headers }).subscribe(function (data) {
            _this.subDocMgtResponse = data;
            console.log(data);
        });
    };
    SubdocumentmanagementComponent.prototype.loadDropDownDocumentst = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        this.http.get('http://localhost:1337/allDoctype', { headers: headers }).subscribe(function (data) {
            _this.documentResponse = data;
            console.log(data);
        });
    };
    SubdocumentmanagementComponent.prototype.toggle = function () {
        this.correct = !this.correct;
        this._router.navigate(['/subDocCreate']);
    };
    SubdocumentmanagementComponent.prototype.ngAfterViewInit = function () {
    };
    SubdocumentmanagementComponent.prototype.saveEdit = function () {
        var _this = this;
        this.subDoc_Name = this.subDocname.nativeElement.value;
        this.subDoc_Description = this.subDocdescription.nativeElement.value;
        var subDocLoadRef = this.selectDocument.nativeElement;
        var optSubDoc = subDocLoadRef.options[subDocLoadRef.selectedIndex];
        this.subdoc_Value = optSubDoc.value;
        this.subdoc_Text = optSubDoc.text;
        var subDocInter = {
            name: this.subDoc_Name,
            description: this.subDoc_Description,
            parent_id: this.subdoc_Value,
            doc_id: this.subdoc_Value
        };
        console.log("am save edit subdoc value", subDocInter.parent_id);
        console.log("am save edit subdoc value", subDocInter.doc_id);
        if (this.subDocIdToUpdate === null) {
            this.subDocService.saveSubDocument(subDocInter)
                .subscribe(function (mySave) {
                _this.saveSubDoc = mySave;
                console.log(_this.saveSubDoc);
                _this.loadAllSubDocuments();
                _this._router.navigate(['/subDocList']);
                _this.show = !_this.show;
            });
            console.warn("am in create");
        }
        else {
            subDocInter.id = this.subDocIdToUpdate;
            this.subDocService.SubDocumentUpdate(subDocInter).subscribe(function (successCode) {
                _this.loadAllSubDocuments();
            });
            console.warn("am in update");
            this.correct = !this.correct;
        }
    };
    SubdocumentmanagementComponent.prototype.loadArticleToEdit = function (subDocId) {
        var _this = this;
        this.subDocService.getSubDocumentById(subDocId).subscribe(function (subdoc) {
            _this.subDocIdToUpdate = subdoc[0].id;
            console.log(_this.subDocIdToUpdate);
            _this.formdata.setValue({ subDocName: subdoc[0].name, subDocDescription: subdoc[0].description, subDocSelectDocument: subdoc[0].parent_id });
        });
        this.correct = !this.correct;
    };
    SubdocumentmanagementComponent.prototype.deleteArticle = function (subDocId) {
        var _this = this;
        this.subDocService.deleteSubDocumentById(subDocId)
            .subscribe(function (subdoc) {
            _this.loadAllSubDocuments();
        });
        this._router.navigate(['/subDocList']);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("subDocname"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], SubdocumentmanagementComponent.prototype, "subDocname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("subDocdescription"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], SubdocumentmanagementComponent.prototype, "subDocdescription", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])("selectDocument"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], SubdocumentmanagementComponent.prototype, "selectDocument", void 0);
    SubdocumentmanagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-subdocumentmanagement',
            template: __webpack_require__("./assets/app/app/subdocumentmanagement/subdocumentmanagement.component.html"),
            styles: [__webpack_require__("./assets/app/app/subdocumentmanagement/subdocumentmanagement.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__subdocumentmanagement_service__["a" /* SubdocumentmanagementService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]])
    ], SubdocumentmanagementComponent);
    return SubdocumentmanagementComponent;
}());



/***/ }),

/***/ "./assets/app/app/subdocumentmanagement/subdocumentmanagement.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubdocumentmanagementService; });
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
var SubdocumentmanagementService = /** @class */ (function () {
    function SubdocumentmanagementService(http) {
        this.http = http;
    }
    SubdocumentmanagementService.prototype.saveSubDocument = function (subDocCreate) {
        return this.http.post("http://localhost:1337/saveSubDocUrl", subDocCreate, httpOptions);
    };
    SubdocumentmanagementService.prototype.getSubDocumentById = function (subDocId) {
        return this.http.get("http://localhost:1337/findBySubDoc" + "/" + subDocId);
    };
    SubdocumentmanagementService.prototype.SubDocumentUpdate = function (subDocId) {
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.post("http://localhost:1337/updateSubDoc", subDocId, httpOptions);
    };
    SubdocumentmanagementService.prototype.deleteSubDocumentById = function (subDocId) {
        var httpHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]()
            .set('Accept', 'application/json');
        return this.http.request('delete', 'http://localhost:1337/destroySubDoc ', { body: { id: subDocId }, headers: httpHeaders, responseType: 'text' });
    };
    SubdocumentmanagementService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], SubdocumentmanagementService);
    return SubdocumentmanagementService;
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