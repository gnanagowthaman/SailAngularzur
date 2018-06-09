var admin = admin || {};
admin.RegulatorRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,
		"description" : null
	},
	idAttribute: 'id'
});
