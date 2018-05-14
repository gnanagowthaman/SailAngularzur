var app = app || {};
app.AlertsList = Backbone.Collection.extend({
    model : app.AlertsModel,
	url :'/findAlert'
});