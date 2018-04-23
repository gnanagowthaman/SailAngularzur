var app = app || {};

app.DashboardAlertItemView = Backbone.View.extend({
	
  	idName: 'dAlertsList',
	template: $( '#dAlertTemplate' ).html(),

	render: function() {
		var tmpl = _.template( $( '#dAlertTemplate' ).html() );
		console.log(JSON.stringify(this.model));
		this.$el.html( tmpl( this.model.toJSON() ) );
		console.log('html page',this.$el.html( tmpl( this.model.toJSON() ) ));	
		return this;
	}
});