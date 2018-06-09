var admin = admin || {};
admin.SubDocumentRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,		
		"description" : null,
		
	},
	idAttribute: 'subDocId'
});
