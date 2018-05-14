var app = app || {};
app.SubscriptionCollection = Backbone.Collection.extend({
    model: app.SubscriptionModel,
	url: '/findSubscription'
});	