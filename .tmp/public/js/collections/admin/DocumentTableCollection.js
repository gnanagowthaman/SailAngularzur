var admin = admin || {};
admin.DocumentTableCollection = Backbone.Collection.extend({
	model: admin.DocumentRowModel,
	url: '/document'
});	
