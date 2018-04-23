var app = app || {};

app.DocumentListView = Backbone.View.extend({
	el : $("#user-list-table"),

	initialize: function() {
		this.render();
    },

	render: function() {
    	console.log('render');
    	console.log(this.collection.length);
        $("#user-list-table").children().remove();
		this.collection.each(function(item) {
			this.renderDocument(item);
		}, this );
          
    	return this;
	},	

	renderDocument: function( item ) {
		var docView = new app.DocumentView({
			model: item
		});
        var dv = docView.render().el;
    	this.$el.append( dv );
	}

});
