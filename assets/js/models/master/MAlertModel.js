// =========Model classes ========================
var app = app || {};
app.MAlertModel = Backbone.Model.extend({
	defaults: {
        "message": "",
	    "geography":"",    
	    "country":"",
	    "state" :"",
	    "domain":"",
	    "regulator":"",
	    "regulation":"",
	    "document":"",
	    "subdocument": ""
	},
	
});
