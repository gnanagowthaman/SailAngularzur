var admin = admin || {};

admin.FileUploadStateItemView = Backbone.View.extend({
    tagName: 'option',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get('state_id')).html(this.model.get('sname'));
      return this;
    }

});	