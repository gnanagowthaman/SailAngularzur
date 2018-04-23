var admin = admin || {};
admin.RegulationRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,
		"description" : null,
		"regulation_status" : null,
	},
	idAttribute: 'id'
});
