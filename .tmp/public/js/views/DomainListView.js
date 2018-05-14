var app = app || {};

app.DomainListView = Backbone.View.extend({
	el : $("#domainrow"),

	initialize: function() {
           this.dolist = new app.DomainList();
	   app.ClientAppRouter.domain = this;
    },
	render: function() {
    	console.log('render');
    	console.log(this.collection.length);
		var _domview = this;
		$.when( this.dolist.fetch()).done( function() {
			_domview.collection.each(function(item) {
	  		_domview.renderDomain(item);
		}, _domview );
          	$(".didclass").css("color", "black");
        }).fail(function(data) {
	        try{      
		        var errData = JSON.parse(data.responseText);
		        if ( errData.errCode == 550) {
		              window.location.href = '/sessionExpired';
		        } else {
		            if (errData.errMsg.length > 0) {
		                var failureMsg = errData.errMsg;  
		            } else {
		                var failureMsg = "Error occurred while fetching Domains. Please Contact Administrator.";  
		            }
		            $( "div.failure").html(failureMsg);
		            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
		          }
	        }catch(e){
	            window.location.href = '/sessionExpired';
	        }               
    	});          
    		return this;
	},
		
	renderDomain: function( item ) {
		app.ClientAppRouter.rerender = 1;
		var domView = new app.DomainView({
			model: item
		});
        console.log(item.get("name"));
       	var dv = domView.render().el;
        this.$el.append( dv );
	},
        
	rerender: function( item ) {
        $(".didclass").css("color", "grey");
		app.ClientAppRouter.domain.collection.each(function (item) {
        console.log("domain re rendering");
        console.log(item.get("name"));
		var id = item.get('id');
        console.log(item.get("id"));
        var did = this.dolist.get(item.get("id") );
			if (did == undefined){
	            var selector = "#domainrow"+"  #"+id;
		 	    $(selector).removeClass("didclass");
	        }
 		}, this);
        $(".didclass").css("color", "black");
	}
  
});
