var admin = admin || {};
 
admin.CountryAlertCollectionView = Backbone.View.extend({
 
    initialize: function(options) {
        console.log('Initialize CountryAlertCollectionView');
      //  console.log('countryCollection'); console.log(options.dataCollection);
       //    console.log("countryCollection",JSON.stringify(options.dataCollection));
        //this.collecticon = new admin.CountryCollection(options.countryCollection);
      //  this.collectionC = []; //new admin.CountryCollection(options.dataCollection);
 
      //  console.log("countryCollection  1",JSON.stringify(this.collectionC));
      this.endChain=options.endChain;
      this.title="country";
 
        _.bindAll(this, "renderCountry");
        _.bindAll(this, "render");
        this.render();
    },
 
    events: {
     'change' : 'isSelected' 
    },
 
    render: function() {
        console.log('Rendering CountryAlertCollectionView');
        this.$el.html( '<option value="">Select</option>' );
     
         if( this.collection )
         {
            $("#selectCountry option[value='']").remove();
            this.collection.each(function(item) {
                console.log("each item "+JSON.stringify(item));
                  console.log(item.get('cntid'));console.log(item.get('name'));
                this.renderCountry(item);
            }, this );
        }
        return this;
    },    
 
    renderCountry: function( item ) {
        var countryItemView = new admin.CountryItemView({
            model: item
        });
       countryItemView.setValueIds("cntid","name");
        this.$el.append( countryItemView.render().el );
    },
 
    
 
    isSelected: function(e) {    
 
        e.preventDefault();
        _self = this;
 
        if( this.endChain != this.title )
        {
            console.log('Country Triggered'); 
           // var countryID = parseInt($(this.el).val(), 10);
 
            var geoIds = appRouter.currentView.alertConfig.geoId;
            
            var values = [];
            var cntIdValues = $(this.el).val()
            var alertValues = [];
 
              if( cntIdValues && cntIdValues.length > 0 )  {
                $.each(cntIdValues, function(index, value )
                {
                   values[index] =  parseInt(value,10);
                });
            }
 
       //     console.log("countryID",countryID);
            var geoId = appRouter.currentView.alertConfig.geoId;
            console.log(" geo ids  >>>>."+geoId);
 
            var stateArray = appRouter.currentView.regulations.stateCollection;
            console.log("stateArray",JSON.stringify(stateArray));
            if (stateArray.length > 0) {
                var stateCollection = new admin.StateCollection(stateArray);
                console.log("stateCollection",JSON.stringify(stateCollection));
 
               
 
                var stateCollectionBycountry = new admin.StateCollection();
                var stateALL = false;
                $.each(geoIds, function(index, value )
                {
                     $.each(values, function(index1, value1 )
                     {
                        var filter = {gid: value,cntid:value1}; 
                        console.log("filter",filter);
                        var collItem = stateCollection.where(filter);
                        if( collItem.length <= 0 ) stateALL = true;
                        stateCollectionBycountry.add(collItem);
                        console.log("stateCollection",JSON.stringify(stateCollectionBycountry));
                     });
                    
                });


                          if( stateCollectionBycountry.length <= 0 || stateALL)      
                  stateCollectionBycountry.add(stateCollection.where({sid:1}));       
                console.log('stateCollectionBycountry');
                console.log(JSON.stringify(stateCollectionBycountry));
 
          if(stateCollectionBycountry.length != 0){
                if( values && values.length > 0 )
                {
                   
                    $.each(values, function(index, value )
                    {
                        console.log("select value is ....................."+value);
 
 
                         _self.collection.each(function(item) 
                         {
                            console.log("state country array ............................"+item.get('cntid'));
                            if( value == item.get('cntid') )
                            {
                                console.log("state collection array  id ............................"+item.get('cntid'));
                                  if( geoIds.length > 0 )
                                  {
                                      $.each(geoIds, function(index, gidValue )
                                        {
                                             if( gidValue == item.get('gid'))
                                             {
                                                 var stateMap = { gid:gidValue,cntid:value};
                                                 alertValues.push(stateMap);
 
                                             }
 
                                        });
                                  }
 
                            }
                         });
 
                    });
                }
                  console.log("Selected country id are "+JSON.stringify(alertValues));
 
                if (this.stateCollectionView) 
                {
                    this.stateCollectionView.$el.empty();
                    //this.stateCollectionView.$el.unbind();
                    this.stateCollectionView.collection = stateCollectionBycountry;
                    this.stateCollectionView.render();
                }  
                else
                {                     
                    this.stateCollectionView = new admin.StateAlertCollectionView({
                            el: $( '#selectState' ),
                            collection: stateCollectionBycountry
                    });
                }
                $(this.stateCollectionView.el).attr('disabled', false);
                this.stateCollectionView.disabledElement();
                //set selected geo name
                console.log('Country Name: ' + $("#select option:selected").text());
                appRouter.currentView.alertConfig.countryName = $("#selectCountry option:selected").text();
                appRouter.currentView.alertConfig.countryIDs = alertValues;
              }

                if(stateCollectionBycountry.length == 0){
                          var geoId = appRouter.currentView.alertConfig.geoId;
                          console.log(" geo ids  >>>>."+geoId);

                          var domainArray = appRouter.currentView.regulations.domainCollection;
                          console.log("domainArray",JSON.stringify(domainArray));
                          if (domainArray.length > 0) {
                              var domainCollection = new admin.DomainCollection(domainArray);
                              console.log("domainCollection",JSON.stringify(domainCollection));

                             

                              var domainCollectionByGeo = new admin.DomainCollection();
                              
                              $.each(geoIds, function(index, value )
                              {
                                   $.each(values, function(index1, value1 )
                                   {
                                      var filter = {gid: value,cntid:value1}; 
                                      console.log("filter",filter);
                                      var collItem = domainCollection.where(filter);
                                      domainCollectionByGeo.add(collItem);
                                      console.log("domainCollection",JSON.stringify(domainCollectionByGeo));
                                   });
                                  
                              });

                               if( domainCollectionByGeo.length <= 0 )      
                                domainCollectionByGeo.add(domainCollection.where({sid:1}));       
                              console.log('domainCollectionByGeo');
                              console.log(JSON.stringify(domainCollectionByGeo));



                              if( values && values.length > 0 )
                              {
                                 
                                  $.each(values, function(index, value )
                                  {
                                      console.log("select value is ....................."+value);


                                       _self.collection.each(function(item) 
                                       {
                                          console.log("state country array ............................"+item.get('cntid'));
                                          if( value == item.get('cntid') )
                                          {
                                              console.log("state collection array  id ............................"+item.get('cntid'));
                                                if( geoIds.length > 0 )
                                                {  var sidvalue= 18;
                                                    $.each(geoIds, function(index, gidValue )
                                                      {
                                                           if( gidValue == item.get('gid'))
                                                           {
                                                               var stateMap = { gid:gidValue,cntid:value,sid:sidvalue};
                                                               alertValues.push(stateMap);

                                                           }

                                                      });
                                                }

                                          }
                                       });

                                  });
                              }
                                console.log("Selected country id are "+JSON.stringify(alertValues));

                              if (this.domainCollectionView) 
                              {
                                  this.domainCollectionView.$el.empty();
                                  //this.stateCollectionView.$el.unbind();
                                  this.domainCollectionView.collection = domainCollectionByGeo;
                                  this.domainCollectionView.render();
                              }  
                              else
                              {                     
                                  this.domainCollectionView = new admin.DomainAlertCollectionView({
                                          el: $( '#selectDomain' ),
                                          collection: domainCollectionByGeo
                                  });
                              }
                              $(this.domainCollectionView.el).attr('disabled', false);
                              this.domainCollectionView.disabledElement();
                              //set selected geo name
                              console.log('Country Name: ' + $("#select option:selected").text());
                              appRouter.currentView.alertConfig.countryName = $("#selectCountry option:selected").text();
                              appRouter.currentView.alertConfig.stateIDs  = alertValues;
                          }
        }

                
 
       
            }
        }
        
    },

    disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>country");
        if (this.stateCollectionView) 
        {
            $(this.stateCollectionView.el).attr('disabled', true);
            this.stateCollectionView.collection.reset();
            this.stateCollectionView.$el.empty();
           // this.stateCollectionView.$el.unbind();
            this.stateCollectionView.render();
            this.stateCollectionView.disabledElement();
        }
    }       
    
});