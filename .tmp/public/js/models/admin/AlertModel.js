var admin = admin || {};
admin.AlertModel = Backbone.Model.extend({
	defaults: {
             "id" :"",
             "name" : "",
             "message" : ""
	},
	idAttribute: 'id'
});