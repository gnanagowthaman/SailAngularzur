var admin = admin || {};

admin.FileUploadSubDocumentItem = Backbone.View.extend({
    tagName: 'option',

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
    	$("#selectSubDoc option:contains('-')").remove();  
      $(this.el).attr('value',
      this.model.get('sdocid')).html(this.model.get('subdocname'));
      return this;
    }

});	