module.exports = {
    
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'file',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: 'string'
        },

        path: {
            type: 'string'
        },

        type: {
            type: 'string'
        }, 

        level: {
            type: 'int'
        },
        
    },

}    