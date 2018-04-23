var app = app || {};
app.SubscriptionModel = Backbone.Model.extend({
	defaults: {
	//	"sid" : null,
	//	"gid" : null,		
	//	"did" : null,
	//	"rid" : null,
	//	"docid" : null,
	//	"countryId" : null,
	//	"stateId"  :null,
	//	"regulatorId" :null,
	//	"subdocId" :null,
	//	"Geography" : null,
		"Domain" : null,
		"Regulation" : null,
		"Document" : null,
	//	"Country"  :null,
	//	"State"    :null,
		"Regulator":null
	//	"SubDocument":null
	},
	idAttribute: 'id'
});
