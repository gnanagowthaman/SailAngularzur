var admin = admin || {};

admin.MgmtCountryRegulationCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize CountryCollectionView');
        console.log(options.countryCollection);
        this.collection = new admin.CountryCollection(options.countryCollection);
        _.bindAll(this, "renderCountry");
        _.bindAll(this, "render");
        this.render();
    },   

    render: function() {
        this.collection.each(function(item) {
            console.log(item.get('id'));
            console.log(item.get('name'));
            this.renderCountry(item);
        }, this );
        return this;
    },

    renderCountry: function( item ) {
        var userCountryItemView = new admin.userCountryItemView({
            model: item
        });
        this.$el.append( userCountryItemView.render().el );
    }
});
