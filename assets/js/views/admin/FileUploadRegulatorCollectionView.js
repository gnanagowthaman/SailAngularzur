var admin = admin || {};

admin.FileUploadRegulatorCollectionView = Backbone.View.extend({

    initialize: function(options) {
          
        console.log('Initialize RegulatorCollectionView');
        console.log('regulatorCollection'); console.log(this.collection);
        //this.collection = new admin.RegulatorCollection(options.regulatorCollection);
        _.bindAll(this, "renderRegulator");
        _.bindAll(this, "render");
        this.render();
    },

    events: {
      // 'change #selectRegulator' : 'isSelected' 
    },

    render: function() {
        console.log('Rendering RegulatorCollectionView');
        this.$el.html( '<option value="">Select</option>' );
        if( this.collection )
        {
            this.collection.each(function(item) {
                console.log(item.get('rid'));console.log(item.get('rname'));
                this.renderRegulator(item);
            }, this );
        }
        return this;
    },  

    renderRegulator: function( item ) {
        var regulatorItemView = new admin.FileUploadRegulatorItemView({
            model: item
        });
        this.$el.append( regulatorItemView.render().el );
    },


    isSelected: function(e) {
        e.preventDefault();
        console.log('Regulator Triggered');
        var regulatorId = parseInt($(this.el).val(), 10);
        var domainId = appRouter.currentView.fileUploadConfig.domainId;
        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryId;
        var stateId    = appRouter.currentView.fileUploadConfig.stateID;

           var regArray = appRouter.currentView.regulationData.regCollection;

        if (regArray.length > 0) {
         var regCollection = new admin.RegulationCollection(regArray);

         console.log('regulation collection');
         console.log(JSON.stringify(regCollection));

         var filter = {gid: geoId, cntid : countryId, sid : stateId, did: domainId, rid: regulatorId}; 

         console.log( JSON.stringify(filter));
         var regCollectionByDomain = new admin.RegulationCollection(regCollection.where(filter)); 
         console.log('regCollectionByDomain');console.log(JSON.stringify(regCollectionByDomain));
                        
         if (this.regulationCollectionView) {
                this.regulationCollectionView.$el.empty();
                //this.regulationCollectionView.$el.unbind();
                this.regulationCollectionView.collection = regCollectionByDomain;
                this.regulationCollectionView.render();
         }   
         else
         {                    
             this.regulationCollectionView = new admin.FileUploadRegulationCollectionView({
                   el: $( '#selectReg' ),
                   collection: regCollectionByDomain
                   //collection: regCollection
                });
         }
            $(this.regulationCollectionView.el).attr('disabled', false);
            this.regulationCollectionView.disabledElement();
            //set selected domain name
            console.log('RegName: ' + $("#selectRegulator option:selected").text());
            appRouter.currentView.fileUploadConfig.regulatorName = $("#selectRegulator option:selected").text();
            appRouter.currentView.fileUploadConfig.regulatorId = regulatorId;

             appRouter.regulatorName = $("#selectRegulator option:selected").text();
        }        
    },

      disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>domain");


          if (this.regulationCollectionView) 
          {
              $(this.regulationCollectionView.el).attr('disabled', true);

              this.regulationCollectionView.collection.reset();
              this.regulationCollectionView.$el.empty();
                 // this.regCollectionView.$el.unbind();
                  this.regulationCollectionView.render();
             this.regulationCollectionView.disabledElement();
          }

        
    }    
    
});
