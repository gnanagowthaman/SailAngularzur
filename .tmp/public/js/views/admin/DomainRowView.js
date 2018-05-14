var admin = admin || {};

admin.DomainRowView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template( $( '#domainListRowTpl' ).html() ),

	events: {
      'click #tocreateDomain':'renderDomainEditForm',
      'click #delDomain' : 'deleteDomain'
        //'click #tocreateDomain': 'createDomainfn' 
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
  deleteDomain: function(e) { 
      var self = this;                      
      $.ajax({
            type: 'DELETE',
            url: '/destroydomain',
            data: {                            
                domain_id   :self.model.get('id'),
            },
            success: function(data) {
                self.dataDismissModal();                  
                self.unbind();
                self.remove();
                console.log('DELETED');
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
                            var failureMsg = "Error while deleting the Domain, Please Contact Administrator.";  
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
  renderDomainEditForm: function (e) {
      e.preventDefault();
      appRouter.navigate("renderEditDomainForm/"+ this.model.get('id'), {trigger: true});
  }  

});	