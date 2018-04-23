var admin = admin || {};

admin.RegulationTablePageView = Backbone.View.extend({
  template: $( '#regulationListTableTpl' ).html(),
	initialize: function() {
    this.render();
	},
  events: {
    'click #renderCreateRegulationFormPage': 'renderCreateRegulationPage',
    'click #loadMoreReg'                     : 'loadMoreReg'
  },
	render: function() {
		this.$el.html(this.template);
    console.log('Rendering RegulationTablePageView');
    this.RegulationTableView = new admin.RegulationTableView({el: $( '#reg-list-table' )});
		return this;
	},
  renderCreateRegulationPage : function(e){
    e.preventDefault();
    appRouter.navigate("renderCreateRegulationPage", {trigger: true});
  },
  loadMoreReg: function(e)  {       
        e.preventDefault();
        self=this;
        console.log('Rendering loadMore');
        // this.userList.sorting = 0;
        offset += reglimit;
        console.log("limit : offset " + reglimit + ' : ' + offset);
        this.RegulationTableView.collection.fetch({
          remove: false, 
          data: { limit: reglimit, offset:offset }, 
          processData: true,
            success: function (coll) {                
                console.log((self.RegulationTableView.collection.toJSON()));               
                if ((self.RegulationTableView.collection.length - offset) != reglimit) {
                    $('#findStatus').html("End Of Records");
                    $('#loadMoreReg').hide();
                }
            },
            error: function(data) {
                try{
                    console.log(data);
                    console.log(JSON.parse(data));
                    var errData = JSON.parse(data.responseText);
                    if ( errCode == 550) {
                        window.location.href = '/sessionExpired';
                    } else {
                        if (errData.errMsg.length > 0) {
                          var failureMsg = errData.errMsg;  
                        } else {
                          var failureMsg = "Error while Loading user. Please Contact Administrator.";  
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

});
