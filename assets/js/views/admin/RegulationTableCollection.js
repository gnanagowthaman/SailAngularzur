var admin = admin || {};
admin.RegulationTableCollection = Backbone.Collection.extend({
  model: admin.RegulationRowModel,
  url: '/regulations'
});
