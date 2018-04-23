// =========Collection classes ===================
var app = app || {};
app.MRegulatorList = Backbone.Collection.extend({
	model: app.MRegulatorModel,
	url: '/mregulator'
});	
