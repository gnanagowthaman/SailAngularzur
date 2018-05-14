var admin = admin || {};

admin.SubDocListView = Backbone.View.extend({

	el: $( '#subDocList'),

	initialize: function() {
    	console.log('Initialize SUb Document ListView');
		var _selfReference = this;
    	this.collection = new admin.SubDocCollection(); 	 
    	offset=0;	
    	this.collection.fetch({reset: true, data: { limit: limit, offset: offset }, processData: true,
    	 	//url:'/getAllSubDoc',
    	 	success:function(){
    	 		console.log("success");
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
				  		  	var failureMsg = "Error occurred while fetching the Sub Document List View. Please Contact Administrator.";	
				  		}
							$( "div.failure").html(failureMsg);
		            		$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
					 }
		    	}catch(e){
					window.location.href = '/sessionExpired';
				}
    	 	}
    	}); 

    	this.listenTo( this.collection, 'add', this.renderSubDocItem );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderSubDocItem");
		_.bindAll(this, "render"); 
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderSubDocItem( item );
		}, this);
	    console.log('SubDocListView');
	    if(this.collection.length < limit) {
			$('#findStatus').html("End Of Records");
			$('#subDocLoadMore').hide();
		} else {
			$('#findStatus').html("");
            $('#loadMore').append('<button id="subDocLoadMore" class="btn btn-outline btn-success">Load More</button>')
			//$('#subDocLoadMore').show();			
		}	
	    return this;  
	},

	renderSubDocItem:function(item){
		var subDocItemView = new admin.SubDocItemView({
			model: item
		});
	    this.$el.append(subDocItemView.render().el );
	}
});
