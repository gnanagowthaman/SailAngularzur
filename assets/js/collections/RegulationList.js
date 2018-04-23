// =========Collection classes ===================
var app = app || {};
app.RegulationList = Backbone.Collection.extend({
	model: app.RegulationModel,
	url: '/regulation'
});	
