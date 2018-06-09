var admin = admin || {};
admin.DocumentRowModel = Backbone.Model.extend({
	defaults: {
		"rdlid" : null,
        "gid" : null,
        "gname" : null,
        "did" : null,
        "dname" : null,
        "rid" : null,
        "rname" : null,
        "docid" : null,
        "docname" : null,
        "coid" :null,
        "coname" :null,
        "stid" :null,
        "stname" :null,
        "regtrId":null,
        "regtrName" :null,
      	"sdocid" :null,
	    "sdocname":null,
        "fid" : null,
        "fname" : null,
        "level" : null,
        "isuploaded" : null,
        "ispublished" : null,
        "tobepublished":null
	},
	idAttribute: 'fid'
});
