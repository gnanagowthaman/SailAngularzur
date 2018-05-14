var admin = admin || {};

admin.GeoTableView = Backbone.View.extend({
	initialize: function() {
    console.log('Initialize GeoTableView');
		this.collection = new admin.GeographyCollection();
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
			  		  	var failureMsg = "Error occurred while fetching the Geography. Please Contact Administrator.";	
			  		  }
						$( "div.failure").html(failureMsg);
		            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
				 }
			}catch(e) {
                window.location.href = '/sessionExpired';
             }
          }
      });		
		this.listenTo( this.collection, 'add', this.renderGeo );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderGeo");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('render Geo');
    	console.log('this.collection');console.log(this.collection);
    	if (this.collection.length == 0) {
    		$('#findStatus').html("No documents uploaded. Please upload.");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
    		var disableEdit = false;
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderGeo(item);
				// if(item.attributes.name == "All" && disableEdit == false){
				// 	console.log("test :::" + item.attributes.name);
				// 	disableEdit = true;
				// 	$('#hide').hide();
				// }
				//this.disableEditDelete();
			}, this );
    	}
    	if (this.collection.length < limit) {
			$('#findStatus').html("End Of Records");
			$('#geoloadMore').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append('<button id="geoloadMore" class="btn btn-outline btn-success">Load More</button>');
			//$('#geoloadMore').show();			
		}	   
    	return this;
	},	

	renderGeo: function( item ) {
		var GeoRowView = new admin.GeoRowView({
			model: item
		});
    	this.$el.append( GeoRowView.render().el );
	},

	// disableEditDelete : function(e) {
	// 	var all = this.collection.search({name:"ALL"});
	// 	console.log(all);
	// 	if(all){
	// 		//$('#tocreategeo').hide();
	// 		$('#hide').hide();
	// 	}else{
	// 		alert("test 2");
	// 	}
	// }

});
