var app = app || {};

app.RegulationListView = Backbone.View.extend({
	initialize: function(options) {
	    console.log('Initialize RegulationListView');
	    // _.extend(this, _.pick(options, 'regulationList'));
	    console.log('regulationList');
	    console.log(options.regulationList);
		this.collection = new app.RegulationCollection(options.regulationList);
		// _.bindAll(this, "renderRegulation");
		// _.bindAll(this, "render");
		this.render();
	},

	render: function() {
    	console.log('render');
		this.collection.each(function(item) {
      		console.log(item.get('regulation_id'));
      		console.log(item.get('regulation_name'));
			this.renderRegulation(item);
		}, this );
    	return this;
	},	

	renderRegulation: function( item ) {
		var RegulationItemView = new app.RegulationItemView({
			model: item
		});
    	this.$el.append( RegulationItemView.render().el );
	},

});
