var admin = admin || {};

admin.RegulationRowView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template( $( '#regulationListRowTpl' ).html() ),

	events: {
        'click #editRegulation': 'editRegulation',
        'click #delRegulation' : 'deleteRegulation',
        'change #regStatus'      : 'isSelected',
	},
	initialize: function() {
    	_.bindAll(this, "render");
        this.model.bind('change', this.render);
	},
    render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        console.log(this.model);
        console.log(this.model.get('regulation_status'));
        this.regStatus = this.model.get('regulation_status');
        this.$el.find('#regStatus').val(this.regStatus);

        return this;
    },

    editRegulation: function(e) {
        appRouter.navigate("renderEditRegulationPage/" + this.model.get('id'), {trigger: true});
    },
    dataDismissModal : function(e){
        console.log(this.model);
        var modalId = this.model.get('id');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    },
    deleteRegulation: function(e) {
        console.log(this.model.get('id'));
        console.log(this.model);
        var self = this;                       
            $.ajax({
                    type: 'DELETE',
                    url: '/destroy',
                    data: {
                        geography_id  :self.model.get('geography_id'),
                        regulation_id :self.model.get('id'),
                        domain_id     :self.model.get('domain_id'),
                        document_id   :self.model.get('document_id'),
                    },
                    success: function(data) {
                        self.dataDismissModal();                  
                        self.unbind();
                        self.remove();
                        console.log('DELETED');
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
                        }catch(e) {
                            window.location.href = '/sessionExpired';
                        }
                    }
             });                            
    },

    isSelected: function(e) {
        console.log('isSelected Triggered');
        console.log(this.model.get('id'));
        console.log(this.$el.find('#regStatus option:selected').val());
        var regFormData = {};
        
        var selectedRegStatus = this.$el.find('#regStatus option:selected').val();
        console.log(selectedRegStatus);
        var regulation_id = this.model.get('id');

            var self = this; 
            $.ajax({
                    type: 'POST',
                    url: '/updateRegStatus',
                    data: {
                       regulationStatus : selectedRegStatus,
                       regulation_id     : regulation_id,
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
