module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'regulation',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: 'string'
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

        regulator:{
            type: 'string'
        },

        regulation_status: {
            type: 'int'
        },        

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    },

}    