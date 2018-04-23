var admin = admin || {};

admin.MgmtGeographyRegulationCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize RegulationCollectionView');
        console.log(options.geoCollection);
        this.collection = new admin.GeographyCollection(options.geoCollection);
        _.bindAll(this, "renderGeography");
        _.bindAll(this, "render");
        this.render();
    },   

    render: function() {
        this.collection.each(function(item) {
            console.log(item.get('id'));
            console.log(item.get('name'));
            this.renderGeography(item);
        }, this );
        return this;
    },

    renderGeography: function( item ) {
        var userGeoItemView = new admin.userGeoItemView({
            model: item
        });
        this.$el.append( userGeoItemView.render().el );
    }
});
