var admin = admin || {};

admin.DomainTableView = Backbone.View.extend({
	initialize: function() {
    console.log('Initialize DomainTableView');
		this.collection = new admin.DomainCollection();
		offset = 0;
		console.log('limit : offset'); console.log(limit + ' : ' + offset);
		// skip = 0;
		// this.sorting =0;
		// this.collection.fetch({reset: true, data: { limit: limit }, processData: true}	);
		this.collection.fetch({reset: true, data: { limit: limit, offset: offset }, processData: true,
		success: function()
		{
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
			  		  	var failureMsg = "Error occurred while fetching Domain. Please Contact Administrator.";	
		  			 }
						$( "div.failure").html(failureMsg);
		            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
				  }
          	}catch(e) {
                window.location.href = '/sessionExpired';
             }
        }
      });		
		this.listenTo( this.collection, 'add', this.renderDomain );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderDomain");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('render Domain');
    	console.log('this.collection');console.log(this.collection);
    	if (this.collection.length == 0) {
    		$('#findStatus').html("No documents uploaded. Please upload.");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderDomain(item);
			}, this );
    	}  

    	// by vinitha -06.07.17
	    if (this.collection.length < limit){
			$('#findStatus').html("End Of Records");
			$('#domainloadMore').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append('<button id="domainloadMore" class="btn btn-outline btn-success">Load More</button>');
			//$('#domainloadMore').show();			
		}	    
	    	return this;
	},	

	renderDomain: function( item ) {
		var DomainRowView = new admin.DomainRowView({
			model: item
		});
    	this.$el.append( DomainRowView.render().el );
	},

});
