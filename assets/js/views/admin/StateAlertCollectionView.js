var admin = admin || {};
 
admin.StateAlertCollectionView = Backbone.View.extend({
 
    initialize: function(options) {
        console.log('Initialize StateAlertCollectionView');
        //console.log('countryCollection'); console.log(options.stateCollection);
        //this.collection = new admin.StateCollection(options.stateCollection);
        _.bindAll(this, "renderState");
        _.bindAll(this, "render");
        this.render();
    },
 
    events: {
      'change' : 'isSelected' 
    },
 
    render: function() {
        console.log('Rendering StateAlertCollectionView');
        this.$el.html( '<option value="">Select</option>' );
 
        if( this.collection )
        {
          $("#selectState option[value='']").remove();
          this.collection.each(function(item) {
              console.log(item.get('sid'));
              console.log(item.get('name'));
              this.renderState(item);
          }, this );
        }
        return this;
    },  
 
    renderState: function( item ) {
        var stateItemView = new admin.StateItemView({
            model: item
        });
        stateItemView.setValueIds('sid','name')
        this.$el.append( stateItemView.render().el );
    },
 
      isSelected: function(e) { 
         e.preventDefault();
        console.log('state Triggered'); 
 
        _self = this;
 
       // var stateID = parseInt($(this.el).val(), 10);
       var countryIDs = appRouter.currentView.alertConfig.countryIDs;
       console.log("Selected country id are "+JSON.stringify(countryIDs));
 
       var values = [];
        var stateValues = $(this.el).val()
        var alertValues = [];
 
 
          if( stateValues && stateValues.length > 0 )  {
            $.each(stateValues, function(index, value )
            {
               values[index] =  parseInt(value,10);
            });
        }
 
        console.log(values);
       var geoId = appRouter.currentView.alertConfig.geoId;
       var countryId = appRouter.currentView.alertConfig.countryId;


 

        var domainArray = appRouter.currentView.regulations.domainCollection;
        console.log("domainArray",JSON.stringify(domainArray));
        if (domainArray.length > 0) {
          var domainCollection = new admin.DomainCollection(domainArray);
          console.log("domain collection",JSON.stringify(domainCollection));
 
       
        var domainCollectionByGeo = new admin.DomainCollection();
        for( i=0; i < countryIDs.length; i++)
        {
            var gid   = countryIDs[i]['gid'];
            var cntid = countryIDs[i]['cntid'];
    
           $.each(values, function(index, value1 )
           {
              var filter = {gid: gid,cntid:cntid, sid:value1}; 
              console.log("filter",filter);
              domainCollectionByGeo.add(domainCollection.where(filter));
              console.log("domain collection",JSON.stringify(domainCollectionByGeo));
           });
        }
 
    
          if( domainCollectionByGeo.length <= 0 )      
                  domainCollectionByGeo = new admin.DomainCollection(domainCollection.where({sid:1}));    
 
           if( values && values.length > 0 )
            {
                    $.each(values, function(index, value )
                    {
                        console.log("select value is ....................."+value);
 
                         _self.collection.each(function(item) 
                         {
                            console.log("state state array ............................"+item.get('sid'));
                            if( value == item.get('sid') )
                            {
                                  console.log("state collection array  id ............................"+item.get('sid'));
                                  if( countryIDs.length > 0 )
                                  {
                                     for( i=0; i < countryIDs.length; i++)
                                      {
                                         console.log("count isSelected array  id ............................"+i);
                                          var gid   = countryIDs[i]['gid'];
                                          var cntid = countryIDs[i]['cntid'];
                                            console.log("Selected gid and cntid ",gid, cntid);
                                              console.log("Selected gid and cntid ",item.get('gid'), item.get('cntid'));
                                        
                                          if( gid == item.get('gid') && cntid == item.get('cntid') )
                                          {
 
                                            var stateMap = {gid: gid,cntid:cntid,sid:value}; 
                                              console.log("filter",stateMap);
                                            alertValues.push(stateMap);
                                          }
                                          else if( item.get('name') == "ALL")
                                          {
                                            var stateMap = {gid: gid,cntid:cntid,sid:value}; 
                                              console.log("filter",stateMap);
                                            alertValues.push(stateMap);
                                          }
                                  
                                      }
                                    
                                  }
 
                            }
                         });
 
                    });
                }
 
           console.log("Selected sate id are "+JSON.stringify(alertValues));
 
          console.log('domainCollectionByGeo');console.log(domainCollectionByGeo);
 
          if (this.domainCollectionView) {
              this.domainCollectionView.$el.empty();
              //this.domainCollectionView.$el.unbind();
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
            console.log('stateName: ' + $("#selectState option:selected").text());
            appRouter.currentView.alertConfig.stateName = $("#selectState option:selected").text();
            appRouter.currentView.alertConfig.stateIDs = alertValues;
        }
 
      },

       disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>country");
        if (this.domainCollectionView) 
        {
            $(this.domainCollectionView.el).attr('disabled', true);
            this.domainCollectionView.collection.reset();
            this.domainCollectionView.$el.empty();
           // this.stateCollectionView.$el.unbind();
            this.domainCollectionView.render();
            this.domainCollectionView.disabledElement();
        }
    }        
});