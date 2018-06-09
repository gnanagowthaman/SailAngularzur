/*var admin = admin || {};
admin.DoctypeCollection = Backbone.Collection.extend({
	model: admin.DocTypeRowModel,
	url: '/documents'
});	
*/
var admin = admin || {};
admin.DoctypeCollection = Backbone.Collection.extend({
	model: admin.DocTypeRowModel,
	url: '/doctype'
});	
