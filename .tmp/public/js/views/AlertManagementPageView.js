var app = app || {};

app.AlertManagementPageView =Backbone.View.extend({
	template: $('#alertManagementPageTpl').html(),
	initialize: function() {
		this.render();

	},

	render: function() {
		this.$el.html(this.template);
		console.log('Rendering AlertManagementPageView');
		this.alertList = new app.AlertListView({el: $('#alertsList')});
		return this;
	},

	events: {
		'click #archive' : 'archive'
	},

	archive: function(e) {
		e.preventDefault();
        var self = this;
        if(confirm("Do you want to archive all alerts")){

           $.ajax({
                    type: 'POST',
                    url: '/archiveAll',
                    // data: {geoId: 0},
                    contentType:'application/json',
                    cache:false,
                    success: function(data) {
                      $('#alertsList').empty();
                      $( "div.success").html("All alerts are archived Successfully.");
                      $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );   
                    },
                    error: function(data) {
                      
                    }
             });
        }

         showAlertCount();
	}
});
