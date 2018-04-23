module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'special_document',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        date: {
            type: 'date'
        },

        description: {
            type: 'string'
        },

        status: {
            type: 'boolean',
            defaultsTo: true
        }, 

        created_by: {
            type: 'int'
        },

        modified_by: {
            type: 'int'
        },

        document_type:{
            type: 'int'
        },

        document_link: {
            type: 'string'
        },

        type: {
            type: 'string'
        },

        document_id: {
            type: 'int'
        },

        regulation_document_id: {
            type : 'int'
        },        

        file_id: {
            type: 'int'
        },

        file_name: {
            type: 'string'
        },

        is_uploaded: {
            type: 'boolean',
            defaultsTo: true
        },         

        is_published: {
            type: 'boolean',
            defaultsTo: true
        },

        uploaded_by: {
            type: 'int'
        },

        created_by: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    },

}    