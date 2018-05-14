var admin = admin || {};
admin.SPDocumentRowModel = Backbone.Model.extend({
	defaults: {
        "spid" : null,  
        "date" : null,  
        "description" : null,  
        "document_type" : null,  
        "document_link" : null,  
        "type" : null,  
        "document_id" : null,  
        "regulation_document_id" : null,  
        "file_id" : null,  
        "file_name" : null,  
        "is_published" : null,  
        "docname" : null, 
	},
	idAttribute: 'spid'
});
