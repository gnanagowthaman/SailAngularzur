var admin = admin || {};

admin.MgmtRegulationAlertCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('inside MgmtRegulationAlertCollectionView');
      // if( options.regCollection == undefined )
        this.collection = new admin.RegulationAlertCollection(options.regCollection);
        _.bindAll(this, "renderRegulation");
        _.bindAll(this, "render");
        this.render();
    },

    render: function() {
        console.log('Rendering Regulation');
        this.collection.each(function(item) {
            console.log(item.get('id'));
            console.log(item.get('name'));
            this.renderRegulation(item);
        }, this );
        return this;
    },

    renderRegulation: function( item ) {
        var regulationItemView = new admin.RegulationAlertItemView({
            model: item
        });
        this.$el.append( regulationItemView.render().el );
    }
});
