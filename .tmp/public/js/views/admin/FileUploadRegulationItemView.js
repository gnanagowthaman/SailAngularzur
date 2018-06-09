var admin = admin || {};

admin.FileUploadRegulationItemView = Backbone.View.extend({    
    tagName: 'option',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get('rlid')).html(this.model.get('rname'));
      return this;
    }

});	