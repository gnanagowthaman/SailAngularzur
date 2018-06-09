var admin = admin || {};

admin.CountryItemView = Backbone.View.extend({
    tagName: 'option',

    initialize: function(){
    	this.idKey = "id";
    	this.valueKey="name";
      _.bindAll(this, 'render');
    },

    render: function(){
      $(this.el).attr('value',
      this.model.get(this.idKey)).html(this.model.get(this.valueKey));
      return this;
    },
    //Louis Added for alert and for others also

    setValueIds : function( idKey, valueKey)
    {
		  this.idKey = idKey;
    	this.valueKey=valueKey;
    },

});	