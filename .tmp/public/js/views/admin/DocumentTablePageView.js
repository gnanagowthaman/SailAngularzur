var admin = admin || {};

admin.DocumentTablePageView = Backbone.View.extend({
    template: $( '#documentListTableTpl' ).html(),

	initialize: function() {
        mainDocOffset = 0;
        spclOffset = 0;
        appRouter.spParentPage = 'DocumentTablePageView';
        this.docCollection = new admin.DocumentTableCollection();
        this.sPDocCollection = new admin.SPDocCollection();
        var _self = this;
    	// this.render();
        $.when(
            this.sPDocCollection.fetch({reset: true, data: { limit: spclLimit, offset: spclOffset }, processData: true}),
            this.docCollection.fetch({reset: true, data: { limit: mainDocLimit, offset: mainDocOffset }, processData: true})
        ).done(function () {
            _self.render();
            console.log('Rendering DocumentTableView');
            appRouter.DocumentTableView = new admin.DocumentTableView({el: $( '#doc-list-table' ), collection: _self.docCollection });                     
            console.log('SPECIAL DOC TYPE: ', _self.documentType);
            console.log('SPECIAL DOC: ', JSON.stringify(_self.sPDocCollection));
            console.log('Rendering SPDocumentTableView');
            _self.spDocumentTableView = new admin.SPDocumentTableView({el: $( '#spdoc-list-table' ), collection: _self.sPDocCollection });                    
        });
	},

	events: {
		'click #renderFileUploadPage': 'renderFileUploadPage',
		'click #loadMoreDocUpload'   : 'loadMore',
        'click #loadMoreDocUploadSpcl' : 'loadMoreDocUploadSpcl'
	},

	render: function() {			
		this.$el.html(this.template);
	    // console.log('Rendering DocumentTablePageView');
	    // this.DocumentTableView = new admin.DocumentTableView({el: $( '#doc-list-table' )});
	    // appRouter.navigate("renderDocumentListTable", {trigger: true});
            
		return this;
	},

	renderFileUploadPage: function (e) {
		e.preventDefault();
	    console.log('File Upload Page');
	    appRouter.navigate("renderFileUploadPage", {trigger: true});
    },
    loadMore: function(e)  {        
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        // this.userList.sorting = 0;
        mainDocOffset += mainDocLimit;
        console.log("filelimit : offset " + mainDocLimit + ' : ' + mainDocOffset);
        appRouter.DocumentTableView.collection.fetch({
        	remove: false, 
        	data: { limit: mainDocLimit, offset:mainDocOffset }, 
        	processData: true,
            success: function (coll) {                
                console.log((appRouter.DocumentTableView.collection.toJSON()));               
                if ((appRouter.DocumentTableView.collection.length - mainDocOffset) != mainDocLimit) {
                    $('#findStatus').html("End Of Records");
                    $('#loadMoreDocUpload').hide();
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

    loadMoreDocUploadSpcl : function(e){
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        // this.userList.sorting = 0;
        spclOffset += spclLimit;
        console.log("filelimit : offset " + spclLimit + ' : ' + spclOffset);
       self.sPDocCollection.fetch({
            remove: false, 
            data: { limit: spclLimit, offset:spclOffset }, 
            processData: true,
            success: function (coll) {                
                console.log(coll);               
                if ((self.sPDocCollection.length - spclOffset) != spclLimit) {
                    $('#findStatusSpclDoc').html("End Of Records");
                    $('#loadMoreDocUploadSpcl').hide();
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


