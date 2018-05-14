var app = app || {};

app.RegulatorListView = Backbone.View.extend({
	initialize: function() {
		this.collection = new app.MRegulatorList();
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
		                var failureMsg = "Error occurred while fetching Regulator Information. Please Contact Administrator.";  
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
		this.renderRegulator(item);
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

	renderRegulator: function( item ) {
		var regulatorView = new app.RegulatorView({
            		collection1 : this.collection2,
			model: item
		});
        this.$el.append( regulatorView.render().el );
        regulatorView.renderRegulation(); 
	}
});
