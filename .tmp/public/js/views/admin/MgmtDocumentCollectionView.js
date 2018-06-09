var admin = admin || {};

admin.MgmtDocumentCollectionView = Backbone.View.extend({

  initialize: function(options) {
    console.log('Initialize DocumentCollectionView');
    console.log('docCollection');
    //Louis , Modified to suite both document, subdocument and regulation management
    if(options.docCollection != undefined ) {
      console.log(options.docCollection);
      if (options.mode == 'CREATE') {
        this.collection = new admin.DocumentCollection(options.docCollection);
      } else {
        this.collection = new admin.DocumentCollection(options.docCollection);
        this.collection.remove(options.subDocModel);
        console.log('Doc List:', this.collection);
      }
      
    }
    this.mode = options.mode;
    this.subDocModel = options.subDocModel;
     // this.endChain=options.endChain
     // this.title = "document";
    _.bindAll(this, "renderDocument");
    _.bindAll(this, "render");
    this.render();
  },

  events: {
      // 'change' : 'isSelected' 
    },

  render: function() {
      console.log('Rendering Document');
      if( this.collection ) {
        // if( this.endChain != undefined )
        if (this.mode == 'CREATE') {
          this.$el.html( '<option value="">Select</option>' );
        }
        this.collection.each(function(item) {
        this.renderDocument(item);
      }, this );
    }
      return this;
  },

  renderDocument: function( item ) {
    var docItemView = new admin.MgmtDocumentItemView({
      model: item
    });
      docItemView.render();
      if (this.mode == 'UPDATE' && this.subDocModel.parent_id == item.get('id')) {
        docItemView.$el.prop('selected', true);
      }      
      this.$el.append( docItemView.el );
  },

   // isSelected: function(e) { 
   //      e.preventDefault();
   //      console.log('document Triggered'); 
   //       var docId = parseInt($(this.el).val(), 10);

   //       if( this.endChain != this.title ) {

   //         var  subdocArray = this.subDocCollection;
   //          if (subdocArray.length > 0) 
   //          {
   //              var subDocCollection = new admin.SubDocumentCollection(subdocArray);
   //              console.log("sub doct Collection",JSON.stringify(subDocCollection));

   //              var filter = {parent_id: docId}; 
   //              var subCollection = new admin.SubDocumentCollection(subDocCollection.where(filter));  
   //                   console.log("subCollection",JSON.stringify(subCollection));
            
   //               if (this.subDocCollectionView) 
   //               {
   //                  this.subDocCollectionView.$el.empty();
   //                //  this.countryCollectionView.$el.unbind();subCollection
   //                  this.subDocCollectionView.collection = subCollection;
   //                  this.subDocCollectionView.render();
   //              }
   //              else
   //              { 
   //                  this.subDocCollectionView = new admin.MgmtSubDocCollectionView({
   //                      el: $( '#selectsubDocument' ),
   //                      collection : subCollection
   //                   });
   //              }         
   //          }              
   //       } 
                  
   //    },
});