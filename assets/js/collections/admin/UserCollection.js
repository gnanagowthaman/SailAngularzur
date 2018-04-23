var admin = admin || {};
admin.UserCollection = Backbone.Collection.extend({
	url: '/user'
});	