var admin = admin || {};
admin.DomainCollection = Backbone.Collection.extend({
	// model: admin.DomainModel
	model: admin.DomainRowModel,
	url: '/activeDomain'
});	
