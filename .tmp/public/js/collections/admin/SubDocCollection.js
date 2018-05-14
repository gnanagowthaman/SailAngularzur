var admin = admin || {};
admin.SubDocCollection = Backbone.Collection.extend({
    model: admin.SubDocModel,
	url: '/getAllSubDoc'
});	