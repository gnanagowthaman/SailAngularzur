var admin = admin || {};

admin.RegulationTableView = Backbone.View.extend({
	initialize: function() {
    console.log('Initialize RegulationTableView');
    this.collection = new admin.RegulationTableCollection();
    offset = 0;
    this.collection.fetch({reset: true, data: { limit: reglimit, offset: offset }, processData: true,
        
	//this.collection.fetch({reset: true,
	    success: function(){
	    	console.log("success")
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
		this.listenTo( this.collection, 'add', this.renderRegulation );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderRegulation");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('render Regulation');
    	console.log('this.collection');
    	console.log(this.collection);
    	$( '#reg-list-table' ).unbind();
		$( '#reg-list-table' ).empty();
		console.log('render RegulationTableView');
		/*this.collection.each(function( item ) {
      	this.renderRegulation( item );
		}, this );*/
    	/*if (this.collection.length < limit) {
    		$('#findStatus').html("End of Regulations.");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderRegulation(item);
			}, this );
    	}
    	return this;*/
    	console.log('render RegulationTableView');
		this.collection.each(function( item ) {
      	this.renderRegulation( item );
		}, this );
    
		if (this.collection.length < reglimit) {
			$('#findStatus').html("End Of Records");
			$('#loadMoreReg').hide();
		} else {
			$('#findStatus').html("");
			//$('#loadMore').show();
			$('#loadMore').append('<button id="loadMoreReg" class="btn btn-outline btn-success">Load More</button>');			
		}	     	
    	return this;
	},

	renderRegulation : function( item ) {
  		var regulationRowView = new admin.RegulationRowView({
  			model: item
  		});
    	this.$el.append( regulationRowView.render().el );
	}

});
