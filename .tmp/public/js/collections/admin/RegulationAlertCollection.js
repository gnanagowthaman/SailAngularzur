var admin = admin || {};
admin.RegulationAlertCollection = Backbone.Collection.extend({
  model: admin.regulationAlertRowModel,
  url: '/regulationAlert'
});