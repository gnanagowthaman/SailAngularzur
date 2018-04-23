// =========Collection classes ===================
var app = app || {};
app.MRegulationList = Backbone.Collection.extend({
	model: app.MRegulationModel,
	url: '/mregulation'
});	
