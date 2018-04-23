var admin = admin || {};
admin.RegulatorTableCollection = Backbone.Collection.extend({
model: admin.RegulatorRowModel,
	url: '/regulatornew'
});	
