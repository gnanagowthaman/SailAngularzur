var admin = admin || {};

admin.FileUploadRegulationCollectionView = Backbone.View.extend({

	initialize: function() {
	    console.log('Initialize RegulationCollectionView');
	    console.log('RegulationCollection'); console.log(this.collection);
		// this.collection = new admin.DomainCollection(options.domainCollection);
		_.bindAll(this, "renderRegulation");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      // 'change #selectReg' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering RegulationCollectionView');
        this.$el.html( '<option value="">Select</option>' );
        if( this.collection )
        {
    		this.collection.each(function(item) {
          		console.log(item.get('rlid'));console.log(item.get('rname'));
    			this.renderRegulation(item);
    		}, this );
        }
    	return this;
	},	

	renderRegulation: function( item ) {
		var regulationItemView = new admin.FileUploadRegulationItemView({
			model: item
		});
    	this.$el.append( regulationItemView.render().el );
	},

    isSelected: function(e) {
        e.preventDefault();
        console.log('Regulation Triggered');
        var regId = parseInt($(this.el).val(), 10);
        var regulatorId = appRouter.currentView.fileUploadConfig.regulatorId;
        var domainId = appRouter.currentView.fileUploadConfig.domainId;
        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var countryId    = appRouter.currentView.fileUploadConfig.countryId;
        var stateId    = appRouter.currentView.fileUploadConfig.stateID;


        var docArray = appRouter.currentView.regulationData.documentCollection;

        if (docArray.length > 0) 
        {
        	var docCollection = new admin.DocumentCollection(docArray);
        	var filter = {geography_id: geoId, domain_id: domainId,regulation_id: regId}; console.log(filter);
        	var docCollectionByReg = new admin.DocumentCollection(docCollection.where(filter)); 
        	var filter = {gid: geoId, cntid : countryId, sid : stateId, did: domainId, rid: regulatorId, rlid : regId};  
        	var docCollectionByReg = new admin.DocumentCollection(docCollection.where(filter));   
        	if (this.documentCollectionView)
             { 
	            this.documentCollectionView.$el.empty();
	           // this.documentCollectionView.$el.unbind();
                this.documentCollectionView.collection = docCollectionByReg;
                this.documentCollectionView.render();
        	}   
            else
            {     	        	
            	this.documentCollectionView = new admin.FileUploadDocumentCollectionView(
                	{ el: $( '#selectRootDoc' ),
                	  collection: docCollectionByReg
                	});
            }

            $(this.documentCollectionView.el).attr('disabled', false);
            this.documentCollectionView.disabledElement();
            //set selected reg name
            console.log('RegName: ' + $("#selectReg option:selected").text());
            appRouter.currentView.fileUploadConfig.regName = $("#selectReg option:selected").text();
            appRouter.currentView.fileUploadConfig.regId = regId;  

            appRouter.fileUploadConfig.regName = $("#selectReg option:selected").text();

        }                
    },

      disabledElement : function()
    {
        console.log("Disable element called .............>>>>>>>>>>>>>reglation");


          if (this.documentCollectionView) 
          {
              $(this.documentCollectionView.el).attr('disabled', true);

              this.documentCollectionView.collection.reset();
              this.documentCollectionView.$el.empty();
                 // this.regCollectionView.$el.unbind();
                  this.documentCollectionView.render();
             this.documentCollectionView.disabledElement();
          }

        
    }    	
	
});