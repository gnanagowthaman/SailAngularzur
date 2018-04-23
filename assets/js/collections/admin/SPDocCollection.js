var admin = admin || {};
admin.SPDocCollection = Backbone.Collection.extend({
	model: admin.SPDocumentRowModel,
	url: '/spdocument'
});	
