var admin = admin || {};

admin.MgmtRegulationCollectionView = Backbone.View.extend({

    initialize: function(options) {
         this.callFromUser = false;
        console.log('inside MgmtRegulationCollectionView');
      // if( options.regCollection == undefined )
    //    this.collection = new admin.RegulationCollection(options.regCollection);
         console.log('geoCollection');
        //console.log(options.geoCollection);
     //   this.collection = new admin.GeographyCollection(options.geoCollection);

         this.endChain=options.endChain;   //Louis
         this.title="state";   //Louis

        _.bindAll(this, "renderRegulation");
        _.bindAll(this, "render");
        this.render();
    },

     events: {
      'change' : 'isSelected' 
    },

    render: function() {
        console.log('Rendering Regulation');
        if( this.collection )
        {
            this.collection.each(function(item) {
                console.log(item.get('id'));
                console.log(item.get('name'));
                this.renderRegulation(item);
            }, this );
        }
        return this;
    },

    renderRegulation: function( item ) {
        var regulationItemView = new admin.MgmtRegulationItemView({
            model: item
        });
        regulationItemView.setCallFrom(this.callFromUser);

        this.$el.append( regulationItemView.render().el );
    },

    setCallFrom: function(flag)
    {
        this.callFromUser = flag;
    },

    disabledElement : function()
    {
          console.log("Disable element called .............>>>>>>>>>>>>>Regulation");
        $(this.el).attr('disabled', false);
    },


      isSelected: function(e) { 
        e.preventDefault();
     },

        
});
