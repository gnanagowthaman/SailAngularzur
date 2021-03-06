var admin = admin || {};

admin.NewsItemView = Backbone.View.extend({

    tagName:'tr',
  	idName: 'newsList',
	template: $( '#newsListRowTpl' ).html(),

    initialize: function() {
    	_.bindAll(this, "render");
        this.model.bind('change', this.render);
	},

	render: function() {
		var tmpl = _.template( this.template );
		this.$el.html( tmpl( this.model.toJSON() ) );
		return this;
	},

	events:{
		'click #editNews'   :'editNews',
		'click #deleteNews' :   'deleteNews'
	},

	editNews: function (e) {
        e.preventDefault();
        appRouter.navigate("renderEditNewsForm/"+ this.model.get('id'), {trigger: true});
    },

    dataDismissModal : function(e){
        var modalId = this.model.get('name') + this.model.get('id');
        console.log('modalId: ', modalId);
        $('#' + modalId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    },
    

    deleteNews: function(e) { 
        var self = this;  
        console.log("news_id::::::::::"+this.model.get('id'));               
                            
            $.ajax({
                    type: 'DELETE',
                    url: '/destroynews',
                    data: {                            
                        id   :self.model.get('id'),
                    },
                    success: function(data) {
                      //self.model.destroy();
                      self.dataDismissModal();                  
                      self.unbind();
                      self.remove();
                      $( "div.success").html("News Deleted Successfully.");
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
                                    var failureMsg = "Error while deleting the News, Please Contact Administrator.";  
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