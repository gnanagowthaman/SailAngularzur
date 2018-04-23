// =========Model classes ========================
var app = app || {};
app.DomainModel = Backbone.Model.extend({
	defaults: {
		"rid" : null,
	    "rname": "",
             "did" :"",
             "dname" : ""
	},
	idAttribute: 'did'
});
