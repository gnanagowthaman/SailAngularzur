
module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'regulation_document_link',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        regulation_id: {
            type: 'int'
        },

        document_id: {
            type: 'int'
        },
        domain_id: {
            type: 'int'
        },
        geography_id: {
            type: 'int'
        },
         regulator_id: {
            type: 'int'
        },
         sub_document_id: {
            type: 'int'
        },

         country_id: {
            type: 'int'
        },
        
         state_id: {
            type: 'int'
        },
        regulationStatus: {
            type: 'int'
        },

        
        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    }


}
