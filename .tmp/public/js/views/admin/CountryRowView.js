var admin = admin || {};

admin.CountryRowView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template( $( '#countryListRowTpl' ).html() ),

	events: {

        'click #deleteCountry' : 'deleteCountry',
        'click #tocreatecountry':'renderCountryEditForm' 

	}, 

	initialize: function() {
    	_.bindAll(this, "render");
         this.model.bind('change', this.render);
	},

    render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        //appRouter.navigate("managecountry", {trigger: true}); 
        return this;
    },

    dataDismissModal : function(e){
        var modalId = this.model.get('name') + this.model.get('id');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    },

    deleteCountry: function(e) { 
        var self = this;                         
        $.ajax({
                type: 'DELETE',
                url: '/destroycountry',
                data: {
                    country_id   :self.model.get('id'),
 
                },
                success: function(data) { 
                    self.dataDismissModal();                  
                    self.unbind();
                    self.remove();
                    console.log('DELETED');
 
                    $( "div.success").html("Geography Deleted Successfully.");

                    $( "div.success").html("Country Deleted Successfully.");
 
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
 
                          var failureMsg = "Error while deleting the Geography, Please Contact Administrator.";  

                          var failureMsg = "Error while deleting the Country, Please Contact Administrator.";  
 
                        }
                        $( "div.failure").html(failureMsg);
                        $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );              
                }
                }catch(err) {
                    window.location.href = '/sessionExpired';
                }
            }
        }); 
    },
    renderCountryEditForm: function (e) {
        e.preventDefault();
        appRouter.navigate("renderEditCountryForm/" + this.model.get('id'), {trigger: true});
    }
    
});	