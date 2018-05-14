var admin = admin || {};

admin.SpecialDocTypeItemView = Backbone.View.extend({
    tagName: 'option',

    initialize: function(){
    	this.id = "id";
    	this.document_type = "document_type";
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get(this.id )).html(this.model.get(this.document_type));
      return this;
    },


});	