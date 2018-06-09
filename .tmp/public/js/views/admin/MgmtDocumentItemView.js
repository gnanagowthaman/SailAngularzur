var admin = admin || {};

admin.MgmtDocumentItemView = Backbone.View.extend({

    tagName: 'option',

    initialize: function(){
      console.log('init');
      _.bindAll(this, 'render');
    },

    render: function(){
      console.log("veiws :: " + this.model.get('name'));
      $(this.el).attr('value',
      this.model.get('id')).html(this.model.get('name'));
      return this;
    }

});
