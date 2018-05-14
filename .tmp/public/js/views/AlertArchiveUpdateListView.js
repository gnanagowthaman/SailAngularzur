var app = app || {};

app.AlertArchiveUpdateListView = Backbone.View.extend({

	
  	idName: 'alertsArchiveList',
	template: $( '#alertArchiveTemplate' ).html(),

	render: function() {
		var tmpl = _.template( $( '#alertArchiveTemplate' ).html() );
		this.$el.html( tmpl(this.model)  );	
		return this;
	},

	events: {
		'click #details' : 'details'
	},

	details: function() {
		console.log("event triggers");
		if(this.$el.find('#details').hasClass('opened')){
			this.$el.find('#details').parent().parent().parent().height(150);
			this.$el.find('#details').parent().parent().parent().find('.search-result-date').height(100);
			this.$el.find('#details').parent().parent().parent().find('.search-result-icon').height(100);
			
			this.$el.find('#details').parent().parent().find('.search-result-text').height(38);
			this.$el.find('#details').toggleClass('opened');
		} else {
			var height = this.$el.find('#details').parent().parent().find('.search-result-text').height();
			var scrollHeight = this.$el.find('#details').parent().parent().find('.search-result-text')[0].scrollHeight;
			var diff = scrollHeight-height;

			this.$el.find('#details').parent().parent().parent().height(150+diff);
			this.$el.find('#details').parent().parent().parent().find('.search-result-date').height(100+diff);
			this.$el.find('#details').parent().parent().parent().find('.search-result-icon').height(100+diff);

			this.$el.find('#details').parent().parent().find('.search-result-text').height(scrollHeight);
			this.$el.find('#details').toggleClass('opened');
		}
	}
});