var admin = admin || {};
admin.DomainRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,		
		"name" : null,
		"description" : null
	},
	idAttribute: 'id'
});
