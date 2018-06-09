var admin = admin || {};
admin.GeographyCollection = Backbone.Collection.extend({
model: admin.GeoRowModel,
	url: '/geography'
});	
