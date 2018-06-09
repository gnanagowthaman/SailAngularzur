var admin = admin || {};
admin.NewsModel = Backbone.Model.extend({
	defaults: {
		"geo_id" : null,
		"geo_name" : null,		
		"news_content" : null,
		"news_date" : null	
	},
	idAttribute: 'newsid'
});
