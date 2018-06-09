var admin = admin || {};

admin.RegulationAlertCollectionView = Backbone.View.extend({

    initialize: function(options) {
         this.callFromUser = false;
        console.log('inside MgmtRegulationCollectionView');
      // if( options.regCollection == undefined )
    //    this.collection = new admin.RegulationCollection(options.regCollection);
         console.log('geoCollection');
        //console.log(options.geoCollection);
     //   this.collection = new admin.GeographyCollection(options.geoCollection);

         this.endChain=options.endChain;   //Louis
         this.title="state";   //Louis

        _.bindAll(this, "renderRegulation");
        _.bindAll(this, "render");
        this.render();
    },

     events: {
      'change' : 'isSelected' 
    },

    render: function() {
        console.log('Rendering Regulation');
        if( this.collection )
        {
            this.collection.each(function(item)
             {
                console.log(item.get('rlid'));
                console.log(item.get('name'));

                  var exists = false; 
              $('#selectRegulation  option').each(function()
              {
                 if (this.text == item.get('name')) 
                {
                   exists = true;
                }
              });
              
              if( exists == false) this.renderRegulation(item);

            }, this );
        }
        return this;
    },

    renderRegulation: function( item ) {
        var regulationItemView = new admin.RegulationAlertItemView({
            model: item
        });
        regulationItemView.setValueIds('rlid','name');

        this.$el.append( regulationItemView.render().el );
    },

    setCallFrom: function(flag)
    {
        this.callFromUser = flag;
    },

    disabledElement : function()
    {
          console.log("Disable element called .............>>>>>>>>>>>>>Regulation");
        $(this.el).attr('disabled', false);
    },


    isSelected: function(e) { 
        e.preventDefault();

          _self = this;

       // var stateID = parseInt($(this.el).val(), 10);
       var regulatorIds = appRouter.currentView.alertConfig.regulatorIds;
       console.log("Selected regulator are  "+JSON.stringify(regulatorIds));

       var values = [];
        var regulationValues = $(this.el).val()
        var alertValues = [];


        if( regulationValues && regulationValues.length > 0 )  
        {
            $.each(regulationValues, function(index, value )
            {
               values[index] =  parseInt(value,10);
            });
        }

          if( values && values.length > 0 )
            {
                    $.each(values, function(index, value )
                    {
                        console.log("select value is ....................."+value);

                         _self.collection.each(function(item) 
                         {
                            console.log("domain  array ............................"+item.get('rlid'));
                            if( value == item.get('rlid') )
                            {
                                  console.log("domain  array  id ............................"+item.get('rlid'));
                                  if( regulatorIds.length > 0 )
                                  {
                                     for( i=0; i < regulatorIds.length; i++)
                                      {
                                         console.log("count isSelected array  id ............................"+i);
                                           var gid   = regulatorIds[i]['gid'];
                                            var cntid = regulatorIds[i]['cntid'];
                                             var sid = regulatorIds[i]['sid'];
                                             var did = regulatorIds[i]['did'];
                                             var rid = regulatorIds[i]['rid'];
                                            console.log("Selected gid and cntid ",gid, cntid,sid,did);
                                        
                                          if( gid == item.get('gid') && cntid == item.get('cntid') && sid == item.get('sid') && did == item.get('did') && rid == item.get('rid'))
                                          {

                                            var stateMap = {gid: gid,cntid:cntid,sid:sid,did:did,rid:rid,rlid:value}; 
                                              console.log("filter",stateMap);
                                            alertValues.push(stateMap);
                                          }
                                  
                                      }
                                    
                                  }

                            }
                         });

                    });
                }

         
          console.log("Selected regulation id are "+JSON.stringify(alertValues));
           appRouter.currentView.alertConfig.regulationIds = alertValues;

     },

     disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>country");
       
    }        

        
});
