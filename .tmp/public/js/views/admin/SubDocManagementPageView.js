var admin = admin || {};

admin.SubDocManagementPageView = Backbone.View.extend({
    template: $( '#subDocManagementPageViewTpl' ).html(),

	initialize: function() {
		this.render();    
	},

	events:{
		'click #createSubDoc' :'creatSubDoc',
		'click #subDocLoadMore'   :'subDocloadMore'
	},

	render: function() {					
        this.$el.html(this.template);     
    	console.log('Rendering SubDocManagementPageView'); 
        this.subDocListRow = new admin.SubDocListView({el: $( '#subDocList' )});
		return this;
	},

	creatSubDoc:function(e){
		e.preventDefault();
        appRouter.navigate("renderSubDocForm", {trigger: true});
	},

	subDocloadMore:function(e){
		e.preventDefault();
		  self=this;
        console.log('Rendering loadMore for sub documents');
        offset += limit;
	    console.log("limit : offset " + limit + ' : ' + offset);
	    this.subDocListRow.collection.fetch({
        	remove: false, 
            data: { limit: limit, offset:offset }, 
            processData: true,
            success: function (coll) {                
                console.log((self.subDocListRow.collection.toJSON()));               
                if ((self.subDocListRow.collection.length - offset) != limit) {
                    $('#findStatus').html("End Of Records");
                    $('#subDocLoadMore').hide();
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
                          var failureMsg = "Error while Loading sub documents. Please Contact Administrator.";  
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