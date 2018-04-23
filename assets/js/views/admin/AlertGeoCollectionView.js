var admin = admin || {};

admin.AlertGeoCollectionView = Backbone.View.extend({

	initialize: function(options) {
	    console.log('Initialize AlertGeoCollectionView');
	    console.log('geoCollection'); console.log(options.usergeoCollection);
        console.log("geoCollection "+JSON.stringify(options.usergeoCollection));
        this.endChain=options.endChain;
        this.title="geography";
        this.regulationData = options.usergeoCollection;
		this.collection = new admin.GeographyCollection(options.usergeoCollection.geoCollection);
		_.bindAll(this, "renderGeo");
		_.bindAll(this, "render");
		this.render();
	},

    events: {
      'change' : 'isSelected' 
    },

    render: function() {
        console.log('Rendering AlertGeoCollectionView');
        this.$el.html( '<option value="Select"></option>' );
         // $(document).ready(function(){
            $("#selectGeography option[value='Select']").remove();
            $("#selectCountry option[value='']").remove();
      // });
		this.collection.each(function(item) {
            console.log("each item "+JSON.stringify(item));
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

    selectedData: function()
    {
      var _self = this;
        if( this.endChain != this.title )
        {
            var geoIds = [];
            var alertValues = [];
            var values = $(this.el).val();

            if( values && values.length > 0 )
            {
                $.each(values, function(index, value )
                {
                   console.log(" value = "+ value);
                   geoIds[index] =  parseInt(value,10);

                  console.log(" Geo value = "+ value); 

                });

            }


          // var  geoId = parseInt($(this.el).val(), 10);
//            console.log("geoId",geoId);

            var countryArray = appRouter.currentView.regulations.countryCollection;
            if (countryArray.length > 0) {
              $( '#selectState' ).html("");
                var countryCollection = new admin.CountryCollection(countryArray);
                console.log("countryCollection",JSON.stringify(countryCollection));

               // var filter = {gid: geoId}; console.log("filter",filter);
                var countryCollectionByGeo = new admin.CountryCollection();

                $.each(geoIds, function(index, value )
                {
                   countryCollectionByGeo.add(countryCollection.where({gid:value}));
                });
                if(countryCollectionByGeo.length != 0){

                 if( countryCollectionByGeo.length <= 0 )
                      countryCollectionByGeo =  new admin.CountryCollection(countryCollection.where({gid:1}));   
                    console.log("countryCollection",JSON.stringify(countryCollectionByGeo));


                if (this.countryCollectionView) {
                    this.countryCollectionView.$el.empty();
                   // this.countryCollectionView.$el.unbind();
                     this.countryCollectionView.collection = countryCollectionByGeo;
                     this.countryCollectionView.render();
                }  
              else
              {
                       this.countryCollectionView = new admin.CountryAlertCollectionView({
                        el: $( '#selectCountry' ),
                        collection : countryCollectionByGeo,
                        endChain: this.endChain

                      });
                }                     

              /*  this.countryCollectionView = new admin.CountryCollectionView({
                        el: $( '#selectCountry' ),
                        dataCollection: countryCollectionByGeo
                });*/

            
                $(this.countryCollectionView.el).attr('disabled', false);
                 this.countryCollectionView.disabledElement();
                //set selected geo name
                 console.log('GeographyName: ' + $("#select option:selected").text());
                 appRouter.currentView.alertConfig.geoName = $("#selectGeography option:selected").text();
                 appRouter.currentView.alertConfig.geoId = geoIds;
               }

                if(countryCollectionByGeo.length == 0){

            var stateArray = appRouter.currentView.regulations.stateCollection;
            console.log("stateArray",JSON.stringify(stateArray));
            if (stateArray.length > 0) {
              $( '#selectCountry' ).html("");
                var stateCollection = new admin.StateCollection(stateArray);
                console.log("stateCollection",JSON.stringify(stateCollection));

                var stateCollectionBycountry = new admin.StateCollection();
                var stateALL = false;
                $.each(geoIds, function(index, value )
                {
                      var filter = {gid: value,cntid:23}; 
                        console.log("filter",filter);
                        var collItem = stateCollection.where(filter);
                        if( collItem.length <= 0 ) stateALL = true;
                        stateCollectionBycountry.add(collItem);
                        console.log("stateCollection",JSON.stringify(stateCollectionBycountry));
                     
                    
                });
 
         
                if( values && values.length > 0 )
                { console.log("inside the loop");
                                  if( geoIds.length > 0 )
                                  {
                                      $.each(geoIds, function(index, gidValue )
                                        {
                                                 var stateMap = { gid:gidValue,cntid:23};
                                                 alertValues.push(stateMap);
 
                                             
 
                                        });
                                         }
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

             }
               
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
            $( this.$el).attr('disabled', false);
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
