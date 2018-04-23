module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'special_document_type',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        created_by: {
            type: 'int'
        },

        modified_by: {
            type: 'int'
        },

        document_type:{
            type: 'string'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    },

}    