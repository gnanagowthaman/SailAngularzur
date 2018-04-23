
// =========Model classes ========================
var app = app || {};
app.MStateModel = Backbone.Model.extend({
	defaults: {
             "sid" :"",
             "name" : "",
             "scode":"",
             "cntid" :"",
             "gid" :""
	},
	idAttribute: 'id'
});
