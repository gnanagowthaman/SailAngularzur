var admin = admin || {};

admin.DocumentTypeCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize DocumentTypeCollectionView');
        // console.log('docTypeCollection');
        console.log(options.docTypeCollection);
        this.collection = new admin.SpecialDocCollection(options.docTypeCollection);
        _.bindAll(this, "renderDocument");
        _.bindAll(this, "render");
        this.render();
    },   

    events : {
    	'change' : 'isSelected',
    },

    render: function() {
        // console.log('Rendering regulator');
        console.log(this.$el);
        this.$el.html( '<option value="">Select</option>' );
        this.collection.each(function(item) {
        // console.log(item.get('id'));
        // console.log(item.get('document_type'));
        // console.log(">>>>>>>>");
            this.renderDocument(item);
        }, this );
        return this;
    },

    renderDocument: function( item ) {
        // console.log(">>>>>>>> 1");
        var docTypeItemView = new admin.SpecialDocTypeItemView({
            model: item
        });
        // console.log(">>>>>>>> 2");
        this.$el.append( docTypeItemView.render().el );
    },

    isSelected: function(e){
    	// var regId = appRouter.currentView.fileUploadConfig.regId;
    	// var regulatorId = appRouter.currentView.fileUploadConfig.regulatorId;
     //    var domainId = appRouter.currentView.fileUploadConfig.domainId;
     //    var geoId    = appRouter.currentView.fileUploadConfig.geoId;
     //    var countryId    = appRouter.currentView.fileUploadConfig.countryId;
     //    var stateId    = appRouter.currentView.fileUploadConfig.stateID;
       
     //    var spclDocId = parseInt($(e.target).val(), 10);
     //    console.log("spclDocId",spclDocId);
     //    appRouter.currentView.fileUploadConfig.spclDocId = spclDocId;
     //    console.log(appRouter.currentView.fileUploadConfig.spclDocId);
      
    }
});
