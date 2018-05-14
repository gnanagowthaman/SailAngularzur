var admin = admin || {};

admin.StateTableView = Backbone.View.extend({
	initialize: function() {
    console.log('Initialize GeoTableView');
		this.collection = new admin.StateCollection();
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
			  		  	var failureMsg = "Error occurred while fetching the Country. Please Contact Administrator.";	
			  		  }
						$( "div.failure").html(failureMsg);
		            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
				 }
			}catch(e) {
                window.location.href = '/sessionExpired';
             }
          }
      });		
		this.listenTo( this.collection, 'add', this.renderState );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderState");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('render State');
    	console.log('this.collection');console.log(this.collection);
    	if (this.collection.length == 0) {
    		$('#findStatus').html("No State uploaded. Please upload.");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
    		var disableEdit = false;
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderState(item);
				// if(item.attributes.name.toUpperCase() == "ALL" && disableEdit == false){
				// 	console.log("test :::" + item.attributes.name);
				// 	disableEdit = true;
				// 	$('#hide').hide();
				// }
			}, this );
    	}
    	if (this.collection.length < limit) {
			$('#findStatus').html("End Of Records");
			$('#stateloadMore').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append('<button id="stateloadMore" class="btn btn-outline btn-success">Load More</button>');		
		} 
    	return this;
	},	

	renderState: function( item ) {
		var StateRowView = new admin.StateRowView({
			model: item
		});
    	this.$el.append( StateRowView.render().el );
	},

});
