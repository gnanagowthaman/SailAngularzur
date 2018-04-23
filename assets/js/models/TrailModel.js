// =========Model classes ========================
var app = app || {};
app.TrailModel = Backbone.Model.extend({
	defaults: {
		permission_id:0
	},

	url:"/trail_check"
});
