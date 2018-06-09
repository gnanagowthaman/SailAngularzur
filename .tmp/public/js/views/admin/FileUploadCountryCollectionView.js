var admin = admin || {};

admin.FileUploadCountryCollectionView = Backbone.View.extend({

	initialize: function() {
	    console.log('Initialize CountryCollectionView');
	    console.log('countryCollection'); console.log(this.collection);
		//this.collection = new admin.CountryCollection(options.countryCollection);
		_.bindAll(this, "renderCountry");
		_.bindAll(this, "render");
		console.log(this.collection);
		this.render();
	},

	events: {
      //'change #selectCountry' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering CountryCollectionView');
        this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
      	console.log(item.get('country_id'));console.log(item.get('cname'));
			this.renderCountry(item);
		}, this );
    	return this;
	},	

	renderCountry: function( item ) {
		var countryItemView = new admin.FileUploadCountryItemView({
			model: item
		});
    	this.$el.append( countryItemView.render().el );
	},


	isSelected: function(e) {
        e.preventDefault();
        console.log('Country Triggered'); 
        var countryId = parseInt($(this.el).val(), 10);

        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var stateArray = appRouter.currentView.regulationData.stateCollection;
        console.log("stateArray",stateArray);
        console.log(appRouter.geoName);

        if (stateArray.length > 0) {
            var stateCollection = new admin.StateCollection(stateArray);
            console.log('stateCollection');console.log(JSON.stringify(stateCollection));
           var filter = {country_id: countryId}; console.log(filter);
           var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter)); 

            if(stateCollectionBycountry.length==0){      
                console.log("geography and country",geoId,countryId);
                var countryname = $("#selectCountry option:selected").text();
                console.log("countryname",countryname);
                var domainArray = appRouter.currentView.regulationData.domainCollection;
                console.log("domainArray",JSON.stringify(domainArray));
                if (domainArray.length > 0) {
                    var domainCollection = new admin.DomainCollection(domainArray);
                   var filter = {gid : geoId, cntid : countryId, sid : 18 }; 
                   console.log(JSON.stringify(filter));
                   var domainCollectionByDomain = new admin.DomainCollection(domainCollection.where(filter));         
                   console.log('domainCollectionByDomain');
                   console.log(JSON.stringify(domainCollectionByDomain)); 
                   
                     if (this.domainCollectionView) 
                    {
                        this.domainCollectionView.$el.empty();
                        //this.domainCollectionView.$el.unbind();
                        this.domainCollectionView.collection = domainCollectionByDomain;
                        this.domainCollectionView.render();
                    }  
                    else
                    {                 
                    this.domainCollectionView = new admin.DomainCollectionView({
                            el: $( '#selectDomain' ),
                          collection: domainCollectionByDomain
                      });
                    }
                   console.log("Setting value for collection");
                   //  this.domainCollectionView.setCallFrom(true);
                    this.domainCollectionView.collection= domainCollectionByDomain;
                    $(this.domainCollectionView.el).attr('disabled', false);
                    this.domainCollectionView.render();
                    this.domainCollectionView.disabledElement();
                }
                  $(this.domainCollectionView.el).attr('disabled', false);
                  $( '#selectDomain' ).attr('disabled', false);
                 appRouter.currentView.fileUploadConfig.stateID = 18;
                  // appRouter.currentView.fileUploadConfig.stateName = $("#selectState option:selected").text();
                  appRouter.currentView.fileUploadConfig.countryName = countryname;
                 appRouter.currentView.fileUploadConfig.countryId = countryId;
               appRouter.countryName = countryname;

            }
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
            appRouter.currentView.fileUploadConfig.countryName = $("#selectCountry option:selected").text();
            appRouter.currentView.fileUploadConfig.countryId = countryId;

            appRouter.countryName = $("#selectCountry option:selected").text();
            console.log(appRouter.countryName);
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