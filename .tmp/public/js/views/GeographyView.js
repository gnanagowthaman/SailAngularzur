var app = app || {};

app.GeographyView = Backbone.View.extend({
      tagName   : 'li',
      className : 'panel',
    	initialize: function(options) {
          this.collection1 = options.collection1 
      },

    	render: function() {
          this.collection1 =new Backbone.Collection (this.collection1.where({geo :this.model.get('name') }));
          var data = {};
          data.id = this.model.get('id');
          data.name = this.model.get('name');
          data.no = this.collection1.length;
          console.log(data);
          this.template =  _.template($('#geography').html()),
          this.$el.html(this.template(data));
        	return this;
    	},

      renderRegulation : function() {    	
           console.log( "vid" + this.model.get("id"));
           var reg = new app.RegulationListsView({ vid : this.model.get('name'), collection: this.collection1}); 
           reg.render();
      }	

});
