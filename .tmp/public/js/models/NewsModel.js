var app = app || {};
app.NewsModel = Backbone.Model.extend({
	defaults: {
		"date":null,

		"news":null,

		"name":null
		
			},
	idAttribute: 'id'
});
