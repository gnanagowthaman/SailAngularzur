var admin = admin || {};

admin.MgmtStateCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize StateCollectionView');
        //console.log(options.stateCollection);
        this.collection = new admin.StateCollection(options.stateCollection);
        _.bindAll(this, "renderState");
        _.bindAll(this, "render");
        this.render();
    },   
   render: function() {
    console.log("Render State");
        this.collection.each(function(item) {
            console.log(item.get('id'));
            console.log(item.get('name'));
            this.renderState(item);
        }, this );
        return this;
    },

    renderState: function( item ) {
        var stateItemView = new admin.StateItemView({
            model: item
        });
        this.$el.append( stateItemView.render().el );
    }
});
