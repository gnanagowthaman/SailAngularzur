module.exports = {
    autoCreatedAt : false,
    autoUpdatedAt : false,    
    autoPK        : false,
    tableName     : 'subscription_detail',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        subscription_id: {
            type: 'int'
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

        document_id: {
            type: 'int'
        },
        
        country_id: {
            type: 'int'
        },
        
         state_id: {
            type: 'int'
        } ,
         sms: {
            type: 'int'
        } ,
         web: {
            type: 'int'
        } ,
         email: {
            type: 'int'
        }   
    },

}    