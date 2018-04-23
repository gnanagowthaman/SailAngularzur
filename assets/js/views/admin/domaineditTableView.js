var admin = admin || {};

admin.domaineditTableView = Backbone.View.extend({
	initialize: function(options) {
    	console.log('Initialize editdomainTableView');
		this.collection = new admin.DomaineditTableCollection();
		this.domainId = options.domainId;		
		console.log("<<<<<<<<<<<<<<<<<<::" + this.domainId);
		this.collection.fetch({reset: true, data: { id: this.domainId }, processData: true,
		success: function(data){
		    console.log("success");
		    console.log(data);
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
			  		  var failureMsg = "Error occurred while fetching the Domain. Please Contact Administrator.";	
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
		console.log(this.collection);		
		this.listenTo( this.collection, 'add', this.renderDomain );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderDomain");
		_.bindAll(this, "render");
	},

	render: function() {
    	console.log('this.collection');
    	console.log("this.collection.length:::::"+this.collection.length);
    	if (this.collection.length == 0) {
    		//$('#findStatus').html("End of documents");
    	} else {
    		$('#findStatus').empty(); // or we can use $('#findStatus').html("")
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderDomain(item);
			}, this );
    	}
    	return this;
    	
	},	

	renderDomain: function( item ) {
		console.log('render Document');
		var domaineditRowView = new admin.domaineditRowView({
			model: item
		});
    	this.$el.append( domaineditRowView.render().el );
	}

});

