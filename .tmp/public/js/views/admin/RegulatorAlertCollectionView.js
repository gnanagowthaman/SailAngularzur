var admin = admin || {};

admin.RegulatorAlertCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize RegulatorAlertCollectionView');
        console.log('regulatorCollection'); console.log(this.collection);
        //this.collection = new admin.RegulatorCollection(options.regulatorCollection);
        _.bindAll(this, "renderRegulator");
        _.bindAll(this, "render");
        this.render();
    },

    events: {
      'change' : 'isSelected' 
    },

    render: function() {
        console.log('Rendering RegulatorAlertCollectionView');
       this.$el.html( '<option value="">Select</option>' );
       if( this.collection )
       {
            $("#selectRegulator option[value='']").remove();      
            this.collection.each(function(item) 
            {
                console.log(item.get('rid'));console.log(item.get('name'));

                var exists = false; 
              $('#selectRegulator  option').each(function()
              {
                 if (this.text == item.get('name')) 
                {
                   exists = true;
                }
              });
              
              if( exists == false) this.renderRegulator(item);
                
            }, this );
        }
        return this;
    },  

    renderRegulator: function( item ) {
        var regulatorItemView = new admin.RegulatorItemView({
            model: item
        });
         regulatorItemView.setValueIds('rid','name');
        this.$el.append( regulatorItemView.render().el );
    },


    isSelected: function(e) 
    {
        e.preventDefault();
        console.log('Regulator Triggered');
         _self = this;

       // var stateID = parseInt($(this.el).val(), 10);
       var domainIds = appRouter.currentView.alertConfig.domainIds;
       console.log("Selected domains are  "+JSON.stringify(domainIds));

       var values = [];
        var regulatorValues = $(this.el).val()
        var alertValues = [];


          if( regulatorValues && regulatorValues.length > 0 )  {
            $.each(regulatorValues, function(index, value )
            {
               values[index] =  parseInt(value,10);
            });
        }


        var regulatorId = parseInt($(this.el).val(), 10);
       
       /* var geoId    = appRouter.currentView.alertConfig.geoId;
        var countryId    = appRouter.currentView.alertConfig.countryID;
        var stateId    = appRouter.currentView.alertConfig.stateID;
        var domainId = appRouter.currentView.alertConfig.domainId;*/

           var regArray = appRouter.currentView.regulations.regCollection;

        if (regArray.length > 0) {
         var regulationCollection = new admin.RegulationCollection(regArray);

         console.log('regulationCollection');console.log(JSON.stringify(regulationCollection));
        var regCollectionByRegulator = new admin.RegulationCollection();
        for( i=0; i < domainIds.length; i++)
        {
            var gid   = domainIds[i]['gid'];
            var cntid = domainIds[i]['cntid'];
            var sid = domainIds[i]['sid'];
             var did = domainIds[i]['did'];
    
           $.each(values, function(index, value1 )
           {
              var filter = {gid: gid,cntid:cntid,sid:sid, did:did, rid:value1}; 
              console.log("filter",filter);
              regCollectionByRegulator.add(regulationCollection.where(filter));
              console.log("regulator collection",JSON.stringify(regCollectionByRegulator));
           });
        }

        if( values && values.length > 0 )
            {
                    $.each(values, function(index, value )
                    {
                        console.log("select value is ....................."+value);

                         _self.collection.each(function(item) 
                         {
                            console.log("domain  array ............................"+item.get('drd'));
                            if( value == item.get('rid') )
                            {
                                  console.log("domain  array  id ............................"+item.get('rid'));
                                  if( domainIds.length > 0 )
                                  {
                                     for( i=0; i < domainIds.length; i++)
                                      {
                                         console.log("count isSelected array  id ............................"+i);
                                          var gid   = domainIds[i]['gid'];
                                          var cntid = domainIds[i]['cntid'];
                                           var sid = domainIds[i]['sid'];
                                           var did = domainIds[i]['did'];
                                            console.log("Selected gid and cntid ",gid, cntid,sid,did);
                                        
                                          if( gid == item.get('gid') && cntid == item.get('cntid') && sid == item.get('sid') && did == item.get('did'))
                                          {

                                            var stateMap = {gid: gid,cntid:cntid,sid:sid,did:did,rid:value}; 
                                              console.log("filter",stateMap);
                                            alertValues.push(stateMap);
                                          }
                                  
                                      }
                                    
                                  }

                            }
                         });

                    });
                }

                    console.log("Selected regulator id are "+JSON.stringify(alertValues));
                      
         if (this.regulationCollectionView) 
         {
                this.regulationCollectionView.$el.empty();
                //this.regulationCollectionView.$el.unbind();
                 this.regulationCollectionView.collection = regCollectionByRegulator;
                this.regulationCollectionView.render();
         }  
         else
         {                     
             this.regulationCollectionView = new admin.RegulationAlertCollectionView({
                   el: $( '#selectRegulation' ),
                   collection: regCollectionByRegulator
                   //collection: regCollection
                });
         }
            $(this.regulationCollectionView.el).attr('disabled', false);
            this.regulationCollectionView.disabledElement();
            //set selected domain name
            console.log('RegName: ' + $("#selectRegulator option:selected").text());
            appRouter.currentView.alertConfig.regulatorName = $("#selectRegulator option:selected").text();
            appRouter.currentView.alertConfig.regulatorIds = alertValues;
        }
     },

      disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>country");
        if (this.regulationCollectionView) 
        {
            $(this.regulationCollectionView.el).attr('disabled', true);
            this.regulationCollectionView.collection.reset();
            this.regulationCollectionView.$el.empty();
           // this.stateCollectionView.$el.unbind();
            this.regulationCollectionView.render();
            this.regulationCollectionView.disabledElement();
        }
    }        

    
});
