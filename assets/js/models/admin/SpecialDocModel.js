var admin = admin || {};
admin.SpecialDocModel = Backbone.Model.extend({
	defaults: {
             "id" :"",
             "document_type" : ""
	},
	idAttribute: 'id'
});