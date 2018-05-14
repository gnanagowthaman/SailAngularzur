// =========Model classes ========================
var app = app || {};
app.MSearchModel = Backbone.Model.extend({
	defaults: {
             "id" :"",
             "name" : ""
	},
	idAttribute: 'id'
});
