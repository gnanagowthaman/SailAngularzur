var admin = admin || {};
admin.StateAlertRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,
		"description" : null
	},
	idAttribute: 'id'
});
