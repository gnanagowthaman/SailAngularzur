// Router
var admin = admin || {};

admin.AdminAppRouter = Backbone.Router.extend({

    routes:{
        "": "manageUsers",
        'manageUsers': 'manageUsers',
        "renderUserForm": "renderUserForm",
        "renderAdminUserForm": "renderAdminUserForm",
        "renderEditUserForm/:id": "renderEditUserForm",
        "renderEditAdminUserForm/:id": "renderEditAdminUserForm",        
        "manageDocuments" : "manageDocuments",
        "renderDocumentListTable" : "renderDocumentListTable",
        "renderFileUploadPage" : "renderFileUploadPage",
        "manageDomain" :"manageDomain",
        "renderDomainForm" : "renderDomainForm",
        "renderEditDomainForm/:id":"renderEditDomainForm",
        "manageGeo":"manageGeo",
        "renderGeoForm":"renderGeoForm",
        "renderEditGeoForm/:id":"renderEditGeoForm",
        "manageDocType":"manageDocType",
        "renderDocTypeForm":"renderDocTypeForm",
        "renderEditDoctypeForm/:id":"renderEditDoctypeForm",
        "manageReg":"manageReg",
        "renderCreateRegulationPage" : "renderCreateRegulationPage",
        "renderEditRegulationPage/:id":"renderEditRegulationPage",
        "manageregulationedit":"regulationeditListTable",
        "profileManagement":"renderProfileManagement",
        "newsManagement" :"renderNewsManagement",
        "renderNewsForm" :"renderNewsForm",
        "renderEditNewsForm/:id"   :"renderEditNewsFormView",
        "managecountry" : "managecountry",
        "rendercountryForm":"rendercountryForm",    
        "renderEditCountryForm/:id":"renderEditCountryForm",
    
         "managestate" : "managestate",
        "renderstateForm":"renderstateForm",    
        "renderEditStateForm/:id":"renderEditStateForm",
    
        "managedomainedit" : "domaineditListTable",
        "manageDomainPage" : "manageDomainPage",
        "manageRegulator":"manageRegulator",
        "renderRegulatorForm":"renderRegulatorForm",
        "renderEditRegulatorForm/:id":"renderEditRegulatorForm",
        "subDocManagement" : "renderSubDocManagement",
       "renderSubDocForm" :"renderSubDocFormView", 
       "renderEditSubDocForm/:id" :"renderEditSubDocFormView",
       "manageAlert"        :"manageAlert",
       "renderAlertForm"    : "renderAlertForm",
       "managealert"        : "managealert",
       "renderEditAlertForm/:id" : "renderEditAlertForm",
        "renderLifeTrackerManagementPage" : "renderLifeTrackerManagementPage",
        "renderEditSpclDocForm/:id/:file_id"  : "renderEditSpclDocForm"

    },

    initialize: function () {

    },			    

    manageUsers: function () {
    	console.log("inside routing:manageUsers");
        if (this.currentView) {
            console.log('currentView exist');
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        // this.currentView = new admin.UserListView({el: $( '#user-list-table' )});
        this.currentView = new admin.UserTablePageView({el: $( '#page-section' )});
    },

    renderUserForm: function () {
        console.log("inside routing:renderUserForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.UserFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#userFormTpl' ).html() )
        });

    },

    renderEditUserForm: function (id) {
        console.log("inside routing:renderUserForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.EditUserFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editUserFormTpl' ).html() ),
            id: id
        });

    },

    renderAdminUserForm: function () {
        console.log("inside routing:renderAdminForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.AdminUserFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#adminUserFormTpl' ).html() )
        });

    },

    renderEditAdminUserForm: function (id) {
        console.log("inside routing:renderAdminForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.EditAdminUserFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#adminEditUserFormTpl' ).html() ),
            id: id
        });

    },

    manageDocuments: function () {
        console.log("inside routing:manageDocuments");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.DocumentTablePageView({el: $( '#page-section' )});

    },

    renderDocumentListTable: function () {
        console.log("inside routing:renderDocumentListTable");
        // this.currentView.userList = new admin.UserListView({el: $( '#user-list-table' )});
        // this.currentView.userList = this.currentView.userList || {};
        new admin.DocumentTableView({el: $( '#doc-list-table' )});

    },

    renderFileUploadPage: function () {
        console.log("inside routing:renderFileUploadPage");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.FileUploadPageView({el: $( '#page-section' )});

    },

    manageDomain: function(){
         console.log("inside routing:manageDomain");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.DomainTablePageView({el: $( '#page-section' )});
    },

    renderDomainForm : function(){
        console.log("inside routing:renderDomainForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.DomainFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#domainFormTpl' ).html() ),
            mode: 'create'
        });
    },

    renderEditDomainForm : function(id){
        console.log("inside routing:renderDomainForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.DomainFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editDomainFormTpl' ).html() ),
            mode: 'edit',
            id: id
        });
    },

    domaineditListTable: function () {
        console.log("inside routing:renderDomainListTable");
        if (this.currentView) {
              this.currentView.$el.empty();
              this.currentView.$el.unbind();
          }
       
        new admin.domaineditTableView({
            el: $( '#domaineditListRowTpl' )
        });

    },

    manageGeo: function(){
        console.log("inside routing:manageDGeo");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.GeoTablePageView({el: $( '#page-section' )});
        //this.currentView = new admin.DocumentTablePageView({el: $( '#page-section' )});
    },
    renderGeoForm : function(){

        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.GeoFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#geoFormTpl' ).html() ),
            mode: 'create'
            
        });
    },
    renderEditGeoForm : function(id){
       
        console.log("inside routing:rendergeoForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.GeoFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editGeoFormTpl' ).html() ),
            mode: 'edit',
            id: id
        });


    }, 

    manageDocType: function(){
        
         console.log("inside routing:manageDocType");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.DocTypeTablePageView({el: $( '#page-section' )});
        //this.currentView = new admin.DocumentTablePageView({el: $( '#page-section' )});
    },

    renderEditDoctypeForm: function(id){
        
        console.log("inside routing:renderEDITDocTypeForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        console.log("loading");
        this.currentView = new admin.DocTypeFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editdoctypeFormTpl' ).html() ),
            mode: 'edit',
            id: id
        });

        },

    renderDocTypeForm : function(){
        
        console.log("inside routing:renderDocTypeForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
            
        this.currentView = new admin.DocTypeFormPageView({

            el: $( '#page-section' ),
            template: _.template( $( '#doctypeFormTpl' ).html() ),
            mode: 'create',

        });
    }, 

    manageReg: function () {
          console.log("inside routing:manageRegulation");
          if (this.currentView) {
              this.currentView.$el.empty();
              this.currentView.$el.unbind();
          }
          this.currentView = new admin.RegulationTablePageView({el: $( '#page-section' )});

      },

    renderCreateRegulationPage:function(){
          console.log("inside routing:renderCreateRegulationFormPage");
          if (this.currentView) {
              this.currentView.$el.empty();
              this.currentView.$el.unbind();
          }
          this.currentView = new admin.RegulationFormPageView({
              el: $( '#page-section' ),
              template: _.template( $( '#regulationFormTpl' ).html() ),
              mode: 'create'
          });
      },

    renderEditRegulationPage:function(id){
          console.log("inside routing:renderCreateRegulationFormPage");
          if (this.currentView) {
              this.currentView.$el.empty();
              this.currentView.$el.unbind();
          }
          this.currentView = new admin.RegulationFormPageView({
              el: $( '#page-section' ),
              template: _.template( $( '#regulationEditFormTpl' ).html() ),
              mode: 'edit',
              id:id
          });
      },

    regulationeditListTable: function () {
        if (this.currentView) {
              this.currentView.$el.empty();
              this.currentView.$el.unbind();
          }
        console.log("inside routing:renderDocumentListTable");
        new admin.regulationeditTableView({
            el: $( '#regulationeditListRowTpl' )
        });

    },
    
    renderProfileManagement:function(){
        console.log("inside routing:renderProfileManagement");
        if (this.currentView) {
            console.log('currentView exist');
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        // this.currentView = new admin.UserListView({el: $( '#user-list-table' )});
        this.currentView1 = new admin.ProfileManagementPageView({el: $( '#page-section' )});

    },

    renderNewsManagement:function(){
        console.log("inside routing:renderNewsManagement");
        if (this.currentView) {
            console.log('currentView exist');
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        // this.currentView = new admin.UserListView({el: $( '#user-list-table' )});
        this.currentView = new admin.NewsManagementPageView({el: $( '#page-section' )});

    },

    renderNewsForm:function(){
          
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.NewsFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#newsFormTpl' ).html() ),
            mode: 'create'
        });

    },

    renderEditNewsFormView : function(id){
        //alert("id :: " + id);

         console.log("inside routing:renderEditNewsFormView");

        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }       
        this.currentView = new admin.NewsFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editNewsFormTpl' ).html() ),
            mode: 'edit',
             id: id
        });
    },
    managecountry:function(){
        console.log("inside routing:managecountry");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.CountryTablePageView({el: $( '#page-section' )});

        
    },
    rendercountryForm : function(){

        console.log("inside routing:rendercountryForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }      
        this.currentView = new admin.CountryFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#countryFormTpl' ).html() ),
            mode: 'create'
            
        });
 
    }, 
    
    renderEditCountryForm : function(id){       
        console.log("inside routing:renderEditCountryForm");
          if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        this.currentView = new admin.CountryFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editCountryFormTpl' ).html() ),
             mode: 'edit',
            id: id
        });
       
    },

    manageRegulator: function(){
        console.log("inside routing:manageDRegulator");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
           
        }
        this.currentView = new admin.RegulatorTablePageView({el: $( '#page-section' )});
        console.log("its working");
       // this.currentView = new admin.RegulatorTablePageView({el: $( '#page-section' )});
        //this.currentView = new admin.DocumentTablePageView({el: $( '#page-section' )});
    },
    renderRegulatorForm : function(){
        console.log("inside routing:renderDomainForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
         this.currentView = new admin.RegulatorFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#regulatorFormTpl' ).html() ),
            mode: 'create'
            
        });
      
    }, 
  
    renderEditRegulatorForm : function(id){
       
        console.log("inside routing:renderregulatorForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.RegulatorFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editRegulatorFormTpl' ).html() ),
            mode: 'edit',
            id: id
        });


    },  

    manageDomainPage: function () {
        console.log("inside routing:manageDomainPage");
        if (this.currentView) {
              this.currentView.$el.empty();
              this.currentView.$el.unbind();
        }
        this.currentView = new admin.DomainTablePageView({el: $( '#page-section' )});

    },

    renderSubDocManagement:function(){
        if (this.currentView) {
           console.log('currentView exist');
           this.currentView.$el.empty();
           this.currentView.$el.unbind();
       }
       this.currentView = new admin.SubDocManagementPageView({el: $( '#page-section' )});
    },    
    renderSubDocFormView:function(){        
       if (this.currentView) {
           this.currentView.$el.empty();
           this.currentView.$el.unbind();
       }      
       this.currentView = new admin.SubDocFormPageView({
           el: $( '#page-section' ),
           template: _.template( $( '#subDocFormTpl' ).html() ),
           mode: 'create'
       });
    },   
    renderEditSubDocFormView : function(id){
        console.log("inside routing:rendersubdoc editForm");
       if (this.currentView) {
           this.currentView.$el.empty();
           this.currentView.$el.unbind();
       }      
       this.currentView = new admin.SubDocFormPageView({
           el: $( '#page-section' ),
           template: _.template( $( '#editSubDocFormTpl' ).html() ),
           mode: 'edit',
            id: id
       });
   },

    managecountry: function(){
         console.log("inside routing:manageDcountry");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
           
        }
    this.currentView = new admin.CountryTablePageView({el: $( '#page-section' )});
                  console.log("its working");
       // this.currentView = new admin.RegulatorTablePageView({el: $( '#page-section' )});
        //this.currentView = new admin.DocumentTablePageView({el: $( '#page-section' )});
    },
    rendercountryForm : function(){
                 console.log("inside routing:renderDomainForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.CountryFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#countryFormTpl' ).html() ),
            mode: 'create'
            
        });
    },
    renderEditCountryForm : function(id){
       
         console.log("inside routing:rendercountryForm"); 
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }        
        this.currentView = new admin.CountryFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editCountryFormTpl' ).html() ),
            mode: 'edit',
            id: id
        });



    },
    managestate: function(){
         console.log("inside routing:manageDstate");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
           
        }
    this.currentView = new admin.StateTablePageView({el: $( '#page-section' )});
                  console.log("its working");
       // this.currentView = new admin.RegulatorTablePageView({el: $( '#page-section' )});
        //this.currentView = new admin.DocumentTablePageView({el: $( '#page-section' )});
    },
    renderstateForm : function(){
                 console.log("inside routing:renderDomainForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.StateFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#stateFormTpl' ).html() ),
            mode: 'create'
            
        });
    },
    renderEditStateForm : function(id){
       
         console.log("inside routing:renderstateForm"); 
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }        
        this.currentView = new admin.StateFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editStateFormTpl' ).html() ),
            mode: 'edit',
            id: id
        });

    },

    manageAlert: function() {
        console.log("inside routing:manageAlert");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
           
        }
    this.currentView = new admin.AlertTablePageView({el: $( '#page-section' )});
    },

    renderAlertForm : function(){
        console.log("inside routing:renderAlertForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }      
        this.currentView = new admin.AlertFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#alertFormTpl' ).html() ),
            mode: 'create'
            
        });
 
    },

    managealert: function(){
         console.log("inside routing:managealert");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
           
        }
    this.currentView = new admin.AlertTablePageView({el: $( '#page-section' )});
    },

    renderEditAlertForm : function(id){
        console.log("inside routing:renderAlertForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.EditAlertFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editAlertFormTpl' ).html() ),
            mode: 'edit',
            id: id
        });
    },

    renderLifeTrackerManagementPage: function() {
        console.log("inside routing:renderLifeTrackerManagementPage");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.LifeTrackerManagementPageView({
            el: $( '#page-section' )
            // template: _.template( $( '#lifeTrackerManagementPageTpl' ).html() ),
          
        });
    },

    renderEditSpclDocForm: function(id, file_id){
        console.log("inside routing:renderAlertForm");
        if (this.currentView) {
            this.currentView.$el.empty();
            this.currentView.$el.unbind();
        }
        
        this.currentView = new admin.EditSpclDocFormPageView({
            el: $( '#page-section' ),
            template: _.template( $( '#editSpclDocFormTpl' ).html() ),
            mode: 'edit',
            id: id,
            file_id : file_id,
        });
    }
   
});

