var admin = admin || {};

admin.SPDocumentRowView = Backbone.View.extend({
    tagName: 'tr',    
    template: _.template( $( '#spDocumentListRowTpl' ).html() ),

	events: {
        'click #delDocument': 'deleteDocument',
        'click #publishDocument': 'publishDocument',
        'click #editSpclDoc'    : 'renderEditSpclDocForm'
	},                                                                                                                                                                                                                                                                                                                                                                                                                                     

	initialize: function() {
    	_.bindAll(this, "render");
        this.model.bind('change', this.render);
	},

    render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    },
    dataDismissModal : function(operation) {
        var modalId = this.model.get('spid');
        if (operation == 'publish') {
            $('#pub' + modalId).modal('hide');
        } else {
            $('#del' + modalId).modal('hide');
        }
        
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    },
    
    deleteDocument: function(e) {       
        var _self = this;
        this.model.destroy({
            wait: true,
            // data: {'document_id': this.model.get('document_id'), 
            //        'regulation_document_id': this.model.get('regulation_document_id'),
            //        'file_id': this.model.get('file_id')
            //       },
            success: function() {
                console.log('Deleted Doc File: ' + _self.model.get('file_name') + '[' + _self.model.get('spid') + ']');
                _self.dataDismissModal('delete');                  
                _self.unbind();
                _self.remove();
                // docOffSet-=1;  
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
                          var failureMsg = "Error while deleting the Document. Please Contact Administrator.";  
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

    publishDocument: function(e) {       
            var _self = this;            
            this.model.save({is_published: true}, {
                wait: true,  //this parameter is key to trigger change event,if it is false change event trigger even if there is an error
                patch: true, //this parameter is used here to pass only required attributes. Here only ispublished
                success: function(data) {
                    _self.dataDismissModal('publish');                  
                    _self.unbind(); 
                    $( "div.success").html("Document Published Successfully.");
                    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );                    
                },
                error: function() {
                    try{
                        if ( errData.errCode == 550) {
                                window.location.href = '/sessionExpired';
                        } else {
                            console.log('Error in publishing');
                            console.log('publish Doc File: ' + _self.model.get('ispublished'));
                            $( "div.failure").html("Error while publishing the Document. Contact Administrator.");
                            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
                         }
                    }catch(e) {
                        console.log('ERROR ', e);
                        window.location.href = '/sessionExpired';                        
                     }
                }
            });         
    },

    renderEditSpclDocForm: function(e){
        e.preventDefault();
        appRouter.spDoc = {};
        appRouter.spDoc = this.model.toJSON();
        console.log('appRouter.spDoc', appRouter.spDoc);
        console.log(this.model);
        appRouter.navigate("renderEditSpclDocForm/" + this.model.get('spid')+ '/' + this.model.get('file_id'), {trigger: true});
    }

});	