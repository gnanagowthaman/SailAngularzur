var admin = admin || {};

admin.RegulatorTablePageView = Backbone.View.extend({
    template: $( '#regulatorListTableTpl' ).html(),

	initialize: function() {
		console.log("RegulatorTablePageView");
    	this.render();
	},

	events: {		
		'click #createregulator' : 'createRegulator',
		'click #regulatorloadMore' : 'regulatorloadMore',
		
	},
	render: function() {		
		this.$el.html(this.template);
    	console.log('Rendering RegulatorTablePageView');
    	this.RegulatorTableView = new admin.RegulatorTableView({el: $( '#regulator-list-table' )});
		return this;
	},
	createRegulator : function (e) {
		e.preventDefault();
       	appRouter.navigate("renderRegulatorForm", {trigger: true});
    },

    
    regulatorloadMore: function(e)  {        
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        // this.userList.sorting = 0;
        offset += limit;
        console.log("limit : offset " + limit + ' : ' + offset);
        this.RegulatorTableView.collection.fetch({
        	remove: false, 
        	data: { limit: limit, offset:offset }, 
        	processData: true,
            success: function (coll) {                
                console.log((self.RegulatorTableView.collection.toJSON()));               
                if ((self.RegulatorTableView.collection.length - offset) != limit) {
                    $('#findStatus').html("End Of Records");
                    $('#regulatorloadMore').hide();
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


