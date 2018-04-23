
module.exports = {
    
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'geography_domain_link',    

    attributes: {

        geography_id: {
            type: 'int'
        },

        domain_id: {
            type: 'int'
        },

        country_id: {
            type: 'int'
        },

        state_id: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    }
      

}    
