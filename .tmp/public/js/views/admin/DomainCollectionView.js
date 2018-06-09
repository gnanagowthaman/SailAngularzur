var admin = admin || {};



admin.DomainCollectionView = Backbone.View.extend({

	initialize: function() {

	    console.log('Initialize DomainCollectionView');
	    console.log('domainCollection'); console.log(this.collection);
		// this.collection = new admin.DomainCollection(options.domainCollection);

		_.bindAll(this, "renderDomain");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      //'change #selectDomain' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering DomainCollectionView');
        this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
      		console.log(item.get('did'));console.log(item.get('name'));
			this.renderDomain(item);
		}, this );
    	return this;
	},	

	renderDomain: function( item ) {
		var domainItemView = new admin.DomainItemView({
			model: item
		});
    domainItemView.id ="did";
    domainItemView.name = "name";

    	this.$el.append( domainItemView.render().el );
	},


   isSelected:function(e){
     e.preventDefault();
        console.log('State Triggered'); 
        var domainId = parseInt($(this.el).val(), 10);

        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId = appRouter.currentView.fileUploadConfig.countryId;
        var stateId =   appRouter.currentView.fileUploadConfig.stateID;

        var regulatorArray = appRouter.currentView.regulationData.regulatorCollection;
        console.log(regulatorArray);


        if (regulatorArray.length > 0) {
            var regulatorCollection = new admin.RegulatorCollection(regulatorArray);
            console.log('regulatorCollection');console.log(regulatorCollection);

            //Louis, since this is used in file upload management.
            // This is used to load the regulator 

           var filter = {gid: geoId, cntid:countryId, sid:stateId , did:domainId }; 
           console.log(JSON.stringify(filter));

           var regulatorCollectionByDomain = new admin.RegulatorCollection(regulatorCollection.where(filter)); 
           console.log('regulatorCollectionByDomain');
           console.log(JSON.stringify(regulatorCollectionByDomain));
                        
            if (this.regulatorCollectionView) 
            {
                this.regulatorCollectionView.$el.empty();
               // this.regulatorCollectionView.$el.unbind();
               this.regulatorCollectionView.collection = regulatorCollectionByDomain;
               this.regulatorCollectionView.render();
            }  
            else
            {                     
              this.regulatorCollectionView = new admin.FileUploadRegulatorCollectionView({
                    el: $( '#selectRegulator' ),
                    collection: regulatorCollectionByDomain
              });
            }
            $(this.regulatorCollectionView.el).attr('disabled', false);
            this.regulatorCollectionView.disabledElement();
            //set selected domain name
            console.log('domainName: ' + $("#selectDomain option:selected").text());
            appRouter.currentView.fileUploadConfig.domainName = $("#selectDomain option:selected").text();
            appRouter.currentView.fileUploadConfig.domainId = domainId;

            appRouter.domainName = $("#selectDomain option:selected").text();
        }        
  },

     disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>domain");


          if (this.regulatorCollectionView) 
          {
              $(this.regulatorCollectionView.el).attr('disabled', true);

              this.regulatorCollectionView.collection.reset();
              this.regulatorCollectionView.$el.empty();
                 // this.regCollectionView.$el.unbind();
                  this.regulatorCollectionView.render();
             this.regulatorCollectionView.disabledElement();
          }

        
    }    
});