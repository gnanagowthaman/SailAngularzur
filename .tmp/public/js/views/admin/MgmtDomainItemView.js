var admin = admin || {};

admin.MgmtDomainItemView = Backbone.View.extend({
    tagName: 'option',


    initialize: function(){
    	this.idTitle ="id";
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get(this.idTitle)).html(this.model.get('name'));
      return this;
    }

});
