var admin = admin || {};

admin.DocTypeTablePageView = Backbone.View.extend({
    template: $( '#doctypeListTableTpl' ).html(),

	initialize: function() {
		console.log("DocTypeTablePageView");
    	this.render();
	},

	events: {		
		'click #createdoctype' : 'createdoctype',
		'click #docloadMore'  :'docTypeLoadmore'
	},
	render: function() {
		this.$el.html(this.template);
	    console.log('Rendering DocTypeTablePageView');
	    this.DocTypeTableView = new admin.DocTypeTableView({el: $( '#doc-list-table' )});
	    // appRouter.navigate("renderDocumentListTable", {trigger: true});
		return this;
	},
	createdoctype : function (e) {
		e.preventDefault();
        appRouter.navigate("renderDocTypeForm", {trigger: true});
    },

    docTypeLoadmore:function(e){
    	e.preventDefault();
        self=this;
        console.log('Rendering loadMoreDocumentType');
        doc_m_offset += doc_m_limit;      
        console.log("doc_m_limit : doc_m_offset " + doc_m_limit + ' : ' + doc_m_offset);
        this.DocTypeTableView.collection.fetch({remove: false, data: { limit: doc_m_limit, offset:doc_m_offset }, 
        	processData: true,
            success: function (coll) {                
                console.log((self.DocTypeTableView.collection.toJSON()));               
                if ((self.DocTypeTableView.collection.length - doc_m_offset) != doc_m_limit) {
                    $('#findStatus').html("End Of Records");
                    $('#docloadMore').hide();
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
                          var failureMsg = "Error while Loading Document. Please Contact Administrator.";  
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


