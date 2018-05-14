// =========Collection classes ===================
var app = app || {};
app.XlsList = Backbone.Collection.extend({
        model : app.XlsModel,
	url :'/xlsx'
});	
