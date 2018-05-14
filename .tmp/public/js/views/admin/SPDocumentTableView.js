var admin = admin || {};

admin.SPDocumentTableView = Backbone.View.extend({
	initialize: function() {
		spclOffset = 0;
    console.log('Initialize SPDocumentTableView');		
		this.listenTo( this.collection, 'add', this.renderDocument );
		this.listenTo( this.collection, 'reset', this.render );
		// this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "renderDocument");
		_.bindAll(this, "render");
		this.render();
	},

	render: function() {
    	console.log('render SPDocument');
    	console.log('this.collection');console.log(this.collection);
    	$( this.el ).unbind();
			$( this.el ).empty();
   //  	$( '#doc-list-table' ).unbind();
			// $( '#doc-list-table' ).empty();
			this.collection.each(function( item ) {
	      	this.renderDocument( item );
			}, this );
    
		// if (this.collection.length < filelimit) {
		// 	$('#findStatus').html("End Of Records");
		// 	$('#loadMoreDocUpload').hide();
		// } else {
		// 	$('#findStatus').html("");
		// 	$('#loadMore').append(' <button id="loadMoreDocUpload" class="btn btn-outline btn-success">Load More</button>');
		// 	//$('#loadMore').show();			
		// }	    

		if (this.collection.length < spclLimit) {
            $('#findStatusSpclDoc').html("End Of Records");
            $('#loadMoreDocUploadSpcl').hide();
        } else {
            $('#findStatusSpclDoc').html("");
            $('#loadMoreSpclDoc').append(' <button id="loadMoreDocUploadSpcl" class="btn btn-outline btn-success">Load More</button>');
            //$('#loadMore').show();            
        }        	
    	return this;

	},	

	renderDocument: function( item ) {
		var spDocumentRowView = new admin.SPDocumentRowView({
			model: item
		});
    	this.$el.append( spDocumentRowView.render().el );
	},

});
