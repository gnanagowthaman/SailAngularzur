var admin = admin || {};
admin.GeoRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,
		"description" : null
	},
	idAttribute: 'id'
});
