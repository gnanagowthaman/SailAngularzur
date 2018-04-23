module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'user_group',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: 'string'
        },

        created_by: {
            type: 'int'
        },

        modified_by: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    },

}    