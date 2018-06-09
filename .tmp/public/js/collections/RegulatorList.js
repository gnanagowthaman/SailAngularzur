// =========Collection classes ===================
var app = app || {};
app.RegulatorList = Backbone.Collection.extend({
	model: app.RegulatorModel,
	url: '/regulator'
});	
