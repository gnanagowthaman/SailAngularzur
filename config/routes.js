/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
//  '/': {
//     view: 'homepage'    
//   },
  '/': {
   view: 'login',locals:{message:''}  
  },        
  
  'get /forgotpass' : {
    view :'forgot-password'
  },
  
  '/logout': 'AuthController.logout',
  '/sessionExpired' : 'AuthController.redirectToLogin',

  'GET /adminDashboard'   : 'HomeController.adminDashboard',
  'GET /userDashboard'    : 'HomeController.userDashboard',
  'POST /alertnotification': 'AlertNotificationController.send',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'POST /locallogin': 'AuthController.locallogin',
  'POST /createUser' : 'UserController.create',
  'POST /updateUser' : 'UserController.update',
  'GET /user/:id' : 'UserController.findOne',
  'GET /findRegByGeo4Create' : 'RegulationController.findByGeo4Create',
  'GET /findByGeo4Edit/:id' : 'RegulationController.findByGeo4Edit',
  'GET /find' : 'UserController.find',
  'GET /geography' : 'GeoController.find',
  'GET /regulation' : 'RegulationController.find',
  'GET /documentl' : 'DocumentController.find',
  'GET /domain' : 'DomainController.find',
  'GET /findRegulationData' : 'RegulationController.findRegulationData', //this is used in file upload management -Louis
  'GET /xlsx' : 'XlsxController.find',
  'GET /docx' : 'DocPdfController.find',
  'POST /uploadFile' : 'FileUploadController.uploadFile',
  'GET /document' : 'DocumentController.findByUserAccess',
  'PATCH /document/:fid' : 'DocumentController.publish',
  'DELETE /document/:fid' : 'DocumentController.destroy',
  'POST /passreset'       : 'UserController.reset',
  'GET  /checkuser'       : 'UserController.checkSession',


  'GET /mdomain' : 'DomainController.getAllnew',
  'GET /mregulation' : 'RegulationController.getAll',
  'GET /mdocument' : 'DocumentController.getAll',
  'GET /mgeography' : 'GeoController.getAll',
  //added by Louis
  'GET /mcountry' : 'CountryController.getallcountries',
  'GET /mstate' : 'StateController.getAll',
  // 'GET /msubdocument' : 'SubDocumentController.getAll', old design
  'GET /msubdocument' : 'DocTypeController.getAllSubDocuments',  
  'GET /mregulator'   :'RegulatorController.getAllRegulator',

  'POST /sessiongen':'UserController.sessionGen',
  'POST /createDomain' : 'DomainController.create',
  'POST /updateDomain' : 'DomainController.update',
  'GET  /findDomain/:id'   : 'DomainController.findDomain',
  'GET  /findGeoByDomainId/:id' : 'DomainController.findGeoByDomainId',
  'POST /createGeo' : 'GeoController.create',
  'POST /updateGeo' : 'GeoController.update',
  'GET /findGeography/:id' : 'GeoController.findGeography',
  //'DELETE /geography/:id' : 'GeoController.destroy',
  'GET /doctype' : 'GeoController.find', 
  //'DELETE /domain/:id' : 'DomainController.destroy',
  'GET /activeDomain' : 'DomainController.getAll',
  'POST /createDocType' : 'DocTypeController.create',
  'POST /updateDocType' : 'DocTypeController.update',
  'GET /findDocType/:id' : 'DocTypeController.findDoctype',
  'GET /doctype' : 'DocTypeController.getDocuments',
  'GET /allDoctype' : 'DocTypeController.getAllDocuments',
  'GET /firstLevelSubDoctype' : 'DocTypeController.getfirstLevelSubDocuments',
  //'DELETE /doctype/:id' : 'DocTypeController.destroy',
  'GET /documents' : 'DocTypeController.getDocuments',
  'GET /regulations' : 'RegulationController.getRegulations',
  'POST /createRegulation':  'RegulationController.createRegulation',
  'POST /updateRegulation':  'RegulationController.updateRegulation',
  'GET /findRegulation/:id' : 'RegulationController.findRegulation',
  'DELETE /regulations/:id' : 'RegulationController.destroy',
  'GET /findDocByRegId/:id' : 'RegulationController.findDocByRegId',
  'GET /finDocByRegulationId/:id' : 'RegulationController.finDocByRegulationId',
  'GET /findregBygeoId/:id':'GeoController.findregBygeoId',
  'GET /findgeo/:id':'GeoController.findgeo',
  'GET /domains' : 'RegulationController.getDomains',
  'GET /geographys' : 'RegulationController.getGeographys',
  'GET /finDomainByRegulationId/:id' : 'RegulationController.finDomainByRegulationId',
  'GET /fingeoByRegulationId/:id' : 'RegulationController.fingeoByRegulationId',
  'GET  /findDomains/:id'   : 'RegulationController.findDomain',
  'GET /findGeographys/:id' : 'RegulationController.findGeography',
  'DELETE /activeDomain/:id' : 'DomainController.destroy',
  'GET /editregulation' : 'RegulationController.editregulation',
  'GET /findReggeodomdoc/:id' : 'RegulationController.findReggeodomdoc',
  'DELETE /deleteregulation' : 'RegulationController.deleteregulation',
  'DELETE /destroy' : 'RegulationController.destroy',
  'GET /regulation-status' : 'RegulationController.regulationStatus',

  'GET /document/:gid/:cntid/:sid/:did/:rid/:rlid/:docid/:sdocid' : 'DocumentController.findOne',
  'GET /library' : 'DashBoardController.findLibrary',
  'GET /news' : 'DashBoardController.findNewsbyGeo',

  'DELETE /destroydomain':'DomainController.destroy',

  'POST /passwordChange'       : 'UserController.passwordChange',
  'GET /findSubscription'      :'DocumentController.find',
  'POST /uploadProfileImage'   :'FileUploadController.uploadProfileImage',
  'GET /malert' : 'AlertController.find',
  'GET /search' : 'SearchController.search',
  'GET /Adsearch' : 'SearchController.Advancesearch',
  'GET /subscription' : 'SubDocumentController.findSubscription', 
  'DELETE /destroygeography' :'GeoController.destroy',
  'DELETE /destroydocument' : 'DocTypeController.destroy',

  'GET /getAllnews'              :'NewsController.getAllnews',
  'POST /saveNewsUrl'            :'NewsController.create',
  'POST /updateNews'             :'NewsController.update',
  'GET /findByNews/:id'          :'NewsController.findByNews',
  'GET /findGeoByNewsId/:id'     :'NewsController.findGeoByNewsId',
  'DELETE /destroynews'          :'NewsController.destroy',

  //'POST /createcountry'          :'CountryController.create',
  //'GET /country'                 : 'CountryController.find',
  //===================================================================//
    'GET /regulator' : 'RegulatorController.find',
   'POST /createRegulator' : 'RegulatorController.create',
  'POST /updateRegulator' : 'RegulatorController.update',
  'GET /findRegulator/:id':'RegulatorController.findRegulator',
  'GET /findregByregulatorId/:id'     :'RegulatorController.findregByregulatorId',
   'DELETE /destroyregulator'          :'RegulatorController.destroy',
    //'GET /Regulator'                 : 'RegulatorController.find',
  
   'GET /countries' : 'CountryController.getall',
   'POST /createCountry' : 'CountryController.create',
  'POST /updateCountry' : 'CountryController.update',
  'GET /findcountry/:id':'CountryController.findcountry',
  'GET /findregBycountryId/:id'     :'CountryController.findregBycountryId',
   'DELETE /destroycountry'          :'CountryController.destroy',
  'GET /country'                 : 'CountryController.find',


   'GET /states' : 'StateController.find',
   'POST /createState' : 'StateController.create',
  'POST /updateState' : 'StateController.update',
  'GET /findstate/:id':'StateController.findstate',
  'GET /findregBystateId/:id'     :'StateController.findregBystateId',
   'DELETE /destroystate'          :'StateController.destroy',
  //'GET /state'                 : 'StateController.find',
  'GET /editDomain'              : 'DomainController.editDomain',
  'POST /saveSubDocUrl'          :'SubDocumentController.create',
  'GET /getAllSubDoc'            :'SubDocumentController.getAllSubDoc',
  'DELETE /destroySubDoc'        :'SubDocumentController.destroy',
  'GET /findBySubDoc/:id'        :'SubDocumentController.findBySubDoc',
  'POST /updateSubDoc'           :'SubDocumentController.update',
  'DELETE /deletedomain'          :'DomainController.deletedomain',
  'GET /subDocument'              :'SubDocumentController.subDocument',
  //'GET /regulator'                :'RegulatorController.getAll',
  'GET /findRegbygeostate'        :'UserController.findRegbygeostate',
  'DELETE /deleteuser'            :'UserController.deleteuser',
 // 'GET /mcountry'                 :'CountryController.findAll',
  'GET /findsearch'               :'RegulationController.findsearch',
  'GET /alert'        :'AlertTypeController.getAll', 
  'GET /regulationAlert'        :'RegulationController.getAllforAlert',
 'POST /createalert'          :'AlertTypeController.create',
 'GET /findAlert'          :'AlertTypeController.findAlerts',
 'POST /sms'              : 'smsController.get',
 'DELETE /destroyAlert'   :'AlertTypeController.destroy',
 'GET  /findGeoByAlertId/:id' : 'AlertTypeController.findGeoByAlertId',
 'GET  /findAlert/:id'   : 'AlertTypeController.findAlert',
 'GET  /findCountryByAlertId/:id'   : 'AlertTypeController.findCountryByAlertId',
 'GET  /findStateByAlertId/:id' : 'AlertTypeController.findStateByAlertId',
 'GET  /findDomainByAlertId/:id' : 'AlertTypeController.findDomainByAlertId',
 'GET  /findRegulatorByAlertId/:id' : 'AlertTypeController.findRegulatorByAlertId',
 'GET  /findRegulationByAlertId/:id' : 'AlertTypeController.findRegulationByAlertId',
 'POST /editAlert'          :'AlertTypeController.update',
  'GET /getRegbygeostate'        :'UserController.getRegbygeostate',
  'GET /findalertbygeo'               :'AlertTypeController.findalertbygeo',
  'GET /stateAlert'               :'StateController.stateAlert',
  'POST /Useralert'               :'UserController.alertchange',
  'POST /updateAlertStatus'        : 'AlertTypeController.updateUserAlertStatus',
  'GET /getUserAlertCount'          : 'AlertTypeController.getUserAlertCount',
  'POST /archiveAll'               : 'AlertTypeController.archiveAll',
  'GET /findAlertArchive'          : 'AlertTypeController.findAlertArchive',
  'POST /archive/:alert_id'                  : 'AlertTypeController.archive',
  'GET  /findDAlert'                : 'AlertTypeController.findDAlert',
  'POST /updateDate' : 'AlertTypeController.updateDate',
  'POST /updateRegulationStatus' : 'RegulationController.updateRegulationStatus',
  'POST /updateRegStatus' : 'RegulationController.updateRegStatus',
  'GET  /documentType'  : 'DocTypeController.documentType',
  'GET  /getSpecialDoc' : 'DocTypeController.documentType',
  'POST /uploadSpecialFile' : 'FileUploadController.uploadSpecialFile',
  'GET /spdocument'      :'DocumentController.findAllSpecialDocFiles',
  'PATCH /spdocument/:spid' : 'DocumentController.publishSPDoc',
  'DELETE /spdocument/:spid' : 'DocumentController.destroySPDoc',
  'GET /getSpclDocData/:spid':'DocumentController.getSpclDocData',
  'POST /uploadSpecialFileEdit' : 'FileUploadController.uploadSpecialFileEdit',
  'GET /trail_check':'TrailController.find',
  'DELETE /destroyAlertUser'   :'AlertNotificationController.destroyAlertUser',
  'GET /spdocument/:fid' : 'DocumentController.findSPOne',
};



