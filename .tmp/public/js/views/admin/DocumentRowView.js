var admin = admin || {};

admin.DocumentRowView = Backbone.View.extend({
    tagName: 'tr',    
    template: _.template( $( '#documentListRowTpl' ).html() ),

	events: {
        'click #delDocument': 'deleteDocument',
        'click #publishDocument': 'publishDocument'    
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
        var modalId = this.model.get('fid') +this.model.get('fname');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    },
    
    deleteDocument: function(e) {       
            var _self = this;
            this.model.destroy({
                wait: true,
                success: function() {
                    console.log('Deleted Doc File: ' + _self.model.get('fname') + '[' + _self.model.get('fid') + ']');
                    _self.dataDismissModal();                  
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
            // $( "div.success").html("<center>Document will be published in few seconds.</center>");
            // $( "div.success" ).fadeIn(300).delay(3500).fadeOut(400);            
            this.model.save({ispublished: true, tobepublished:true}, {
                wait: true,  //this parameter is key to trigger change event,if it is false change event trigger even if there is an error
                patch: true, //this parameter is used here to pass only required attributes. Here only ispublished
                success: function(data) {
                    console.log('publish Doc File: ' + _self.model.get('fname') + '[' + _self.model.get('fid') + ']');
                    console.log('publish Doc File: ' + _self.model.get('ispublished'));
                    console.log('tobepublished ' + _self.model.get('tobepublished'));
                    console.log(data);
                    _self.dataDismissModal();                  
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
                        window.location.href = '/sessionExpired';
                     }
                }
            });         
    },

});	