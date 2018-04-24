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

module.exports = ""

/***/ }),

/***/ "./assets/app/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"alert-box success\">\n\n\n</div>\n<div class=\"alert-box failure\"></div>\n<div class=\"alert-box warning\"></div>\n<!-- Header start-->\n<div>\n  <a href=\"javascript:;\" role=\"button\" class=\"hamburger-menu pull-left\">\n    <span></span>\n  </a>\n  <div>\n    <div style=\"float:right; overflow: visible\" align=\"top\">\n      <h4 class=\"media-heading fs-16\"></h4>\n      <div class=\"dropdown\">\n        <a id=\"dropdown-status\" href=\"javascript:;\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"true\"\n          class=\"dropdown-toggle\">\n          <span class=\"status bg-success\"></span>\n          <a href=\"/logout\">Logout</a>\n        </a>\n      </div>\n    </div>\n    <div class=\"image-container234\" style=\"position:absolute; top:20px;right:180px\">\n      <div id=\"esp-user-profile\" data-percent=\"66\" style=\"height: 56px; width: 56px; line-height: 40px; padding: 8px; cursor: pointer;\"\n        class=\"easy-pie-chart\">\n        <img src=\"profile_image_link\" alt=\"\" class=\"avatar img-circle\" width=\"42\" height=\"42\" align=\"top\">\n      </div>\n    </div>\n  </div>\n  <div class=\"zurik-con\" style=\"height: 56px; width: 56px; line-height: 40px; padding: 8px;\">\n    <a style=\"left: 100px; top: 20px;\" href=\"/adminDashboard\" class=\"brand\">ZURIK</a>\n  </div>\n</div>\n<!-- Header end-->\n<div class=\"main-container\">\n  <!-- Main Sidebar start-->\n  <div data-mcs-theme=\"minimal-dark\" class=\"main-sidebar mCustomScrollbar\">\n    <ul id=\"usertest\" class=\"list-unstyled navigation mb-0\" style=\"padding-top:30px;\">\n      <li class=\"sidebar-category\"></li>\n      <li id=\"dashboard_click\" class=\"panel\">\n        <a id=\"accdboard\" role=\"button\" data-toggle=\"collapse\" data-parent=\".navigation\" href=\"#collapse1\" aria-expanded=\"false\"\n          aria-controls=\"collapse1\" class=\"bubble active collapsed\">\n          <i class=\"ion-ios-home-outline bg-purple\"></i>\n          <span class=\"sidebar-title accdboard\">Dashboard</span>\n          <span class=\"badge bg-danger\">9</span>\n        </a>\n      </li>\n      <ul id=\"collapse1\" class=\"list-unstyled collapse\">\n        <li>\n          <a id=\"usermgnt\">User Management</a>\n        </li>\n\n        <li>\n          <a id=\"geomgnt\">Geography Management</a>\n        </li>\n        <li>\n          <a id=\"countrymgnt\">Country Management</a>\n        </li>\n        <li>\n          <a id=\"statemgnt\">State Management</a>\n        </li>\n        <li>\n          <a id=\"dommgnt\">Domain Management</a>\n        </li>\n        <li>\n          <a id=\"regulatormgnt\">Regulator Management</a>\n        </li>\n        <li>\n          <a id=\"regmgnt\">Regulation Management</a>\n        </li>\n        <li>\n          <a id=\"doctmgnt\">Document Management</a>\n        </li>\n        <li>\n          <a id=\"subdocMgnt\">Sub Document Management</a>\n        </li>\n        <li>\n          <a id=\"docmgnt\">Document Upload Management</a>\n        </li>\n        <li>\n          <a id=\"newsMgnt\">News Management</a>\n        </li>\n        <li>\n          <a id=\"alertMgnt\">Alert Management</a>\n        </li>\n      </ul>      \n  </div>\n  <ul>        \n      <li id=\"user_click\" class=\"panel\">\n        <a role=\"button\" id=\"profileMgnt\" data-toggle=\"collapse\" data-parent=\".navigation\" href=\"#collapse12\" aria-expanded=\"false\"\n          aria-controls=\"collapse12\" class=\"bubble collapsed\">\n          <i class=\"ion-ios-person-outline bg-success\"></i>\n          <span class=\"sidebar-title\">Profile</span>\n          <span class=\"badge bg-danger\"></span>\n        </a>\n           <ul><li id=\"collapse12\" class=\"list-unstyled collapse\"></li></ul>   \n      </li>     \n    </ul> \n  <!-- Main Sidebar end-->\n  <div class=\"page-container\">\n    <div class=\"page-content container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"widget no-border\">\n            <div id=\"page-section\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- add by Louis for modal dialog to leave the curent page -->\n\n  <div tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" class=\"modal fade bs-example-modal-sm\" id=\"exitBrowserDialog\">\n    <div role=\"document\" class=\"modal-dialog modal-sm\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header bg-black no-border\" style=\"background-color: #cc0000;\">\n          <button type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\" class=\"close\">\n            <span aria-hidden=\"true\">×</span>\n          </button>\n          <h4 id=\"mySmallModalLabel\" class=\"modal-title\">Leave Current Page</h4>\n        </div>\n        <div class=\"modal-body\">\n          <p>Do you want to leave current page?</p>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\" id=\"leaveCurrentPageCancel\">Cancel</button>\n          <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-outline btn-primary-red\" id=\"leaveCurrentPageOK\">Leave</button>\n\n        </div>\n      </div>\n    </div>\n  </div>\n</div>             "

/***/ }),

/***/ "./assets/app/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./assets/app/app/app.component.html"),
            styles: [__webpack_require__("./assets/app/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./assets/app/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./assets/app/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* enableProdMode */])();
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