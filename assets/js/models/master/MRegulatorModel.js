// =========Model classes ========================
var app = app || {};
app.MRegulatorModel = Backbone.Model.extend({
	defaults: {
		"rid" : null,
	    "name": ""

	},
	idAttribute: 'id'
});
