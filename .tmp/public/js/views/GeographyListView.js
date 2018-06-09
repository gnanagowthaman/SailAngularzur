var app = app || {};

app.GeographyListView = Backbone.View.extend({
	initialize: function() {
		this.collection = new app.MGeographyList();
		this.collection1 = new app.MDomainList();
		this.collection2 = new app.MRegulationList();
		this.collection3 = new app.MDocumentList();
		var _self = this;
        $.when(this.collection.fetch(),
			this.collection1.fetch(),       
			this.collection2.fetch(),       
			this.collection3.fetch()).done( function() {
			_self.render();
		}).fail(function(data) {
	        try{      
		        var errData = JSON.parse(data.responseText);
		        if ( errData.errCode == 550) {
		              window.location.href = '/sessionExpired';
		        } else {
		            if (errData.errMsg.length > 0) {
		                var failureMsg = errData.errMsg;  
		            } else {
		                var failureMsg = "Error occurred while fetching Geography Information. Please Contact Administrator.";  
		            }
		            $( "div.failure").html(failureMsg);
		            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
		          }
	        }catch(e){
	            window.location.href = '/sessionExpired';
	        }               
    	});     
    },
       
	render: function() {
		app.ClientAppRouter.currentDocument = this.collection3;
    		console.log(this.collection.length);
		this.collection.each(function(item) {
		this.renderGeography(item);
		}, this );
        var domainView = new app.DomainListView({
                   collection : this.collection1
        });
		domainView.render();
        var box = new app.DocTypeView();
		app.ClientAppRouter.doctype = box;
	   	box.render({reset : 0});
    	return this;
	},	

	renderGeography: function( item ) {
		var geoView = new app.GeographyView({
            		collection1 : this.collection2,
			model: item
		});
        this.$el.append( geoView.render().el );
        geoView.renderRegulation(); 
	}
});
