// =========Collection classes ===================
var app = app || {};
app.MSearchList = Backbone.Collection.extend({
	model: app.MSearchModel,
	url: '/findsearch'
});	
