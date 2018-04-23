// =========Collection classes ===================
var app = app || {};
app.CountryList = Backbone.Collection.extend({
	model: app.CountryModel,
	url: '/regulator'
});	
