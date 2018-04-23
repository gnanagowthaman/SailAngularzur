var admin = admin || {};

admin.RegulationItemView = Backbone.View.extend({    
    tagName: 'option',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get('regulation_id')).html(this.model.get('rname'));
      return this;
    }

});	