var admin = admin || {};

admin.CreateUserTableView = Backbone.View.extend({
	initialize: function(options) {
    	console.log('Initialize CreateUserTableView');
		this.collection = new admin.CreateUserTableCollection();
		//console.log("data "+JSON.stringify(this.collection));
		// this.collection.fetch({reset: true});		
		this.listenTo( this.collection, 'add', this.rendeItem );
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'sort', this.render );
		_.bindAll(this, "rendeItem");
		_.bindAll(this, "render");

		console.log("data "+JSON.stringify(this.collection));
	},

	render: function() {
    	console.log('this.collection');
    	console.log("this.collection.length:::::"+this.collection.length);
    	if (this.collection.length == 0) {
    	} else {
    		$('#findStatus').empty(); 
			this.collection.each(function(item) {
	      		console.log(item.attributes);
				this.renderItem(item);
			}, this );
    	}
    	return this;
    	
	},	

	rendeItem: function( item ) {
		console.log('render user');
		var CreateUserRowView = new admin.CreateUserRowView({
			model: item
		});
    	this.$el.append( CreateUserRowView.render().el );
	}

});

