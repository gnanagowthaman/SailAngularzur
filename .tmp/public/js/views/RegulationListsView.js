var app = app || {};

app.RegulationListsView = Backbone.View.extend({

    initialize: function(options) {
        console.log("inside Regulation ListView");
		this.vid = options.vid;
		this.el = $("#"+this.vid);
		console.log(this.vid);
		this.dolist = new app.RegulationList();

    },
       
    render: function() {
        console.log(this.collection.length);
    	var _reglist = this;
		$.when( this.dolist.fetch()).done( function() {
			_reglist.collection.each(function(item) {
				_reglist.renderRegulation(item);
			}, _reglist );
		}).fail(function(data) {
	            try{
			        var errData = JSON.parse(data.responseText);
			        if ( errData.errCode == 550) {
		             	window.location.href = '/sessionExpired';
		        	} else {
				        if (errData.errMsg.length > 0) {
				        var failureMsg = errData.errMsg;  
			        } else {
			              var failureMsg = "Error while fetching regulation list. Please Contact Administrator.";  
			          }
				          $( "div.failure").html(failureMsg);
				          $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );        
	        	  	 } 
	      		} catch(e) {
	          		window.location.href = '/sessionExpired';
	      	  	  }     
	        });  
        		return this;        
	},	

	renderRegulation: function( item ) {
      	var id = item.get("id");
        var ge =this.dolist.where({gname :this.vid ,rid :id})[0];
		var gid = 0;
		if ( ge) gid = ge.get('gid'); 
		var regView = new app.RegulationView({
			model: item,
			gid : gid 
		});
		console.log("regulation redering");
        var rv = regView.render().el;
		this.el.append( rv );
        console.log("the selected dom");
        if ( ge == undefined ){
            var selector = "#"+this.vid+" #"+id;
            $(selector).removeClass("ridclass");
        }
			$(".ridclass").css("color", "black");               
	}	

});
