var admin = admin || {};

admin.DocumentItemView = Backbone.View.extend({
    
    tagName: 'option',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get('id')).html(this.model.get('docname'));
      return this;
    }

});	