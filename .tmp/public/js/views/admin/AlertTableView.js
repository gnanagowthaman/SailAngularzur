var admin = admin || {};

admin.AlertTableView = Backbone.View.extend({
	initialize: function() {
    console.log('Initialize AlertTableView');
		this.collection = new admin.AlertCollection();
		offset = 0;
		console.log('limit : offset'); console.log(limit + ' : ' + offset);
		// skip = 0;
		// this.sorting =0;
		// this.collection.fetch({reset: true, data: { limit: limit }, processData: true}	);
		console.log(this.collection.length);
		this.collection.fetch({reset: true, data: { limit: limit, offset: offset }, processData: true,
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
			  		  	var failureMsg = "Error occurred while fetching the data. Please Contact Administrator.";	
			  		  }
						$( "div.failure").html(failureMsg);
		            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
				 }
			}catch(e) {
                window.location.href = '/sessionExpired';
             }
          }
      });		
		this.listenTo( this.collection, 'add', this.renderAlert );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderAlert");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('render Alert');
    	console.log('this.collection');console.log(this.collection.length);
    	if (this.collection.length == 0) {
    		$('#findStatus').html("No Alert created. Please create.");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
			this.collection.each(function(item) {
	      		//console.log(item.attributes);
				this.renderAlert(item);
			}, this );
    	}
    	if (this.collection.length < limit) {
			$('#findStatus').html("End Of Records");
			$('#alertloadMore').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append('<button id="alertloadMore" class="btn btn-outline btn-success">Load More</button>');
			//$('#countryloadMore').show();			
		} 
    	return this;
	},	

	renderAlert: function( item ) {
		var AlertRowView = new admin.AlertRowView({
			model: item
		});
    	this.$el.append( AlertRowView.render().el );
	},

});
