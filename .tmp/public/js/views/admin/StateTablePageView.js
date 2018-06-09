var admin = admin || {};

admin.StateTablePageView = Backbone.View.extend({
    template: $( '#stateListTableTpl' ).html(),

	initialize: function() {
		console.log("StateTablePageView");
    	this.render();
	},

	events: {		
		'click #createstate' : 'createstate',
		'click #stateloadMore' : 'stateloadMore', 
		
	},
	render: function() {		
		this.$el.html(this.template);
    	console.log('Rendering StateTablePageView');
    	this.StateTableView = new admin.StateTableView({el: $( '#state-list-table' )});
		return this;
	},
	createstate : function (e) {
		e.preventDefault();
       	appRouter.navigate("renderstateForm", {trigger: true});
    },

    stateloadMore: function(e)  {        
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        offset += limit;
        console.log("limit : offset " + limit + ' : ' + offset);
        this.StateTableView.collection.fetch({
        	remove: false, 
        	data: { limit: limit, offset:offset }, 
        	processData: true,
            success: function (coll) {                
                console.log((self.StateTableView.collection.toJSON()));               
                if ((self.StateTableView.collection.length - offset) != limit) {
                    $('#findStatus').html("End Of Records");
                    $('#stateloadMore').hide();
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
                          var failureMsg = "Error while Loading user. Please Contact Administrator.";  
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


