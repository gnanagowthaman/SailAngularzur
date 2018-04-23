var admin = admin || {};

admin.regulationeditTableView = Backbone.View.extend({
	initialize: function(options) {
    	console.log('Initialize editregulationTableView');
		this.collection = new admin.RegulationeditTableCollection();
		this.regId = options.regId;		
		this.collection.fetch({reset: true, data: { id: this.regId }, processData: true,
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
		// this.collection.fetch({reset: true});		
		this.listenTo( this.collection, 'add', this.renderDocument );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderDocument");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('this.collection', this.collection);
    	console.log("this.collection.length:::::"+this.collection.length);
    	if (this.collection.length == 0) {
    		//$('#findStatus').html("End of documents");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderDocument(item);
			}, this );
    	}
    	return this;
    	
	},	

	renderDocument: function( item ) {
		console.log('render Document');
		var regulationeditRowView = new admin.regulationeditRowView({
			model: item
		});
    	this.$el.append( regulationeditRowView.render().el );
	}

});

