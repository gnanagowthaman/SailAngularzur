var admin = admin || {};

admin.domaineditRowView = Backbone.View.extend({
    tagName: 'tr',    
    template: _.template( $( '#domaineditListRowTpl' ).html() ),

	events: {
        'click #deleteDomain': 'deletedomain'       
	}, 

	initialize: function() {
        // alert("this.model"+JSON.stringify(this.model));
    	_.bindAll(this, "render");
        this.model.bind('change', this.render());
	},

    render: function() {
        console.log(this.model);
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    }, 
    dataDismissModal : function(e){
        console.log(this.model);
        var modalId = this.model.get('domain_id');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }, 
    deletedomain: function() {       
        var self = this; 
        console.log(self.model.get('geography_id'));
        console.log(self.model.get('country_id'));
        console.log(self.model.get('state_id'));
            $.ajax({
                    type: 'DELETE',
                    url: '/deletedomain',
                    data: {
                        geography_id   :self.model.get('geography_id'),
                        domain_id   :self.model.get('domain_id'),
                        country_id :self.model.get('country_id'),
                        state_id : self.model.get('state_id'),
                    },
                    success: function(data) {
                        self.model.destroy();
                        self.dataDismissModal();                  
                        self.unbind();
                        self.remove();
                        $( "div.success").html("Domain Deleted Successfully.");
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
                                    var failureMsg = "Error while deleting the domain, Please Contact Administrator.";  
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
