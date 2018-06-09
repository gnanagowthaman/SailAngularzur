var admin = admin || {};

admin.SubDocRowView = Backbone.View.extend({
    tagName: 'option',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get('id')).html(this.model.get('name'));
      return this;
    }

});	