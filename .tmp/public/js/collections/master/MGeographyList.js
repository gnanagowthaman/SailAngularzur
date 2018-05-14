// =========Collection classes ===================
var app = app || {};
app.MGeographyList = Backbone.Collection.extend({
	model: app.MGeographyModel,
	url: '/mgeography'
});	
