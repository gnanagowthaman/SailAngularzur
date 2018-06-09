var admin = admin || {};

// Verify important 
//Louis, found - This file is no where used. verify this file before start using this class or file

admin.RegulatorCollectionView = Backbone.View.extend({

	initialize: function(options) {
	    console.log('Initialize RegulatorCollectionView');
	    console.log('regulatorCollection'); console.log(options.regulatorCollection);
		this.collection = new admin.RegulatorCollection(options.regulatorCollection);
		_.bindAll(this, "renderRegulator");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      'change' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering RegulatorCollectionView');
        this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
      		console.log(item.get('id'));console.log(item.get('name'));
			this.renderRegulator(item);
		}, this );
    	return this;
	},	

	renderRegulator: function( item ) {
		var regulatorItemView = new admin.RegulatorItemView({
			model: item
		});
    	this.$el.append( regulatorItemView.render().el );
	},

    isSelected: function(e) {
        e.preventDefault();

        //Louis - This section is commented as it is not used in anywhere else.
        //because it should not cause the trouble.
        // if you need to use this, verify this class is used in anywhere.
        /*
        console.log('Regulator Triggered'); 
        var regulatorId = parseInt($(this.el).val(), 10);
        var domainArray = appRouter.currentView.regulationData.domainCollection;
        if (domainArray.length > 0) {
        	var domainCollection = new admin.DomainCollection(domainArray);
        	var filter = {regulator_id: regulatorId}; console.log(filter);
        	var domainCollectionByRegulator = new admin.DomainCollection(domainCollection.where(filter));        	
        	console.log('domainCollectionByRegulator');console.log(domainCollectionByRegulator);
        	if (this.domainCollectionView) {
	            this.domainCollectionView.$el.empty();
	            this.domainCollectionView.$el.unbind();
        	}        	        	
        	this.domainCollectionView = new admin.DomainCollectionView({
	                el: $( '#selectDomain' ),
	            	collection: domainCollectionByRegulator
            });
            $(this.domainCollectionView.el).attr('disabled', false);
            //set selected regulator name      console.log('RegulatorName: ' + $("#selectRegulator option:selected").text());
            appRouter.currentView.fileUploadConfig.regulatorName = $("#selectRegulator option:selected").text();
            appRouter.currentView.fileUploadConfig.regulatorId = regulatorId;
        }
        */
    }	
	
});