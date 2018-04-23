// =========Model classes ========================
var app = app || {};
app.MRegulationModel = Backbone.Model.extend({
	defaults: {
		"rlid" : null,
	    "name": ""

	},
	idAttribute: 'id'
});
