var app = app || {};

app.AlertItemView = Backbone.View.extend({

  	idName: 'alertsList',
	template: $( '#alertTemplate' ).html(),

	render: function() {
		var tmpl = _.template( $( '#alertTemplate' ).html() );
		console.log(JSON.stringify(this.model));
		this.$el.html( tmpl( this.model.toJSON() ) );	
		return this;
	},

	events: {
		'click #details' : 'details',
		'click #archiveAlert' : 'archiveAlert'
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
	},

	archiveAlert: function(e) {
		e.preventDefault();

        var self = this;

        console.log(this.model.get('id'));
        var alert_id = self.model.get('id');
        console.log('alert_id: ', alert_id);
        if(confirm("Do you want to archive")){

         $.ajax({
                    type: 'POST',
                    url: '/archive/' + alert_id,
                    
                     contentType:'application/json',
                    cache:false,
                    success: function(data) {
                       self.unbind();
                      self.remove();
                      $( "div.success").html("Alert archived Successfully.");
                      $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );   
                    },
                    error: function(data) {
               			console.log("error occures");
                    }
             });

               }
                showAlertCount();
	}
});