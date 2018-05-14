// =========Model classes ========================
var app = app || {};
app.RegulatorModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
	    "name": ""
	},
	idAttribute: 'id'
});
