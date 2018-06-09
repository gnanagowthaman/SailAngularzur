var admin = admin || {};

admin.UserGeoCollectionView = Backbone.View.extend({

	initialize: function(options) {
	    console.log('Initialize UserGeoCollectionView');
	    console.log('geoCollection'); console.log(options.usergeoCollection);
        console.log("geoCollection "+JSON.stringify(options.usergeoCollection));
        this.endChain=options.endChain;
        this.title="geography";
        this.regulationData = options.usergeoCollection;
		this.collection = new admin.GeographyCollection(options.usergeoCollection.usergeoCollection);
		_.bindAll(this, "renderGeo");
		_.bindAll(this, "render");
		this.render();
	},

    events: {
      'change' : 'isSelected' 
    },

    render: function() {
        console.log('Rendering UserGeoCollectionView');
        this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
            console.log("each item "+JSON.stringify(item));
            console.log(item.get('id'));console.log(item.get('name'));
            // if( item.get('name').toUpperCase() != "ALL")
            // {
        		this.renderGeo(item);
            // }
		}, this );
    	return this;
	},	

    renderGeo: function( item ) {
        var geoItemView = new admin.GeoItemView({
            model: item
        });
        this.$el.append( geoItemView.render().el );
    },

    selectedData: function()
    {
              if( this.endChain != this.title )
        {

            console.log('Country Triggered'); 
            var gId = parseInt($(this.el).val(), 10);
            console.log("geoId",gId);
            var countryArray = appRouter.currentView.regulations.countryCollection;
            if (countryArray.length > 0) {
                var countryCollection = new admin.CountryCollection(countryArray);
                console.log("countryCollection",JSON.stringify(countryCollection));
                var filter = {gid: gId}; console.log("filter",filter);
                var countryCollectionByGeo = new admin.CountryCollection(countryCollection.where(filter));  
                if( countryCollectionByGeo.length <= 0 )
                      countryCollectionByGeo =  new admin.CountryCollection(countryCollection.where({gid:1}));   
                    console.log("countryCollection",JSON.stringify(countryCollectionByGeo));
                console.log('CountryCollectionView');console.log(countryCollectionByGeo);
                if (this.countryCollectionView) {
                    this.countryCollectionView.$el.empty();
                  //  this.countryCollectionView.$el.unbind();
                    this.countryCollectionView.collection = countryCollectionByGeo;
                    this.countryCollectionView.render();
                }
                else
                { 
                    this.countryCollectionView = new admin.CountryCollectionView({
                        el: $( '#selectCountry' ),
                        collection : countryCollectionByGeo,
                        endChain: this.endChain
                });
                }                       
                  
            
                
               $(this.countryCollectionView.el).attr('disabled', false);
               this.countryCollectionView.disabledElement();

                //set selected geo name
                 console.log('GeographyName: ' + $("#select option:selected").text());
                 appRouter.currentView.fileUploadConfig.geoName = $("#selectGeography option:selected").text();
                 appRouter.currentView.fileUploadConfig.gId = gId;
            }
             console.log('Country Triggered'); 
            var countryID = parseInt($(this.el).val(), 10);
            console.log("countryID",countryID);
            var stateArray = appRouter.currentView.regulations.stateCollection;
            console.log("stateArray",JSON.stringify(stateArray));
            if (stateArray.length > 0) {
                 $('#selectState').show();
                var stateCollection = new admin.StateCollection(stateArray);
                console.log("stateCollection",stateCollection);
                var filter = {scid: 23,gid: gId}; 
                console.log("filter",filter);
                var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter)); 
                if( stateCollectionBycountry.length <= 0 )      
                  stateCollectionBycountry = new admin.StateCollection(stateCollection.where({scid:1}));       
                console.log('stateCollectionBycountry');console.log(stateCollectionBycountry);

                if (this.stateCollectionView) {
                    this.stateCollectionView.$el.empty();
                  //  this.stateCollectionView.$el.unbind();
                    this.stateCollectionView.collection= stateCollectionBycountry;
                    this.stateCollectionView.render();
                }
                else
                {                       
                    this.stateCollectionView = new admin.StateCollectionView({
                            el: $( '#selectState' ),
                            collection: stateCollectionBycountry,
                            endChain: this.endChain
                    });
                }

                //this.stateCollectionView.disabledElement();
                $(this.stateCollectionView.el).attr('disabled', false);
                //set selected geo name
                console.log('Country Name: ' + $("#select option:selected").text());
                appRouter.currentView.fileUploadConfig.countryName = $("#selectCountry option:selected").text();
                appRouter.currentView.fileUploadConfig.countryID = countryID;
            }
        }
        
    },

    isSelected: function(e) {

        e.preventDefault();

        this.selectedData();

    },

     disabledElement : function()
    {
        

        if (this.collection) 
        {
          //  console.log("logging >>>>>>>>>>>>>>>>>>>>>>>. disabled");
            $( this.$el).attr('disabled', false);
          /*  this.collection.reset();
            this.$el.empty();
       
            this.render();*/
        }
        if(this.countryCollectionView)
        {
             $(this.countryCollectionView.el).attr('disabled', true);
            this.countryCollectionView.collection.reset();
            this.countryCollectionView.$el.empty();
           // this.stateCollectionView.$el.unbind();
            this.countryCollectionView.render();
             this.countryCollectionView.disabledElement();
        }
    }    	
 
});
