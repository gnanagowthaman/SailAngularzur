var admin = admin || {};
 
admin.DomainAlertCollectionView = Backbone.View.extend({
 
    initialize: function() {
        console.log('Initialize DomainAlertCollectionView');
        console.log('domainCollection'); console.log(this.collection);
        // this.collection = new admin.DomainCollection(options.domainCollection);
        _.bindAll(this, "renderDomain");
        _.bindAll(this, "render");
        this.render();
    },
 
    events: {
      'change' : 'isSelected' 
    },
 
    render: function() {
        console.log('Rendering DomainAlertCollectionView');
        this.$el.html( '<option value="">Select</option>' );
        $("#selectDomain option[value='']").remove();
        _self = this;
        this.collection.each(function(item) 
        {
              console.log(item.get('did'));console.log(item.get('name'));

           /*   if ( $("#selectDomain option[text='"+item.get('name')+"']").length == 0 ){
                  this.renderDomain(item);
                }*/
                
              var exists = false; 
              $('#selectDomain  option').each(function()
              {
                 if (this.text == item.get('name')) 
                {
                   exists = true;
                }
              });
              
              if( exists == false) this.renderDomain(item);
            
        }, this );
        return this;
    },    
 
    renderDomain: function( item ) {
        var domainItemView = new admin.DomainItemView({
            model: item
        });
    domainItemView.setValueIds('did','name');
    this.$el.append( domainItemView.render().el );
    },
 
 
   isSelected:function(e)
   {
     e.preventDefault();
        console.log('domain Triggered'); 
 
        _self = this;
 
       // var stateID = parseInt($(this.el).val(), 10);
       var stateIDs = appRouter.currentView.alertConfig.stateIDs;
       console.log("Selected states are  "+JSON.stringify(stateIDs));
 
       var values = [];
        var domainValues = $(this.el).val()
        var alertValues = [];
 
 
          if( domainValues && domainValues.length > 0 )  {
            $.each(domainValues, function(index, value )
            {
               values[index] =  parseInt(value,10);
            });
        }
 
 
 
 
        console.log(values);
 
 
     /*   var geoId    = appRouter.currentView.alertConfig.geoId;
        var countryId = appRouter.currentView.alertConfig.countryId;
        var stateID  =  appRouter.currentView.alertConfig.stateID;*/
 
 
        var regulatorArray = appRouter.currentView.regulations.regulatorCollection;
        console.log("regulatorArray",JSON.stringify(regulatorArray));
 
        if (regulatorArray.length > 0) {
            var regulatorCollection = new admin.RegulatorCollection(regulatorArray);
            console.log('regulatorCollection');
            console.log(JSON.stringify(regulatorCollection));
 
             
        var regulatorCollectionByDomain = new admin.RegulatorCollection();
        for( i=0; i < stateIDs.length; i++)
        {
            var gid   = stateIDs[i]['gid'];
            var cntid = stateIDs[i]['cntid'];
            var sid = stateIDs[i]['sid'];
    
           $.each(values, function(index, value1 )
           {
              var filter = {gid: gid,cntid:cntid,sid:sid, did:value1}; 
              console.log("filter",filter);
              regulatorCollectionByDomain.add(regulatorCollection.where(filter));
              console.log("domain collection",JSON.stringify(regulatorCollectionByDomain));
           });
        }
 
            if( regulatorCollectionByDomain.length <= 0 )      
                  regulatorCollectionByDomain = new admin.RegulatorCollection(regulatorCollection.where({did:1}));
 
 
           if( values && values.length > 0 )
            {
                    $.each(values, function(index, value )
                    {
                        console.log("select value is ....................."+value);
 
                         _self.collection.each(function(item) 
                         {
                            console.log("domain  array ............................"+item.get('did'));
                            if( value == item.get('did') )
                            {
                                  console.log("domain  array  id ............................"+item.get('did'));
                                  if( stateIDs.length > 0 )
                                  {
                                     for( i=0; i < stateIDs.length; i++)
                                      {
                                         console.log("count isSelected array  id ............................"+i);
                                          var gid   = stateIDs[i]['gid'];
                                          var cntid = stateIDs[i]['cntid'];
                                           var sid = stateIDs[i]['sid'];
                                            console.log("Selected gid and cntid ",gid, cntid,sid);
                                        
                                          if( gid == item.get('gid') && cntid == item.get('cntid') && sid == item.get('sid'))
                                          {
 
                                            var stateMap = {gid: gid,cntid:cntid,sid:sid,did:value}; 
                                              console.log("filter",stateMap);
                                            alertValues.push(stateMap);
                                          }
                                  
                                      }
                                    
                                  }
 
                            }
                         });
 
                    });
                }
 
          console.log("Selected domain id are "+JSON.stringify(alertValues));
 
           console.log('regulatorCollectionByDomain');console.log(regulatorCollectionByDomain);
           if (this.regulatorCollectionView) 
           {
                this.regulatorCollectionView.$el.empty();
                //this.regulatorCollectionView.$el.unbind();
                 this.regulatorCollectionView .collection =regulatorCollectionByDomain;
                  this.regulatorCollectionView.render();
            }   
            else
            {                   
              this.regulatorCollectionView = new admin.RegulatorAlertCollectionView({
                    el: $( '#selectRegulator' ),
                    collection: regulatorCollectionByDomain
              });
            }
            $(this.regulatorCollectionView.el).attr('disabled', false);
            this.regulatorCollectionView.disabledElement();
            
            //set selected domain name
            console.log('domainName: ' + $("#selectDomain option:selected").text());
            appRouter.currentView.alertConfig.domainName = $("#selectDomain option:selected").text();
            appRouter.currentView.alertConfig.domainIds = alertValues;
        }        
  },


    disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>country");
        if (this.regulatorCollectionView) 
        {
            $(this.regulatorCollectionView.el).attr('disabled', true);
            this.regulatorCollectionView.collection.reset();
            this.regulatorCollectionView.$el.empty();
           // this.stateCollectionView.$el.unbind();
            this.regulatorCollectionView.render();
            this.regulatorCollectionView.disabledElement();
        }
    }        


});