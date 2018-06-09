var admin = admin || {};

admin.GeoTablePageView = Backbone.View.extend({
    template: $( '#geoListTableTpl' ).html(),

	initialize: function() {
		console.log("GeoTablePageView");
    	this.render();
	},

	events: {		
		'click #creategeo' : 'createGeo',
		'click #geoloadMore' : 'geoloadMore',  //   by vinitha 06.07.17
		
	},
	render: function() {		
		this.$el.html(this.template);
    	console.log('Rendering GeoTablePageView');
    	this.GeoTableView = new admin.GeoTableView({el: $( '#doc-list-table' )});
		return this;
	},
	createGeo : function (e) {
		e.preventDefault();
       	appRouter.navigate("renderGeoForm", {trigger: true});
    },

    // by vinitha - 06.07.17 for loadmore feature
    geoloadMore: function(e)  {        
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        // this.userList.sorting = 0;
        offset += limit;
        console.log("limit : offset " + limit + ' : ' + offset);
        this.GeoTableView.collection.fetch({
        	remove: false, 
        	data: { limit: limit, offset:offset }, 
        	processData: true,
            success: function (coll) {                
                console.log((self.GeoTableView.collection.toJSON()));               
                if ((self.GeoTableView.collection.length - offset) != limit) {
                    $('#findStatus').html("End Of Records");
                    $('#geoloadMore').hide();
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


