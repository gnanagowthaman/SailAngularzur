var admin = admin || {};

admin.DocumentTableView = Backbone.View.extend({
	initialize: function() {
    console.log('Initialize DocumentTableView');
		// this.collection = new admin.DocumentTableCollection();
		mainDocOffset = 0;
		console.log('limit : offset'); 
		console.log(limit + ' : ' + offset);

		// skip = 0;
		// this.sorting =0;
		//BELOW CODE COMMENTED BY NIRANJAN. This collection moved to DocumentTablePageView
		// this.collection.fetch({reset: true, data: { limit: filelimit, offset: offset }, processData: true,	
		// //this.collection.fetch({reset: true,
		//     success: function()
		//     {
	 //          console.log("success")
		//     }, 
		//     error: function(data) {
		//   		try{
		// 		  	var errData = JSON.parse(data.responseText);
		// 		  	if ( errData.errCode == 550) {
		// 			  	window.location.href = '/sessionExpired';
		// 			} else {
		// 				if (errData.errMsg.length > 0) {
		// 		  		  var failureMsg = errData.errMsg;	
		// 		  		} else {
		// 		  		  	var failureMsg = "Error occurred while fetching the Regulations. Please Contact Administrator.";	
		// 		  		}
		// 					$( "div.failure").html(failureMsg);
		// 	            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
		// 			  }
		// 		}catch(e) {
		//             window.location.href = '/sessionExpired';
		//          }
		//     }
		// });		
		this.listenTo( this.collection, 'add', this.renderDocument );
		// this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderDocument");
		_.bindAll(this, "render");
		this.render();
	},

	render: function() {
    	console.log('render Document');
    	console.log('this.collection');console.log(this.collection);
    	$( '#doc-list-table' ).unbind();
			$( '#doc-list-table' ).empty();

    	/*if (this.collection.length < limit) {
    		$('#findStatus').html("End of Documents uploaded.");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderDocument(item);
			}, this );
    	}*/
    	//return this;
    	console.log('render DocumentTableView');
		this.collection.each(function( item ) {
      	this.renderDocument( item );
		}, this );
    
		if (this.collection.length < mainDocLimit) {
			$('#findStatus').html("End Of Records");
			$('#loadMoreDocUpload').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append(' <button id="loadMoreDocUpload" class="btn btn-outline btn-success">Load More</button>');
			//$('#loadMore').show();			
		}	     	
    	return this;

	},	

	renderDocument: function( item ) {
		var documentRowView = new admin.DocumentRowView({
			model: item
		});
    	this.$el.append( documentRowView.render().el );
	},

});
