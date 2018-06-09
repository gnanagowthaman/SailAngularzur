// =========Model classes ========================
var app = app || {};
app.DocumentModel = Backbone.Model.extend({
	defaults: {
		"rid" : null,
		"did" : null,
		"dname" : null,
		"doid" : null,
		"doname" : null,
		"description" : null,
		"file" : null,
		"path" : null
	},
	idAttribute: 'doid'
});
