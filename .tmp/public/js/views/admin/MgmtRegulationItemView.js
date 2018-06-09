var admin = admin || {};

admin.MgmtRegulationItemView = Backbone.View.extend({
    tagName: 'option',
    callFromUser : false,

    initialize: function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      if( this.callFromUser )	
      {
     		 $(this.el).attr('value',
      		this.model.get('rlid')).html(this.model.get('name'));
     	}
     	else
     	{
     		$(this.el).attr('value',
      		this.model.get('id')).html(this.model.get('name'));
     	}
      return this;

    },

    setCallFrom: function(flag)
    {
    	this.callFromUser = flag;
    }

});
