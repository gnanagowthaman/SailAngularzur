// =========Model classes ========================
var app = app || {};
app.MGeographyModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
	    "name": ""

	},
	idAttribute: 'id'
});
