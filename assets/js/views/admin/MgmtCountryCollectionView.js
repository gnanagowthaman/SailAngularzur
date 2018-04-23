var admin = admin || {};

admin.MgmtCountryCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize CountryCollectionView');
        console.log('countryCollection');
        console.log(options.countryCollection);
        this.collection = new admin.CountryCollection(options.countryCollection);
        _.bindAll(this, "renderCountry");
        _.bindAll(this, "render");
        this.render();
    },   

    render: function() {
        console.log('Rendering Country');
        this.collection.each(function(item) {
        console.log(item.get('id'));
        console.log(item.get('name'));
            this.renderCountry(item);
        }, this );
        return this;
    },

    renderCountry: function( item ) {
        var countryItemView = new admin.CountryItemView({
            model: item
        });
        this.$el.append( countryItemView.render().el );
    }
});
