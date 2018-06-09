var admin = admin || {};
admin.SubDocModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,		
		"description" : null,
		
	},
	idAttribute: 'subDocId'
});
