// =========Model classes ========================
var app = app || {};
app.MCountryModel = Backbone.Model.extend({
	defaults: {

             "id" :"",
             "name" : ""
	},
	idAttribute: 'id'
});
