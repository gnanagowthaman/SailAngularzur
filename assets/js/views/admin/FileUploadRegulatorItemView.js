var admin = admin || {};

admin.FileUploadRegulatorItemView = Backbone.View.extend({
    tagName: 'option',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get('rid')).html(this.model.get('rname'));
      return this;
    }

});	