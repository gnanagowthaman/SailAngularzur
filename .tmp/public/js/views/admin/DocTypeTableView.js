var admin = admin || {};

admin.DocTypeTableView = Backbone.View.extend({
	initialize: function() {

    console.log('Initialize DocTypeTableView');
		this.collection = new admin.DoctypeCollection();
		// skip = 0;
		// this.sorting =0;
		// this.collection.fetch({reset: true, data: { limit: limit }, processData: true}	);
		doc_m_offset = 0;
		console.log('doc_m_limit : doc_m_offset');
	    console.log(doc_m_limit + ' : ' + doc_m_offset);  	
		console.log("this.collection.length"+  this.collection.length);
		this.collection.fetch({reset: true, data: { limit: doc_m_limit , offset: doc_m_offset }, processData: true,
		success: function(){
		    console.log("success");
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
			  		  var failureMsg = "Error occurred while fetching the Documents. Please Contact Administrator.";	
			  		}
						$( "div.failure").html(failureMsg);
		            	$( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );				
				 }
			}catch(e) {
                window.location.href = '/sessionExpired';
            }
        }

	});		
		this.listenTo( this.collection, 'add', this.renderDocType );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderDocType");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('render   DocType');
    	console.log('this.collection');
    	console.log(this.collection);
    	console.log("this.collection.length::::::::::"+this.collection.length);

    	if (this.collection.length == 0) {
    		$('#findStatus').html("No documents uploaded. Please upload.");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderDocType(item);
			}, this );
    	}

    	 if (this.collection.length < doc_m_limit) {
			$('#findStatus').html("End Of Records");
			$('#docloadMore').hide();
		} else {
			$('#findStatus').html("");
		    $('#loadMore').append('<button id="docloadMore" class="btn btn-outline btn-success">Load More</button>');
			//$('#docloadMore').show();			
		}	     
    	return this;
	},	

	renderDocType: function( item ) {
		var DocTypeRowView = new admin.DocTypeRowView({
			model: item
		});
    	this.$el.append( DocTypeRowView.render().el );
	}

});
