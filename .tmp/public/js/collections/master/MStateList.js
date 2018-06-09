// =========Collection classes ===================
var app = app || {};
app.MStateList = Backbone.Collection.extend({
	model: app.MStateModel,
	url: '/mstate'
});	
