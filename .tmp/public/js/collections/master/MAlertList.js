// =========Collection classes ===================
var app = app || {};
app.MAlertList = Backbone.Collection.extend({
	model: app.MAlertModel,
	url: '/malert'
});	
