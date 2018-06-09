var admin = admin || {};
admin.StateAlertCollection = Backbone.Collection.extend({
model: admin.StateAlertRowModel,
	url: '/stateAlert'
});	
