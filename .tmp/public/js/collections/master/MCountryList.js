// =========Collection classes ===================
var app = app || {};
app.MCountryList = Backbone.Collection.extend({
	model: app.MCountryModel,
	url: '/mcountry'
});	
