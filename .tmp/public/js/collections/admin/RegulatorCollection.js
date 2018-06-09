var admin = admin || {};
admin.RegulatorCollection = Backbone.Collection.extend({
model: admin.RegulatorRowModel,
	url: '/regulator'
});	
