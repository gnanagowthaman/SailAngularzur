// Router
var app = app || {};
var admin = admin || {};


app.ClientAppRouter = Backbone.Router.extend({

    routes:{
        ""                  : "clientView",
        "showDashboard"     : "clientView",
        "showAlerts"        : "showAlerts",
        // 'showReg/:mode'     : 'treeView',
        'showReg'           : 'treeView',
        'showProfile'       : 'profileView',
        'showSearch/:skey'  : 'searchView',
        'showUpdates'       : 'showUpdates',
        'advancesearch'     : 'advancesearch',
        "archiveAlerts"        : "archiveAlerts",
    },

    initialize:function () {
       console.log("inside the advance search");
    },              

    clientView : function () {
        $("#mainCanvas").empty();
        $("#mainCanvas").unbind();
        this.currentView = new app.ClientDashboardView({el: $("#mainCanvas")});
    },

    treeView : function () {

                //added by Louis
        this.currentcntid=0;  //country id
        this.currentstid=0;   //state id
        this.currentrid=0;   //regulator id
        this.currentdocid=0;   //document id
        this.currentsubdocid=0;  //subdocument id
        //end Louis
        this.currentrlid =0;
        this.currentgid =0;
        this.domainid =0;
        this.doctypeid =0;
        this.domainlist = null;
        this.doctype = null;
        this.doctable= null;
        this.xlsx= null;
        this.pdf= null;
        this.treeviews = null;
        $("#mainCanvas").empty();
        $("#mainCanvas").unbind();        
       // $("#mainCanvas").html($("#mainCanvasTpl").html());
        this.currentView = new app.MainPageView({el: $("#mainCanvas")});
    },

    profileView : function() {
        $("#mainCanvas").empty();
        $("#mainCanvas").unbind();
        console.log("test");
        this.currentView = new app.UserProfilePageView({el: $("#mainCanvas")});
    },

    searchView : function(skey) {
        $("#mainCanvas").empty();
        $("#mainCanvas").unbind();
        // this.currentView = new app.SearchView({el: $("#mainCanvas")});
        this.currentView = new app.SearchView({el: $("#mainCanvas"), searchKey: skey});
    },

    showUpdates: function() {
        console.log("For checking the data");
        //this.document.pages.at(0).open();
        $("#mainCanvas").empty();
        $("#mainCanvas").unbind();
        this.currentView = new app.UpdateView({el: $("#mainCanvas")});
    },
    advancesearch : function() {
        console.log("Client Router advancesearch");
        $("#mainCanvas").empty();
        $("#mainCanvas").unbind();
        this.currentView = new app.AdvanceSearchPageView({el: $("#mainCanvas")});
    },

    showAlerts : function () {
        $("#mainCanvas").empty();
        $("#mainCanvas").unbind();
        this.currentView = new app.AlertManagementPageView({el: $("#mainCanvas")});
    },

    archiveAlerts: function() {
        $("#mainCanvas").empty();
        $("#mainCanvas").unbind();
        this.currentView = new app.AlertArchiveManagementPageView({el: $("#mainCanvas")});
    }

});

