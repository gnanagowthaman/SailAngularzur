var admin = admin || {};
admin.AlertCollection = Backbone.Collection.extend({
model: admin.AlertRowModel,
	url: '/alert'
});	
