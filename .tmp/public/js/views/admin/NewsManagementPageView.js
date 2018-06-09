var admin = admin || {};

admin.NewsManagementPageView = Backbone.View.extend({
    template: $( '#newsManagementPageViewTpl' ).html(),

	initialize: function() {
		this.render();    
	},

	events:{
		'click #createNews' :'createNews',
		'click #newsloadMore'   :'newsloadMore'
	},

	render: function() {					
        this.$el.html(this.template);     
    	console.log('Rendering NewsManagementPageView'); 
        this.newsListRow = new admin.NewsListView({el: $( '#newsList' )});
		return this;
	},

	createNews:function(e){
		e.preventDefault();
        appRouter.navigate("renderNewsForm", {trigger: true});
	},

	newsloadMore:function(e){
     	e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        offset += limit;
	    console.log("limit : offset " + limit + ' : ' + offset);
	    this.newsListRow.collection.fetch({
        	remove: false, 
            data: { limit: limit, offset:offset }, 
            processData: true,
            success: function (coll) {                
                console.log((self.newsListRow.collection.toJSON()));               
                if ((self.newsListRow.collection.length - offset) != limit) {
                    $('#findStatus').html("End Of Records");
                    $('#newsloadMore').hide();
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
    }      
});