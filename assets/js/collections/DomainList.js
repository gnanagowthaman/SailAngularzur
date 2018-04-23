// =========Collection classes ===================
var app = app || {};
app.DomainList = Backbone.Collection.extend({
	model: app.DomainModel,
	url: '/domain'
});	
