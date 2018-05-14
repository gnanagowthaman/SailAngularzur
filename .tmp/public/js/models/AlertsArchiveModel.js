var app = app || {};
app.AlertsArchiveModel = Backbone.Model.extend({
	defaults: {

		//"name":"",
		"message": "",	    
	    "domain": "",
	    "geography":"",
	    "country":"",
	    "state":"",
	    "regulator":"",
	    "regulation":"",
	    "is_archive":"",
	    "date":"",
	  //  "document":"",    	    
	  //  "subdocument":""
	
			},
	idAttribute: 'id'
});