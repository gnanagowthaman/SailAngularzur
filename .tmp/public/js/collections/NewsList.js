
var app = app || {};
app.NewsList = Backbone.Collection.extend({
	model: app.NewsModel,
	url: '/news'
});	

