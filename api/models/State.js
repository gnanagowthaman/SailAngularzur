module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'state',    

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

        state_code: {
          type: 'string'
      },

       geography_id: {

            type: 'int'
        },


        country_id: {

            type: 'int'
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

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    }
      

}                                                                                                                                                                   