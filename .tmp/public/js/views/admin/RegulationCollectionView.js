var admin = admin || {};

admin.RegulationCollectionView = Backbone.View.extend({

	initialize: function() {
	    console.log('Initialize RegulationCollectionView');
	    console.log('RegulationCollection'); console.log(this.collection);
		// this.collection = new admin.DomainCollection(options.domainCollection);
		_.bindAll(this, "renderRegulation");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      'change' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering RegulationCollectionView');
        this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
      		console.log(item.get('regulation_id'));console.log(item.get('rname'));
			this.renderRegulation(item);
		}, this );
    	return this;
	},	

	renderRegulation: function( item ) {
		var regulationItemView = new admin.RegulationItemView({
			model: item
		});
    	this.$el.append( regulationItemView.render().el );
	},

    isSelected: function(e) {
        e.preventDefault();
        console.log('Regulation Triggered');
        var regId = parseInt($(this.el).val(), 10);
        var geoId    = appRouter.currentView.fileUploadConfig.geoId;
        var domainId = appRouter.currentView.fileUploadConfig.domainId;
        var docArray = appRouter.currentView.regulationData.documentCollection;
        if (docArray.length > 0) {
        	var docCollection = new admin.DocumentCollection(docArray);
        	console.log('docCollection');console.log(docCollection);
        	var filter = {geography_id: geoId, domain_id: domainId,regulation_id: regId}; console.log(filter);
        	var docCollectionByReg = new admin.DocumentCollection(docCollection.where(filter));        	
        	console.log('docCollectionByReg');console.log(docCollectionByReg);
        	if (this.documentCollectionView) {
	            this.documentCollectionView.$el.empty();
	            this.documentCollectionView.$el.unbind();
        	}        	        	
        	this.documentCollectionView = new admin.DocumentCollectionView(
            	{ el: $( '#selectDoc' ),
            	  collection: docCollectionByReg
            	});
            $(this.documentCollectionView.el).attr('disabled', false);
            //set selected reg name
            console.log('RegName: ' + $("#selectReg option:selected").text());
            appRouter.currentView.fileUploadConfig.regName = $("#selectReg option:selected").text();            				
        }                
    }	
	
});