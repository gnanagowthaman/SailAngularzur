var admin = admin || {};
admin.SubscriptionCollection = Backbone.Collection.extend({
    model: admin.SubscriptionModel,
	url: '/findSubscription'
});	