var admin = admin || {};

admin.CreateUserRowView = Backbone.View.extend({
    tagName: 'tr',    
    template: _.template( $( '#createuserListRowTpl' ).html() ),

	events: {
        'click #deleteRegulation': 'deleteregulation'       
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
        var modalId = this.model.get('subscription_id');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }, 
    deleteregulation: function() { 

 var self = this; 

              if( self.model.get('newOne') == "yes")
              {
                self.model.destroy();
                self.dataDismissModal();                  
                        self.unbind();
                        self.remove();
                       // self.render();
                        $( "div.success").html("user table data Deleted Successfully.");
                        $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );      

              }
              else
              {
               
                $.ajax({
                    type: 'DELETE',
                    url: '/deleteuser',
                    data: {
                        userid : self.model.get('user_id'),
                        geography_id   :self.model.get('geography_id'),
                        regulation_id   : self.model.get('regulation_id'),
                        country_id : self.model.get('country_id'),
                        state_id : self.model.get('state_id')
                    },
                    success: function(data) {
                        self.model.destroy();
                        self.dataDismissModal();                  
                        self.unbind();
                        self.remove();
                        $( "div.success").html("user table data Deleted Successfully.");
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
                                    var failureMsg = "Error while deleting the data in user table, Please Contact Administrator.";  
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
       
       }
});	
