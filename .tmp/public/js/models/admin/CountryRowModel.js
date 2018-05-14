var admin = admin || {};
admin.CountryRowModel = Backbone.Model.extend({
	defaults: {
		"id" : null,
		"name" : null,
		"description" : null,
		"country_code" : null,
		"geoname":null
	},
	idAttribute: 'id'
});
