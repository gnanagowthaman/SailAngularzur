var admin = admin || {};

admin.DocTypeCollectionView = Backbone.View.extend({

	initialize: function(options) {
	    console.log('Initialize GeoCollectionView');
	    console.log('dctypeCollection'); console.log(options.DoctypeCollection);
		this.collection = new admin.DoctypeCollection(options.DoctypeCollection);
		_.bindAll(this, "renderDoctype");
		_.bindAll(this, "render");
		this.render();
	},

	events: {
      		'change' : 'isSelected' 
	},

	render: function() {
    	console.log('Rendering GeoCollectionView');
        this.$el.html( '<option value="">Select</option>' );
		this.collection.each(function(item) {
      		console.log(item.get('id'));
            console.log(item.get('name'));
			this.renderGeo(item);
		}, this );
    	return this;
	},	

	renderDoctype: function( item ) {
		var DocTypeItemView = new admin.DocTypeItemView({
			model: item
		});
    	this.$el.append( DocTypeItemView.render().el );
	},

    isSelected: function(e) {
        e.preventDefault();
        console.log('Doctype Triggered'); 
        var doctypeid = parseInt($(this.el).val(), 10);
        var domainArray = appRouter.currentView.regulationData.domainCollection;
        if (domainArray.length > 0) {
        	var domainCollection = new admin.DomainCollection(domainArray);
        	var filter = {doctype_id: doctypeid}; console.log(filter);
        	var domainCollectionByGeo = new admin.DoctypeCollection(DoctypeCollection.where(filter));        	
        	console.log('domainCollectionByGeo');console.log(domainCollectionByGeo);
        	if (this.domainCollectionView) {
	            this.domainCollectionView.$el.empty();
	            this.domainCollectionView.$el.unbind();
        	}        	        	
        	this.DocTypeCollectionView = new admin.DoctypeCollectionView(
            	{ el: $( '#selectDomain' ),
            	  collection: domainCollectionByGeo
            	});
            $(this.DocTypeCollectionView.el).attr('disabled', false);
            //set selected geo name
            console.log('DocType: ' + $("#selectGeo option:selected").text());
            appRouter.currentView.fileUploadConfig.doctypeName = $("#selectdoctype option:selected").text();
            appRouter.currentView.fileUploadConfig.doctypeId = doctypeId;
        }
    }	
	
});