var admin = admin || {};

admin.regulationeditRowView = Backbone.View.extend({
    tagName: 'tr',    
    template: _.template( $( '#regulationeditListRowTpl' ).html() ),

	events: {
        'click #deleteRegulation': 'deleteregulation',
        'change' : 'isSelected'       
	}, 

	initialize: function() {
        // alert("this.model"+JSON.stringify(this.model));
    	_.bindAll(this, "render");
        this.model.bind('change', this.render());
	},

    render: function() {
        var _self = this;
        console.log(this.model);
        this.$el.html( this.template( this.model.attributes ) );
        this.regStatus = this.model.get('regulationStatus');
        this.$el.find('#selectregStatus').val(this.regStatus);
        // this.$el.find('#selectregStatus').children('option').each(function() {
        //     if ($(this).attr('value') == _self.model.get('regulationStatus')+'') {
        //        $(this).prop('selected', true); 
        //     }
        // });
        return this;
    }, 
    dataDismissModal : function(e){
        console.log(this.model);
        var modalId = this.model.get('regulation_id');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }, 
    deleteregulation: function() {       
       /* if (confirm("Do you want to delete : "+"Geography " + this.model.get('geography_name') +" Domain "+ this.model.get('domain_name') +" Regulation"+this.model.get('regulation_name') +" Document"+this.model.get('document_name')+" mapping ?")) {
            var _self = this;
            //alert("this.model::"+JSON.stringify(this.model));
            this.model.destroy({
                wait: true,
                success: function() {
                    console.log('Deleted Doc File: ' + _self.model.get('regulation_name') + '[' + _self.model.get('regulation_id') + ']');
                    _self.remove();
                    // docOffSet-=1;  
                    $( "div.success").html("Document Deleted Successfully.");
                    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );                    
                },
                error: function() {
                    $( "div.failure").html("Error while deleting the Document. Contact Administrator.");
                    $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );
                }
            });         
        }*/
       // alert("regulation_id::::::::::::::"+this.model.get(regulation_id));
        var self = this;
        console.log('MODEL: ', self.model); 
            $.ajax({
                    type: 'DELETE',
                    url: '/deleteregulation',
                    data: {
                        rdlid : self.model.get('rdlid'),
                        geography_id   :self.model.get('geography_id'),
                        regulation_id   : self.model.get('regulation_id'),
                        domain_id   :self.model.get('domain_id'),
                        document_id :self.model.get('document_id'),
                        country_id : self.model.get('country_id'),
                        state_id : self.model.get('state_id'),
                        regulator_id : self.model.get('regulator_id'),
                        sub_document_id : self.model.get('sub_document_id')
                    },
                    success: function(data) {
                        self.model.destroy();
                        self.dataDismissModal();                  
                        self.unbind();
                        self.remove();
                        $( "div.success").html("Regulation Deleted Successfully.");
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
                                    var failureMsg = "Error while deleting the Regulation, Please Contact Administrator.";  
                                }
                                    $( "div.failure").html(failureMsg);
                                    $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                             }
                        }catch(e){
                            window.location.href = '/sessionExpired';
                        }
                    }
             });          
    },

    isSelected: function(e) {
        console.log('isSelected Triggered');
        console.log(this.model.get('regulation_id'));
        var regFormData = {};
        
        var selectedRegStatus = this.$el.find('#selectregStatus option:selected').val();
       // regFormData.Regstatus = parseInt(selectedRegStatus,10);
        console.log(selectedRegStatus);
        var regulation_id = this.model.get('regulation_id');
        var geography_id   = this.model.get('geography_id');
        
        var domain_id   =this.model.get('domain_id');
        var document_id =this.model.get('document_id');
        var country_id = this.model.get('country_id');
        var state_id = this.model.get('state_id');
        var regulator_id = this.model.get('regulator_id');
        var sub_document_id = this.model.get('sub_document_id');
            var self = this; 
            $.ajax({
                    type: 'POST',
                    url: '/updateRegulationStatus',
                    data: {
                       regulationStatus : selectedRegStatus,
                       regulation_id     : regulation_id,
                       geography_id      : geography_id,
                       domain_id  : domain_id,
                       document_id : document_id,
                       country_id : country_id,
                       state_id : state_id,
                       regulator_id : regulator_id,
                       sub_document_id : sub_document_id
                    },
                    success: function(data) {
                       
                        $( "div.success").html("Regulation updated Successfully.");
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
                                    var failureMsg = "Error while updating the Regulation, Please Contact Administrator.";  
                                }
                                    $( "div.failure").html(failureMsg);
                                    $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                             }
                        }catch(e){
                            window.location.href = '/sessionExpired';
                        }
                    }
             });  

    } 
});	
