var admin = admin || {};

admin.ProfileSubscriptionListView = Backbone.View.extend({

	el: $( '#subscriptionList'),

	initialize: function() {
    	console.log('Initialize ProfileSubscriptionListView');
		var _selfReference = this;
    	this.collection = new admin.SubscriptionCollection();
    	subsoffset = 0;
		console.log('subslimit : subsoffset');
	    console.log(subslimit + ' : ' + subsoffset);  	 
    	this.collection.fetch({reset: true, data: { limit: subslimit, offset: subsoffset }, processData: true,
    	 	//url:'/findSubscription',
    	 	success:function(){
    	 		console.log("Sucess subscription");
    	 		
    	 	},
    	 	error:function(data){
    	 		try{
				  	var errData = JSON.parse(data.responseText);
				  	if ( errData.errCode == 550) {
					  	window.location.href = '/sessionExpired';
					} else {
						if (errData.errMsg.length > 0) {
				  			var failureMsg = errData.errMsg;	
				  		} else {
				  		  	var failureMsg = "Error occurred while fetching the Regulations. Please Contact Administrator.";	
				  		}
							$( "div.failure").html(failureMsg);
		            		$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
					 }
		    	}catch(e){
					window.location.href = '/sessionExpired';
				}
    	 	}
    	}); 

    	this.listenTo( this.collection, 'add', this.renderSubscription );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderSubscription");
		_.bindAll(this, "render");
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderSubscription( item );
		}, this);
	    console.log('ProfileSubscriptionListView');
	     if (this.collection.length < subslimit) {
			$('#findStatus').html("End Of Records");

			$('#loadMoreSubscription').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append('<button id="loadMoreSubscription" class="btn btn-outline btn-success">Load More</button> ');
			//$('#loadMoreSubscription').show();			
		}	     	
	    return this;  
	},

	renderSubscription:function(item){
		var profileSubscriptionItemView = new admin.ProfileSubscriptionItemView({
			model: item
		});
	    this.$el.append(profileSubscriptionItemView.render().el );
	}
});
