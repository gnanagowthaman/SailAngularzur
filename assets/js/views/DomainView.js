var app = app || {};

app.DomainView = Backbone.View.extend({
      tagName : "th",
      className :"text-center",
    	initialize: function() {
         //     this.render();
      },
      events: {
          'click .didclass': 'domSelected'
      },

      domSelected : function(e) {
        var did = e.target.id;
        app.ClientAppRouter.domainid = did;
        $(".didclass").css("color", "black");
        e.target.style.color="purple";;
        console.log( "domain  clicked " + did);
      },

    	render: function() {
        console.log("inside domain view");
      //	this.el.prop("style","width: 30%");
        this.template =  _.template($('#dlist').html()),
        this.$el.append(this.template(this.model.toJSON())); 
      	return this;
    	}	
});
