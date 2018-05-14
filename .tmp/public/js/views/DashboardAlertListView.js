var app = app || {};

app.DashboardAlertListView = Backbone.View.extend({

	el: $( '#dAlertsList'),
	initialize: function() {
    	console.log('Initialize DashboardAlertListView');
		var _selfReference = this;
		this.collection = new app.AlertCollection(); 
	   
		this.collection.fetch({
			url: '/findDAlert',
			wait : true,
			reset: true,
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
		    this.listenTo( this.collection, 'add', this.renderAlerts );
		    this.listenTo( this.collection, 'reset', this.render );
		    this.listenTo( this.collection, 'sort', this.render );
		    _.bindAll(this, "renderAlerts");
		    _.bindAll(this, "render");
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderAlerts( item );
		}, this);
		console.log('llll');
		console.log(JSON.stringify(this.collection));

		try{   
		var timer = !1;
		_Ticker = $("#T1").newsTicker();
		_Ticker.on("mouseenter",function(){
			var __self = this;
			timer = setTimeout(function(){
				__self.pauseTicker();
			},200);
		});
		_Ticker.on("mouseleave",function(){
			clearTimeout(timer);
			if(!timer) return !1;
			this.startTicker();
		});
	} catch(err){}

	  	return this;  
	},

	renderAlerts:function(item){
		var alertItemView = new app.DashboardAlertItemView({
			model: item
		});
	    this.$el.append(alertItemView.render().el );

	    console.log('alert html page',this.$el.append(alertItemView.render().el ));
	}

});