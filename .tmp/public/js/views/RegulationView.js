var app = app || {};

app.RegulationView = Backbone.View.extend({
  tagName : 'li',

	initialize: function(options) {
	    this.gid = options.gid;
  },

  events: {        
      'click .ridclass': 'regSelected'
  },

  regSelected : function(e) {
      app.ClientAppRouter.domain.rerender();
      console.log( "regulation clicked");
  	  $("#canvas").children().remove();
      var rid = e.target.id;
      $(".ridclass").css("color", "black");
      $(".didclass").css("color", "black");
      e.target.style.color="purple";;
      console.log( "regulation clicked " + rid);
  	  app.ClientAppRouter.currentrid = rid;
  	  console.log ( " Selected ..... geography id ... "+ $(e.target).parent().attr("gid"));
  	  app.ClientAppRouter.currentgid = $(e.target).parent().attr("gid");
      console.log( "regulation clicked " + app.ClientAppRouter.currentrid);
      if (app.ClientAppRouter.doctype) {
      		console.log("exsisting doc type");
      		app.ClientAppRouter.doctype.render({ reset : 1});
  	  } else {
      		console.log("new doc type");
      	  var box = new app.DocTypeView();
      	  app.ClientAppRouter.doctype = box;
      	  box.render({reset : 1});
        }
  },

	render: function() {
      console.log("inside regulation view");
      this.template =  _.template($('#regulation').html()),
      console.log(this.model.toJSON());
      this.$el.attr("gid", this.gid); 
      this.$el.html(this.template(this.model.toJSON()));
      console.log (this.$el);
  	  return this;
	},

  showDomain : function(e) {
     var dcollection = app.ClientAppRouter.currentView.collection1;
  }	
	

});
