    var app = app || {};
     
    app.AlertMapListView = Backbone.View.extend({
     
        el: $( '#alertList'),
        initialize: function() {
            console.log('Initialize Alert Map ListView');
            var _selfReference = this;
            this.collection = new app.AlertsList(); 
           
            this.collection.fetch({
                url: '/findAlert',
                wait : true,
                reset: true,
               data: {geoId: 0},
                 processData: true,
                 //url:'/findSubscription',
                 success:function(){
                     console.log("News success");
                      console.log(_selfReference.collection);
                     //_selfReference.render();
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
                                    var failureMsg = "Error occurred while fetching alerts. Please Contact Administrator.";    
                              }
                            $( "div.failure").html(failureMsg);
                            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );                
                        }
                    }catch(e){
                           window.location.href = '/sessionExpired';
                     }
                  }
            }); 
                
                _.bindAll(this, "render");
        },
     
        render: function() {
            this.collection.each(function(item) {
                this.renderAlerts( item );
            }, this);
            console.log(JSON.stringify(this.collection));
              return this;  
        },
     
        renderAlerts:function(item){
            var alertsItemView = new app.AlertMapItemView({
                model: item
            });
            this.$el.append(alertsItemView.render().el );
        }
     
    });