var admin = admin || {};
admin.AlertList = Backbone.Collection.extend({
	model: admin.AlertModel,
	url: '/findalertbygeo'
});	