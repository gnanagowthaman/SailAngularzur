var admin = admin || {};

admin.StateCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize StateCollectionView');
        //console.log('countryCollection'); console.log(options.stateCollection);
        //this.collection = new admin.StateCollection(options.stateCollection);

         this.endChain=options.endChain;   //Louis
         this.title="state";   //Louis

        _.bindAll(this, "renderState");
        _.bindAll(this, "render");
        this.render();
    },

    events: {
      'change' : 'isSelected' 
    },

    render: function() {
        console.log('Rendering StateCollectionView');
        this.$el.html( '<option value="">Select</option>' );
        this.collection.each(function(item) {
            console.log(item.get('id'));
            console.log(item.get('name'));
            this.renderState(item);
        }, this );
        return this;
    },  

    renderState: function( item ) {
        var stateItemView = new admin.StateItemView({
            model: item
        });
        this.$el.append( stateItemView.render().el );
    },

      isSelected: function(e) { 
        e.preventDefault();
       // console.log('State Triggered',this.endChain,this.title); 
        if(this.endChain){
          if( this.endChain == this.title )
          {
              this.processRegData();
          } 
          else
          {
            this.processNext();
          }
        }
        
      },

      processRegData : function()
      {

        var state = parseInt($(this.el).val(), 10);
        var geoId    = appRouter.currentView.fileUploadConfig.gId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryID;
        

        console.log("state",state);
        var regulationrray = appRouter.currentView.regulations.regCollection;
        console.log("regulationrray",JSON.stringify(regulationrray));
        if (regulationrray.length > 0) {
            var regCollection = new Backbone.Collection(regulationrray);
            console.log("regCollection",JSON.stringify(regCollection));

        var filter = {geography_id: geoId, country_id : countryId, state_id : state}; 

         console.log(JSON.stringify(filter));
         var regCollectionByDomain = new admin.RegulationCollection(regCollection.where(filter)); 
         console.log('regCollectionByDomain');console.log(JSON.stringify(regCollectionByDomain));


          //  var filter = {scid: countryID}; console.log("filter",filter);
          //  var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter));         
            //console.log('stateCollectionBycountry');console.log(stateCollectionBycountry);
          
            if (this.regCollectionView) {
                this.regCollectionView.$el.empty();
               // this.regCollectionView.$el.unbind();
                 this.regCollectionView.collection= regCollectionByDomain;
                this.regCollectionView.render();
            } 
            else
            {                      
                this.regCollectionView = new admin.MgmtRegulationCollectionView({
                        el: $( '#selectRegulation' )
                       // collection: regCollectionByDomain
                });
                console.log("Setting value for collection");
                 this.regCollectionView.setCallFrom(true);
                this.regCollectionView.collection= regCollectionByDomain;
                this.regCollectionView.render();
            }

           $(this.regCollectionView.el).attr('disabled', false);
           //this.regCollectionView.disabledElement();
            //set selected geo name
            console.log('Country Name: ' + $("#select option:selected").text());
            appRouter.currentView.fileUploadConfig.stateName = $("#selectState option:selected").text();
            appRouter.currentView.fileUploadConfig.stateID = state;
        }

      },

       processNext : function()
      {

        var state = parseInt($(this.el).val(), 10);
           var geoId    = appRouter.currentView.fileUploadConfig.gId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryID;

        console.log("state",state);
        var domainrray = appRouter.currentView.regulations.domainCollection;
        console.log("domainrray",JSON.stringify(domainrray));
        var countryName = $("#selectCountry").val();
        console.log("countryName", countryName);

        if (domainrray.length > 0) {
            var domainCollection = new Backbone.Collection(domainrray);
            console.log("domainrray",JSON.stringify(domainCollection));

          if(countryName == undefined || countryName == ""){
         var filter = {geography_id : geoId, country_id : 23, state_id : state }; 
       console.log(JSON.stringify(filter));
       var domainCollectionByDomain = new admin.DomainCollection(domainCollection.where(filter));         
       console.log('domainCollectionByDomain');
       console.log(JSON.stringify(domainCollectionByDomain));  
      }
      else {
         var filter = {geography_id : geoId, country_id : countryId, state_id : state }; 
       console.log(JSON.stringify(filter));
       var domainCollectionByDomain = new admin.DomainCollection(domainCollection.where(filter));         
       console.log('domainCollectionByDomain');
       console.log(JSON.stringify(domainCollectionByDomain));     
      }
       // var filter = {geography_id : geoId, country_id : countryId, state_id : state }; 
       // console.log(JSON.stringify(filter));
       // var domainCollectionByDomain = new admin.DomainCollection(domainCollection.where(filter));         
       // console.log('domainCollectionByDomain');
       // console.log(JSON.stringify(domainCollectionByDomain));         
       

          //  var filter = {scid: countryID}; console.log("filter",filter);
          //  var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter));         
            //console.log('stateCollectionBycountry');console.log(stateCollectionBycountry);
          
            if (this.domainCollectionView) {
                this.domainCollectionView.$el.empty();
               // this.regCollectionView.$el.unbind();
                 this.domainCollectionView.collection= domainCollectionByDomain;
                this.domainCollectionView.render();
            } 
            else
            {                      
                this.domainCollectionView = new admin.MgmtDomainCollectionView({
                        el: $( '#selectDomain' )
                       // collection: regCollectionByDomain
                });
                console.log("Setting value for collection");
               //  this.domainCollectionView.setCallFrom(true);
                this.domainCollectionView.collection= domainCollectionByDomain;
                this.domainCollectionView.idTitle ="did";
                this.domainCollectionView.render();
            }

           $(this.domainCollectionView.el).attr('disabled', false);
           //this.regCollectionView.disabledElement();
            //set selected geo name
            console.log('state Name: ' + $("#select option:selected").text());
            appRouter.currentView.fileUploadConfig.stateName = $("#selectState option:selected").text();
            appRouter.currentView.fileUploadConfig.stateID = state;
        }

      },

    disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>state");


        if( this.endChain == this.title )
        {
          if (this.regCollectionView) 
          {
              $(this.regCollectionView.el).attr('disabled', true);

              this.regCollectionView.collection.reset();
              this.regCollectionView.$el.empty();
                 // this.regCollectionView.$el.unbind();
                  this.regCollectionView.render();
             // this.regCollectionView.disabledElement();
          }
        }
        else
        {
          if (this.domainCollectionView) 
          {
              $(this.domainCollectionView.el).attr('disabled', true);

              this.domainCollectionView.collection.reset();
              this.domainCollectionView.$el.empty();
                 // this.regCollectionView.$el.unbind();
                  this.domainCollectionView.render();
             this.domainCollectionView.disabledElement();
          }

        }
    }    
});
