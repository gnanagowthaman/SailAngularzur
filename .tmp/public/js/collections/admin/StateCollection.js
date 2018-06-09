var admin = admin || {};
admin.StateCollection = Backbone.Collection.extend({
model: admin.StateRowModel,
	url: '/states'
});	
