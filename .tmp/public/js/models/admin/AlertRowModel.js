var admin = admin || {};
admin.AlertRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"message" : null,
		"file_name": null,
	},
	idAttribute: 'id'
});
