
module.exports = {

    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'alerts_user',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

       user_id: {
            type: 'int'
        },

        message: {
             type: 'string'
        },

      
        geography_id: {
            type: 'int'
        },

        country_id: {
            type: 'int'
        },
        
        state_id: {
            type: 'int'
        },

        domain_id: {
            type: 'int'
        },

        regulator_id: {
            type: 'int'
        },

        regulation_id: {
            type: 'int'
        },

        status : {
            type: 'boolean'
        },

        is_archive: {
            type: 'boolean'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    }


}
