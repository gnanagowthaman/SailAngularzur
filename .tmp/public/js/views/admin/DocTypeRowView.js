var admin = admin || {};

admin.DocTypeRowView = Backbone.View.extend({
    tagName: 'tr',    
    template: _.template( $( '#doctypeListRowTpl' ).html() ),

	events: {
        'click #toeditdoctype':'renderdoctypeEditForm',
        'click #delDocumentType' : 'deletedoctype'
	}, 

	initialize: function() {
    	_.bindAll(this, "render");
        this.model.bind('change', this.render);
	},

    render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    },
    dataDismissModal : function(e){
        console.log(this.model);
        var modalId = this.model.get('id');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    },
    
    deletedoctype: function(e) {  
        console.log(this.model.get('id'));
        var self = this;                       
        $.ajax({
                type: 'DELETE',
                url: '/destroydocument',
                data: {
                    document_id :self.model.get('id'),
                },
                success: function(data) {
                    self.dataDismissModal();                  
                    self.unbind();
                    self.remove();
                    console.log('DELETED');
                    $( "div.success").html("Document Deleted Successfully.");
                    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );                         
                },
                error: function(data) {
                    try{
                        var errData = JSON.parse(data.responseText);
                        if ( errData.errCode == 550) {
                            window.location.href = '/sessionExpired';
                        } else {
                            if (errData.errMsg.length > 0) {
                              var failureMsg = errData.errMsg;  
                            } else {
                              var failureMsg = "Error while deleting the Document, Please Contact Administrator.";  
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
    renderdoctypeEditForm: function (e) {
        e.preventDefault();        
        appRouter.navigate("renderEditDoctypeForm/" + this.model.get('id'), {trigger: true});
    }  
});	