// =========Model classes ========================
var app = app || {};
app.RegulationModel = Backbone.Model.extend({
	defaults: {
		"gid" : null,
	    "gname": "",
		"rid" : null,
	    "rname": ""

	}
});
