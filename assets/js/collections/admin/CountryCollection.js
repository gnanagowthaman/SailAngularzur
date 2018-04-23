var admin = admin || {};
admin.CountryCollection = Backbone.Collection.extend({
model: admin.CountryRowModel,
	url: '/country'
});	
