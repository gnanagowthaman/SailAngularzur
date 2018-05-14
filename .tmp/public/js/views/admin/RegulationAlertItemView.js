var admin = admin || {};

admin.RegulationAlertItemView = Backbone.View.extend({
    tagName: 'option',

    initialize: function(){
    	this.id = "id";
    	this.name = "name";
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
       this.model.get(this.id )).html(this.model.get(this.name));
      return this;
    },
    //Louis Added for alert and for others also

    setValueIds : function( idKey, valueKey)
    {
      this.id = idKey;
      this.name=valueKey;
    },

});
