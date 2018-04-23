var admin = admin || {};

admin.CountryTablePageView = Backbone.View.extend({
    template: $( '#countryListTableTpl' ).html(),

	initialize: function() {
		console.log("CountryTablePageView");
    	this.render();
	},

	events: {		
		'click #createcountry' : 'createcountry',
		'click #countryloadMore' : 'countryloadMore', 
		
	},
	render: function() {		
		this.$el.html(this.template);
    	console.log('Rendering CountryTablePageView');
    	this.CountryTableView = new admin.CountryTableView({el: $( '#country-list-table' )});
		return this;
	},
	createcountry : function (e) {
		e.preventDefault();
       	appRouter.navigate("rendercountryForm", {trigger: true});
    },

    countryloadMore: function(e)  {        
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        offset += limit;
        console.log("limit : offset " + limit + ' : ' + offset);
        this.CountryTableView.collection.fetch({
        	remove: false, 
        	data: { limit: limit, offset:offset }, 
        	processData: true,
            success: function (coll) {                
                console.log((self.CountryTableView.collection.toJSON()));               
                if ((self.CountryTableView.collection.length - offset) != limit) {
                    $('#findStatus').html("End Of Records");
                    $('#countryloadMore').hide();
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


