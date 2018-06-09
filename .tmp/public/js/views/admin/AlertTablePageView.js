var admin = admin || {};

admin.AlertTablePageView = Backbone.View.extend({
    template: $( '#alertListTableTpl' ).html(),

	initialize: function() {
		console.log("AlertTablePageView");
    	this.render();
	},

	events: {		
		'click #createAlert' : 'createAlert',
		'click #alertloadMore' : 'alertloadMore', 
		
	},
	render: function() {		
		this.$el.html(this.template);
    	console.log('Rendering AlertTablePageView');
    	this.AlertTableView = new admin.AlertTableView({el: $( '#alert-list-table' )});
		return this;
	},
	createAlert : function (e) {
		e.preventDefault();
       	appRouter.navigate("renderAlertForm", {trigger: true});
    },

    alertloadMore: function(e)  {        
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        offset += limit;
        console.log("limit : offset " + limit + ' : ' + offset);
        this.AlertTableView.collection.fetch({
        	remove: false, 
        	data: { limit: limit, offset:offset }, 
        	processData: true,
            success: function (coll) {                
                console.log((self.AlertTableView.collection.toJSON()));               
                if ((self.AlertTableView.collection.length - offset) != limit) {
                    $('#findStatus').html("End Of Records");
                    $('#alertloadMore').hide();
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
                          var failureMsg = "Error while Loading alerts. Please Contact Administrator.";  
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


