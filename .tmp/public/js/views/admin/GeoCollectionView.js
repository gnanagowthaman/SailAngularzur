var admin = admin || {};

admin.GeoCollectionView = Backbone.View.extend({

	initialize: function(options) {
          this.fileUploadConfig = {};
	    console.log('Initialize GeoCollectionView');
	    console.log('geoCollection'); console.log(options.geoCollection);
		this.collection = new admin.GeographyCollection(options.geoCollection);
        console.log("this.collection",this.collection);
		_.bindAll(this, "renderGeo");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
     // 'change #selectGeo' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering GeoCollectionView');
        this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
      		console.log(item.get('id'));console.log(item.get('name'));
			this.renderGeo(item);
		}, this );
    	return this;
	},	

	renderGeo: function( item ) {
		var geoItemView = new admin.GeoItemView({
			model: item
		});
    	this.$el.append( geoItemView.render().el );
	},

   
     isSelected: function(e) {
        e.preventDefault();
        console.log('country Triggered');
        var geoId =  parseInt($(this.el).val(), 10);
        //var domainId = parseInt($(this.el).val(), 10);
        //var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryArray = appRouter.currentView.regulationData.countryCollection;
        console.log(countryArray);

        if (countryArray.length > 0) {
            var countryCollection = new admin.CountryCollection(countryArray);
            //console.log('countryCollection');console.log(countryCollection);
            var filter = {geography_id: geoId}; console.log(filter);
            var countryCollectionBygeo = new admin.CountryCollection(countryCollection.where(filter)); 
            console.log('GEOCollectionBycountry');console.log(countryCollectionBygeo);
                        
            //Louis - Modified below to avoid memory leak
            if (this.countryCollectionView) 
            {
                this.countryCollectionView.$el.empty();
                //this.countryCollectionView.$el.unbind();
                 this.countryCollectionView.collection =countryCollectionBygeo;
                 this.countryCollectionView.render();
            }      
            else
            {                 
                this.countryCollectionView = new admin.FileUploadCountryCollectionView({
                      el: $( '#selectCountry' ),
                      collection: countryCollectionBygeo
                });
            }

             $(this.countryCollectionView.el).attr('disabled', false);
             this.countryCollectionView.disabledElement();

            //set selected domain name
            console.log('GeographyName: ' + $("#selectGeo option:selected").text());
            appRouter.currentView.fileUploadConfig.geoName = $("#selectGeo option:selected").text();
            appRouter.currentView.fileUploadConfig.geoId = geoId;

            appRouter.geoName = $("#selectGeo option:selected").text();
            console.log(appRouter.geoName);
        } 
         console.log('Country Triggered'); 
        var countryId = parseInt($(this.el).val(), 10);

        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var stateArray = appRouter.currentView.regulationData.stateCollection;
        console.log("stateArray",stateArray);

        if (stateArray.length > 0) {
           $('#selectState').show();
            var stateCollection = new admin.StateCollection(stateArray);
            console.log('stateCollection');console.log(JSON.stringify(stateCollection));
           var filter = {country_id: 23,geography_id: geoId}; console.log(filter);
           var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter));
            appRouter.currentView.fileUploadConfig.countryId = 23;
           if( stateCollectionBycountry.length <= 0 )      
                  stateCollectionBycountry = new admin.StateCollection(stateCollection.where({state_id:1}));    
                
           console.log('stateCollectionBycountry');console.log(stateCollectionBycountry);
                        
            if (this.stateCollectionView) 
            {
                this.stateCollectionView.$el.empty();
               // this.stateCollectionView.$el.unbind();
               this.stateCollectionView.collection = stateCollectionBycountry;
               this.stateCollectionView.render();
            } 
            else
            {                      
              this.stateCollectionView = new admin.FileUploadStateCollectionView({
                    el: $( '#selectState' ),
                    collection: stateCollectionBycountry
              });
            }
            $(this.stateCollectionView.el).attr('disabled', false);
            this.stateCollectionView.disabledElement();
            //set selected domain name
            console.log('CountryName: ' + $("#selectCountry option:selected").text());
            appRouter.currentView.fileUploadConfig.countryName = "-";

            appRouter.countryName = "-";
           
        }        
    } ,

     disabledElement : function()
    {
        

         if (this.collection) 
        {
            $( this.$el).attr('disabled', true);
            this.collection.reset();
            this.$el.empty();
           // this.stateCollectionView.$el.unbind();
            this.render();
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