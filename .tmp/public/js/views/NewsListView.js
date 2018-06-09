    var app = app || {};
     
    app.NewsListView = Backbone.View.extend({
     
        el: $( '#newsList'),
        initialize: function(options) {
            console.log('Initialize NewsListView');
            var _selfReference = this;
            this.collection = new app.NewsList(); 
            var geoId = options.geoId;
            this.collection.fetch({
                url: '/news',
                wait : true,
                reset: true,
                data: {geoId: geoId},
                 processData: true,
                 //url:'/findSubscription',
                 success:function(){
                     console.log("Subscription success");
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
                                    var failureMsg = "Error occurred while fetching news. Please Contact Administrator.";    
                              }
                            $( "div.failure").html(failureMsg);
                            $( "div.failure" ).fadeIn( 300 ).delay( 3500 ).fadeOut( 800 );                
                        }
                    }catch(e){
                           window.location.href = '/sessionExpired';
                     }
                  }
            }); 
                this.listenTo( this.collection, 'add', this.renderNews );
                this.listenTo( this.collection, 'reset', this.render );
                this.listenTo( this.collection, 'sort', this.render );
                _.bindAll(this, "renderNews");
                _.bindAll(this, "render");
        },
     
        render: function() {
            this.collection.each(function(item) {
                this.renderNews( item );
            }, this);
            console.log(JSON.stringify(this.collection));
              return this;  
        },
     
        renderNews:function(item){
            var newsItemView = new app.NewsItemView({
                model: item
            });
            this.$el.append(newsItemView.render().el );
        }
     
    });