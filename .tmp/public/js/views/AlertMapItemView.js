var app = app || {};

app.AlertMapItemView = Backbone.View.extend({

  	idName: 'alertList',
	template: $( '#alertTemplate' ).html(),

	render: function() {
		var tmpl = _.template( this.template );
		console.log(JSON.stringify(this.model));

		this.$el.html( tmpl( this.model.toJSON() ) );	
		return this;
	},

	events: {
		'click #arrow' : 'arrowClicked'
	},

	arrowClicked: function(){
		console.log("Testing event triggering");
		
		if(this.$el.find('#arrow').parent().hasClass('opened')){
			this.$el.find('#arrow').parent().parent().height(95);
			this.$el.find('#arrow').parent().find('.alert-db-text').height(38);
			this.$el.find('#arrow').parent().removeClass('opened');
		} else {
			var height = this.$el.find('#arrow').parent().find('.alert-db-text').height();
			var scrollHeight = this.$el.find('#arrow').parent().find('.alert-db-text')[0].scrollHeight;
			var diff = scrollHeight-height;

			this.$el.find('#arrow').parent().parent().height(95+diff);
			this.$el.find('#arrow').parent().find('.alert-db-text').height(scrollHeight);
			this.$el.find('#arrow').parent().addClass('opened');
		}
	}
});