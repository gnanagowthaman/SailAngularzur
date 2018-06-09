// =========Model classes ========================
var app = app || {};
app.GeographyModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
	    "name": ""
	},
	idAttribute: 'id'
});
