var admin = admin || {};
admin.CreateUserTableCollection = Backbone.Collection.extend({
  model: admin.regulationeditRowModel,
  url: '/editregulation'
});
