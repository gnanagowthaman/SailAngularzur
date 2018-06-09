var app = app || {};

app.DocumentView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template( $( '#docTpl' ).html() ),
	   
  	initialize: function() {
      	_.bindAll(this, "render");
  	},

    events: {   
        "click .path": 'renderDocument',       
    },

    render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    },

    renderDocument : function(e) {
  		var path = "documents/upload"+e.target.id;
      var patt1=/\.[0-9a-z]+$/i;
      var mat = path.match(patt1);
      console.log("file extension"+ mat);
      if ( mat == ".pdf") {
         var pdf = new app.PdfView({ path : path });                
      } else {
          path=""+e.target.id;
          var xls = new app.XlsView({ path : path });        
        }
    }
    
});	
