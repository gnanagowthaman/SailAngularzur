// =========Model classes ========================
var app = app || {};
app.MDomainModel = Backbone.Model.extend({
	defaults: {
             "did" :"",
             "name" : ""
	},
	idAttribute: 'id'
});
