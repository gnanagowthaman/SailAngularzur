var app = app || {};
app.SearchList = Backbone.Collection.extend({
    model : app.SearchModel,
	url :'/search'
});