// =========Model classes ========================
var app = app || {};
app.MDocumentModel = Backbone.Model.extend({
	defaults: {
		"docid" : null,
		"name" : null,
	}
});
