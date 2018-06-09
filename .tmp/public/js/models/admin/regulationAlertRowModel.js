var admin = admin || {};
admin.regulationAlertRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,
	},
	idAttribute: 'id'
});
