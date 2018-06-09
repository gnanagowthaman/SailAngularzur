var admin = admin || {};

admin.CountryCollectionView = Backbone.View.extend({

	initialize: function(options) {
	    console.log('Initialize CountryCollectionView');
	  //  console.log('countryCollection'); console.log(options.dataCollection);
       //    console.log("countryCollection",JSON.stringify(options.dataCollection));
		//this.collecticon = new admin.CountryCollection(options.countryCollection);
      //  this.collectionC = []; //new admin.CountryCollection(options.dataCollection);

      //  console.log("countryCollection  1",JSON.stringify(this.collectionC));
      this.endChain=options.endChain;
      this.title="country";
      console.log("this endChain",options);
		_.bindAll(this, "renderCountry");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      'change' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering CountryCollectionView');
        this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
            console.log("each item "+JSON.stringify(item));
      		console.log(item.get('id'));console.log(item.get('name'));
			this.renderCountry(item);
		}, this );
    	return this;
	},	

	renderCountry: function( item ) {
		var countryItemView = new admin.CountryItemView({
			model: item
		});
    	this.$el.append( countryItemView.render().el );
	},


	/*isSelected: function(e) {
        e.preventDefault();
        console.log('Country Triggered'); 
        var countryId = parseInt($(this.el).val(), 10);
    }	*/

    isSelected: function(e) {		//BALAJI

        e.preventDefault();
        if(this.endChain){
          if( this.endChain == "state" )
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

       
        var geoId    = appRouter.currentView.fileUploadConfig.gId;
        var countryId    = parseInt($(this.el).val(), 10);
         var stateArray = appRouter.currentView.regulations.stateCollection;
        console.log("stateArray",JSON.stringify(stateArray));
         var stateCollection = new admin.StateCollection(stateArray);
        console.log("stateCollection",stateCollection);
        var filter = {scid: countryId}; 
        console.log("filter",filter);
        var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter));
         if(stateCollectionBycountry.length==0){
          state_id = 18;
        }else{
          // this.stateCollectionView.render();
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
                appRouter.currentView.fileUploadConfig.countryID = countryId;
            }
        
        
        console.log("state",state_id);
        var regulationrray = appRouter.currentView.regulations.regCollection;
        console.log("regulationrray",JSON.stringify(regulationrray));
        if (regulationrray.length > 0) {
            var regCollection = new Backbone.Collection(regulationrray);
            console.log("regCollection",JSON.stringify(regCollection));

        var filter = {geography_id: geoId, country_id : countryId, state_id : state_id}; 

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
            appRouter.currentView.fileUploadConfig.stateID = state_id;
        }

      },   
processNext : function()
      {
            console.log('Country Triggered'); 
            var countryID = parseInt($(this.el).val(), 10);
            console.log("countryID",countryID);
            var stateArray = appRouter.currentView.regulations.stateCollection;
            console.log("stateArray",JSON.stringify(stateArray));
            if (stateArray.length > 0) {
                 $('#selectState').show();
                var stateCollection = new admin.StateCollection(stateArray);
                console.log("stateCollection",stateCollection);
                var filter = {scid: countryID}; 
                console.log("filter",filter);
                var stateCollectionBycountry = new admin.StateCollection(stateCollection.where(filter)); 
                 if(stateCollectionBycountry.length==0){
                     // $('#selectState').hide();
                        var geoId    = appRouter.currentView.fileUploadConfig.gId;
                      console.log("geography and country",geoId,countryID);
                   var countryname = $("#selectCountry option:selected").text();
                   console.log("countryname",countryname);
                   appRouter.currentView.fileUploadConfig.countryName = countryname;
                   appRouter.currentView.fileUploadConfig.countryID = countryID;

                  var domainrray = appRouter.currentView.regulations.domainCollection;
                     console.log("domainrray",JSON.stringify(domainrray));
                   if (domainrray.length > 0) {
                    var domainCollection = new Backbone.Collection(domainrray);
                   var filter = {geography_id : geoId, country_id : countryID, state_id : 18 }; 
                   console.log(JSON.stringify(filter));
                   var domainCollectionByDomain = new admin.DomainCollection(domainCollection.where(filter));         
                   console.log('domainCollectionByDomain');
                   console.log(JSON.stringify(domainCollectionByDomain)); 
                   
                   this.domainCollectionView = new admin.MgmtDomainCollectionView({
                        el: $( '#selectDomain' )
                       // collection: regCollectionByDomain
                });
                console.log("Setting value for collection");
               //  this.domainCollectionView.setCallFrom(true);
                this.domainCollectionView.collection= domainCollectionByDomain;
                this.domainCollectionView.idTitle ="did";
                $(this.domainCollectionView.el).attr('disabled', false);
                this.domainCollectionView.render();
                this.domainCollectionView.disabledElement();
                   }
                   appRouter.currentView.fileUploadConfig.stateID = 18;
                    appRouter.currentView.fileUploadConfig.stateName = $("#selectState option:selected").text();
                 }
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
