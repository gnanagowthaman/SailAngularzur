module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'table_alert',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },


        message: {
            type: 'string'
        },

        status: {
            type: 'boolean',
            defaultsTo: true
        }, 
        domain: {
            type: 'string'
        },

        geography: {
            type: 'string'
        },

        regulation: {
            type: 'string'
        },

        doctype: {
            type: 'string'
        },        

        created_by: {
            type: 'int'
        },
        
        regdocid: {
            type: 'int'
        },
        
        geography_id: {
            type: 'int'
        },
        modified_by: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    }
      

}    