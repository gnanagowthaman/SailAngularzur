// =========Collection classes ===================
var app = app || {};
app.MDomainList = Backbone.Collection.extend({
	model: app.MDomainModel,
	url: '/mdomain'
});	
