var admin = admin || {};

admin.RegulatorTableView = Backbone.View.extend({
	initialize: function() {
    console.log('Initialize RegulatorTableView');
		this.collection = new admin.RegulatorCollection();
		offset = 0;
		console.log('limit : offset'); console.log(limit + ' : ' + offset);
		// skip = 0;
		// this.sorting =0;
		// this.collection.fetch({reset: true, data: { limit: limit }, processData: true}	);
		console.log(this.collection.length);
		this.collection.fetch({reset: true, data: { limit: doclimit, offset: offset }, processData: true,
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
			  		  	var failureMsg = "Error occurred while fetching the regulator. Please Contact Administrator.";	
			  		  }
						$( "div.failure").html(failureMsg);
		            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
				 }
			}catch(e) {
                window.location.href = '/sessionExpired';
             }
          }
      });		
		this.listenTo( this.collection, 'add', this.renderRegulator );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderRegulator");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('render Regulator');
    	console.log('this.collection');console.log(this.collection);
    	$( '#regulator-list-table' ).unbind();
		$( '#regulator-list-table' ).empty();
    	//if (this.collection.length == 0) {
    	//	$('#findStatus').html("No documents uploaded. Please upload.");
    	//} else {
    		//$('#findStatus').empty(); // or we can use $('#findStatus').html("")
    		console.log('render RegulatorTableView');
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderRegulator(item);
			}, this );
    	//}
    	if (this.collection.length < doclimit) {
			$('#findStatus').html("End Of Records");
			$('#regulatorloadMore').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append('<button id="regulatorloadMore" class="btn btn-outline btn-success">Load More</button>');
			//$('#regulatorloadMore').show();			
		}	   
    	return this;
	},	

	renderRegulator: function( item ) {
		var RegulatorRowView = new admin.RegulatorRowView({
			model: item
		});
    	this.$el.append( RegulatorRowView.render().el );
	},

});
