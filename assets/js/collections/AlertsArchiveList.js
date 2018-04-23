var app = app || {};
app.AlertsArchiveList = Backbone.Collection.extend({
    model : app.AlertsArchiveModel,
	url :'/findAlertArchive'
});