var admin = admin || {};
admin.SubDocumentCollection = Backbone.Collection.extend({
    model: admin.SubDocumentRowModel,
	url: '/subDocument'
});	