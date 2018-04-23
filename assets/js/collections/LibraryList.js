var app = app || {};
app.LibraryList = Backbone.Collection.extend({
    model : app.LibraryModel,
	url :'/library'
});