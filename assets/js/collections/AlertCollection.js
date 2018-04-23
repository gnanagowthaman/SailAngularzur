var app = app || {};
app.AlertCollection = Backbone.Collection.extend({
    model : app.DAlertModel,
	url :'/findDAlert'
});