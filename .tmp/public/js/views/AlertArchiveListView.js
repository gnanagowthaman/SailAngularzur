var app = app || {};

app.AlertArchiveListView = Backbone.View.extend({

	el: $( '#alertsArchiveList'),
	initialize: function() {
    	console.log('Initialize AlertArchiveListView');
		var _selfReference = this;
		this.collection = new app.AlertsArchiveList(); 
	   
		this.collection.fetch({
			url: '/findAlertArchive',
			wait : true,
			reset: true,
			data: {geoId: 0},
			 processData: true,
		 	//url:'/findSubscription',
		 	success:function(){
		 		console.log("Subscription success");
		 		 console.log(_selfReference.collection);
		 		 
		 		//_selfReference.render();
		 	},
		 	error: function(data) {
			  	try{
			  		var errData = JSON.parse(data.responseText);
				  	if ( errData.errCode == 550) {
					  	window.location.href = '/sessionExpired';
					} else {
						if (errData.errMsg.length > 0) {
				  		var failureMsg = errData.errMsg;	
				  		} else {
				  		  	var failureMsg = "Error occurred while fetching alerts. Please Contact Administrator.";	
				  		}
						$( "div.failure").html(failureMsg);
		            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
					}
				}catch(e){
				   	window.location.href = '/sessionExpired';
				 }
          	}
		}); 
		    this.listenTo( this.collection, 'add', this.renderAlertsArchive );
		    this.listenTo( this.collection, 'reset', this.render );
		    this.listenTo( this.collection, 'sort', this.render );
		    _.bindAll(this, "renderNews");
		    _.bindAll(this, "render");
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderAlertsArchive( item );
		}, this);
		console.log(JSON.stringify(this.collection));
	  	return this;  
	},

	renderAlertsArchive:function(item){
		var alertItemView = new app.AlertArchiveItemView({
			model: item
		});
	    this.$el.append(alertItemView.render().el );
	}

});