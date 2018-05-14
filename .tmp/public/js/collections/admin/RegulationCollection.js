var admin = admin || {};
admin.RegulationCollection = Backbone.Collection.extend({
model: admin.RegulationRowModel,
	url: '/getRegulations'
});	
