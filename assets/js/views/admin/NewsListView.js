var admin = admin || {};

admin.NewsListView = Backbone.View.extend({

	el: $( '#newsList'),

	initialize: function() {
    	console.log('Initialize NewsListView');
		var _selfReference = this;
    	this.collection = new admin.NewsCollection(); 	 
    	offset=0;	
    	this.collection.fetch({reset: true, data: { limit: limit, offset: offset }, processData: true,
    	 	url:'/getAllnews',
    	 	success:function(data){
    	 		console.log("success");
    	 	},
    	 	error:function(){
    	 		try{
				  	var errData = JSON.parse(data.responseText);
				  	if ( errData.errCode == 550) {
					  	window.location.href = '/sessionExpired';
					} else {
						if (errData.errMsg.length > 0) {
				  			var failureMsg = errData.errMsg;	
				  		} else {
				  		  	var failureMsg = "Error occurred while fetching the News. Please Contact Administrator.";	
				  		}
							$( "div.failure").html(failureMsg);
		            		$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
					 }
		    	}catch(e){
					window.location.href = '/sessionExpired';
				}
    	 	}
    	}); 

    	this.listenTo( this.collection, 'add', this.renderNewsItem );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderNewsItem");
		_.bindAll(this, "render"); 
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderNewsItem( item );
		}, this);
	    console.log('NewsListView');
	    if(this.collection.length < limit) {
			$('#findStatus').html("End Of Records");
			$('#newsloadMore').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append('<button id="newsloadMore" class="btn btn-outline btn-success">Load More</button>');
			//$('#newsloadMore').show();			
		}	
	    return this;  
	},

	renderNewsItem:function(item){
		var newsItemView = new admin.NewsItemView({
			model: item
		});
	    this.$el.append(newsItemView.render().el );
	}
});
