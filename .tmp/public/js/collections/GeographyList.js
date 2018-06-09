// =========Collection classes ===================
var app = app || {};
app.GeographyList = Backbone.Collection.extend({
	model: app.GeographyModel,
	url: '/geography'
});	
