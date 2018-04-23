var admin = admin || {};

admin.AlertRowView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template( $( '#alertListRowTpl' ).html() ),

	events: {

        'click #deleteAlert' : 'deleteAlert',
        'click #toeditAlert':'renderEditAlertForm' 

	}, 

	initialize: function() {
    	_.bindAll(this, "render");
         this.model.bind('change', this.render);
	},

  render: function() {
       console.log("from the tablelist model", this.model)
        this.$el.html( this.template( this.model.attributes ) );
        //appRouter.navigate("managecountry", {trigger: true}); 
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
  deleteAlert: function() {
       var self = this;                      
      $.ajax({
            type: 'DELETE',
            url: '/destroyAlert',
            data: {                            
                alert_id   :self.model.get('id'),
            },
            success: function(data) {
                self.dataDismissModal();                  
                self.unbind();
                self.remove();
                console.log('DELETED');
                $( "div.success").html("Alert Deleted Successfully.");
                $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );      
                self.deletefromalertUser();
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
                            var failureMsg = "Error while deleting the Alert, Please Contact Administrator.";  
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

  renderEditAlertForm: function (e) {
        e.preventDefault();
        appRouter.navigate("renderEditAlertForm/" + this.model.get('id'), {trigger: true});
  },

  deletefromalertUser : function(){
     var self = this;                      
      $.ajax({
            type: 'DELETE',
            url: '/destroyAlertUser',
            data: {                            
                alert_id   :self.model.get('id'),
                message    : self.model.get('message')
            },
            success: function(data) {
                console.log('DELETED');
                $( "div.success").html("Alert Deleted Successfully.");
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
                            var failureMsg = "Error while deleting the Alert, Please Contact Administrator.";  
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