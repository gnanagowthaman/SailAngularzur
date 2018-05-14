var admin = admin || {};

admin.MgmtGeographyCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize RegulationCollectionView');
        console.log('geoCollection');
        console.log(options.geoCollection);
        this.collection = new admin.GeographyCollection(options.geoCollection);
        _.bindAll(this, "renderGeography");
        _.bindAll(this, "render");
        this.render();
    },   

    render: function() {
        console.log('Rendering Geography');
        this.collection.each(function(item) {
        console.log(item.get('id'));

       // var skipall = item.get('name').toUpperCase() == "ALL";
       // if (skipall == false) {

       //  console.log(item.get('name'));
            this.renderGeography(item);
        // }
        }, this );


        return this;
    },

    renderGeography: function( item ) {
        var geoItemView = new admin.GeoItemView({
            model: item
        });
        this.$el.append( geoItemView.render().el );
    }
});
