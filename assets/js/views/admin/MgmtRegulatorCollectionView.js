var admin = admin || {};

admin.MgmtRegulatorCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize RegulatorCollectionView');
        console.log('regulatorCollection');
        console.log(options.regulatorCollection);
        this.collection = new admin.RegulatorCollection(options.regulatorCollection);
        _.bindAll(this, "renderRegulator");
        _.bindAll(this, "render");
        this.render();
    },   

    render: function() {
        console.log('Rendering regulator');
        this.collection.each(function(item) {
        console.log(item.get('id'));
        console.log(item.get('name'));
            this.renderRegulator(item);
        }, this );
        return this;
    },

    renderRegulator: function( item ) {
        var regulatorItemView = new admin.RegulatorItemView({
            model: item
        });
        this.$el.append( regulatorItemView.render().el );
    }
});
