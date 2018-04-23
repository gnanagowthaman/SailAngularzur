var admin = admin || {};

admin.FileUploadDocumentItemView = Backbone.View.extend({
    
    tagName: 'option',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get('docid')).html(this.model.get('docname'));
      return this;
    }

});	