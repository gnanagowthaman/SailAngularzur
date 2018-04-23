var admin = admin || {};
admin.StateRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,
		"description" : null
	},
	idAttribute: 'id'
});
