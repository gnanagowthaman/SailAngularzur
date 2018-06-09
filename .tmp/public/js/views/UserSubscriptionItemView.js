var app = app || {};

app.UserSubscriptionItemView = Backbone.View.extend({
	
  	idName: 'subscriptionList',
	template: $( '#subscriptionTemplate' ).html(),

	render: function() {
		var tmpl = _.template( this.template );
		console.log(JSON.stringify(this.model));
		console.log(this.model.get('Domain'));
		var domainName = this.model.get('Domain');
		// if(domainName == Consumer Finance){

 	// 		$('#subscriptionList tr').append('<img id="a" src="img/supervisory_icon.svg" width="32" height="32">');
		// }
		console.log( $( '#subscriptionTemplate' ).html());
		this.$el.html( tmpl( this.model.toJSON() ) );	
		return this;
	}
});
