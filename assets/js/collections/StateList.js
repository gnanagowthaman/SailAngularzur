// =========Collection classes ===================
var app = app || {};
app.StateList = Backbone.Collection.extend({
	model: app.StateModel,
	url: '/regulator'
});	
