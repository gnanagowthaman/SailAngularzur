var admin = admin || {};
admin.RegulationeditTableCollection = Backbone.Collection.extend({
  model: admin.regulationeditRowModel,
  url: '/editregulation'
});
