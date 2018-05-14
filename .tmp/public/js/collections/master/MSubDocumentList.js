// =========Collection classes ===================
var app = app || {};
app.MSubDocumentList = Backbone.Collection.extend({
	model: app.MSubDocumentModel,
	url: '/msubdocument',
       getUniqueByProperty: function(propertyName) {
    return _.unique(this.toJSON(), function(item) {
      return item[propertyName];
    });
  }

});	