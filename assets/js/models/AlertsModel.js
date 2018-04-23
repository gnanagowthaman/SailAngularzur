var app = app || {};
app.AlertsModel = Backbone.Model.extend({
	defaults: {

		//"name":"",
		"message": "",	    
	    "domain": "",
	    "geography":"",
	    "country":"",
	    "state":"",
	    "regulator":"",
	    "regulation":"",
	    "date":"",
	  //  "document":"",    	    
	  //  "subdocument":""
	
			},
	idAttribute: 'id'
});