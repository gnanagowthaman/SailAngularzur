var admin = admin || {};
admin.SpecialDocCollection = Backbone.Collection.extend({
	model: admin.SpecialDocModel,
	url: '/getSpecialDoc'
});	