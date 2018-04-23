var admin = admin || {};
admin.NewsCollection = Backbone.Collection.extend({
    model: admin.NewsModel,
	url: '/getAllnews'
});	