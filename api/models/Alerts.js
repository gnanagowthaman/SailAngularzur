
module.exports = {

    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'alerts',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        message: {
             type: 'string'
        },

        name: {
             type: 'string'
        },

        status: {
             type: 'string'
        },

        geography_id: {
            type: 'int'
        },

        domain_id: {
            type: 'int'
        },

        regulation_id: {
            type: 'int'
        },

        regulator_id: {
            type: 'int'
        },

         country_id: {
            type: 'int'
        },
        
        state_id: {
            type: 'int'
        },

        doctype_id: {
            type: 'int'
        },
       
        subdoctype_id: {
            type: 'int'
        },

        email_id: {
            type: 'int'
        },

        sms_id: {
            type: 'int'
        },

        web_id: {
            type: 'int'
        },

        email : {
            type: 'boolean'
        },

        sms : {
            type: 'boolean'
        },

        web : {
            type: 'boolean'
        },

 	alertmap_id: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    }


}
