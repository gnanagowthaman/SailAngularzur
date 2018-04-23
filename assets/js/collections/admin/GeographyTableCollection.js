var admin = admin || {};
admin.GeographyTableCollection = Backbone.Collection.extend({
model: admin.GeoRowModel,
	url: '/geographynew'
});	
