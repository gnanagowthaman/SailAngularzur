var admin = admin || {};
admin.DocTypeRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,		
		"name" : null,
		"description" : null
	},
	idAttribute: 'id'
});
