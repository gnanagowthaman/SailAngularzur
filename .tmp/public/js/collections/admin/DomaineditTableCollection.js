var admin = admin || {};
admin.DomaineditTableCollection = Backbone.Collection.extend({
  model: admin.domaineditRowModel,
  url: '/editdomain'
});
