var admin = admin || {};

admin.ProfileSubscriptionItemView = Backbone.View.extend({

    tagName:'tr',
  	idName: 'subscriptionList',
	template: $( '#subscriptionTemplate' ).html(),

	render: function() {
		var tmpl = _.template( this.template );
		this.$el.html( tmpl( this.model.toJSON() ) );
		return this;
	}
});