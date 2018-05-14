var admin = admin || {};

admin.UserTableView = Backbone.View.extend({
	initialize: function() {
    console.log('Initialize UserListView');
		this.collection = new admin.UserCollection();
		offset = 0;
		var self = this;
		console.log('limit : offset'); console.log(limit + ' : ' + offset);
		// this.sorting =0;
		// this.collection.fetch({url: '/user', reset: true});
		this.collection.fetch({reset: true, data: { limit: limit, offset: offset }, processData: true,
        success: function(){
		    console.log("success");
		    console.log("user list",self.collection);
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
			  }catch(e){
			  	window.location.href = '/sessionExpired';
			}
	      }
	   });		
		this.listenTo( this.collection, 'add', this.renderUser );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderUser");
		_.bindAll(this, "render");
	},

	render: function() {
		// if ( this.sorting == 1) { 
		// 	console.log('sort 1');
		// 	$( '#user-list-table' ).unbind();
		// 	$( '#user-list-table' ).empty();
  //           this.sorting = 0;
		// }
		// else {
		$( '#user-list-table' ).unbind();
		$( '#user-list-table' ).empty();
		// }
		console.log('render UserTableView');
		console.log(this.collection.length);
		this.collection.each(function( item ) {
      	this.renderUser( item );
		}, this );
    
		if (this.collection.length < limit) {
			$('#findStatus').html("End Of Records");
			$('#loadMoreUser').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMore').append(' <button id="loadMoreUser" class="btn btn-outline btn-success">Load More</button>');
			$('#loadMore').show();			
		}	     	
    	return this;
	},

	renderUser: function( item ) {
		var userRowView = new admin.UserRowView({
			model: item
		});
    	this.$el.append( userRowView.render().el );
	},
});
