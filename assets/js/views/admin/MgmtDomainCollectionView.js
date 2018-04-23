var admin = admin || {};

admin.MgmtDomainCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('inside MgmtDomainCollectionView');
        if( options.domainCollection != undefined )
                 this.collection = new admin.DomainCollection(options.domainCollection);

         this.endChain=options.endChain;   //Louis
         this.title="domain";   //Louis
         this.idTitle ="id";

    //    _.bindAll(this, "renderState");
      //  _.bindAll(this, "render");
     //   this.render();

        _.bindAll(this, "renderdomain");
        _.bindAll(this, "render");
        this.render();
        
    },

     events: {
      'change' : 'isSelected' 
    },

    render: function() {
        console.log('Rendering domain');
        if( this.collection )
        {
            this.collection.each(function(item) {
                console.log(item.get(this.idTitle));
                console.log(item.get('name'));
                this.renderdomain(item);
            }, this );
        }
        return this;
    },

    renderdomain: function( item ) {
        var mgmtDomainItemView = new admin.MgmtDomainItemView({
            model: item
        });
        mgmtDomainItemView.idTitle = this.idTitle;
        this.$el.append( mgmtDomainItemView.render().el );
    },


      isSelected: function(e) 
      { 
        e.preventDefault();
        var domainId = parseInt($(this.el).val(), 10);
    
     },

     disabledElement : function()
    {
        
    }    
});
