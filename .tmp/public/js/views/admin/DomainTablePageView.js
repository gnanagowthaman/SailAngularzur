var admin = admin || {};

admin.DomainTablePageView = Backbone.View.extend({
    template: $( '#domainListTableTpl' ).html(),

	initialize: function() {
    	this.render();
	},

	events: {
		'click #createdomain'   : 'createDomain',
		'click #domainloadMore' : 'loadMore', //   by vinitha 06.07.17
	},
	render: function() {		
		this.$el.html(this.template);
	    console.log('Rendering DomainTablePageView');
	    this.DomainTableView = new admin.DomainTableView({el: $( '#doc-list-table' )});
	    // appRouter.navigate("renderDocumentListTable", {trigger: true});
		return this;
	},
	createDomain : function (e) {
		e.preventDefault();
   		appRouter.navigate("renderDomainForm", {trigger: true});
  	},

  	// by vinitha - 06.07.17 for loadmore feature
	loadMore: function(e)  {        
	    e.preventDefault();
	    self=this;
	    console.log('Rendering loadMore');
	    offset += limit;
	    console.log("limit : offset " + limit + ' : ' + offset);
	    this.DomainTableView.collection.fetch({
	    	remove: false, 
	    	data: { limit: limit, offset:offset }, 
	    	processData: true,
	        success: function (coll) {                
	            console.log((self.DomainTableView.collection.toJSON()));               
	            if ((self.DomainTableView.collection.length - offset) != limit) {
	                $('#findStatus').html("End Of Records");
	                $('#domainloadMore').hide();
	            }
	        },
	        error: function(data) {
	            try{
	                console.log(data);
	                console.log(JSON.parse(data));
	                var errData = JSON.parse(data.responseText);
	                if ( errCode == 550) {
	                    window.location.href = '/sessionExpired';
	                } else {
	                    if (errData.errMsg.length > 0) {
	                      var failureMsg = errData.errMsg;  
	                    } else {
	                      var failureMsg = "Error while Loading domain. Please Contact Administrator.";  
	                    }
	                        $( "div.failure").html(failureMsg);
	                        $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
	                  }
	            }catch(e) {
	                window.location.href = '/sessionExpired';
	            }
	        }
	    });        
    },


});


