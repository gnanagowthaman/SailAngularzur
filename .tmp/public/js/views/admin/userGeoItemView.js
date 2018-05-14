var admin = admin || {};

admin.userGeoItemView = Backbone.View.extend({    
    tagName: 'label',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get('id')).html(this.model.get('name'));
      return this;
    }

});	