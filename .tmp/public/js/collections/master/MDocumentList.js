// =========Collection classes ===================
var app = app || {};
app.MDocumentList = Backbone.Collection.extend({
	model: app.MDocumentModel,
	url: '/mdocument',
       getUniqueByProperty: function(propertyName) {
    return _.unique(this.toJSON(), function(item) {
      return item[propertyName];
    });
  }

});	
