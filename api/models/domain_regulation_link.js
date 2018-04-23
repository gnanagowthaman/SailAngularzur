
module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'domain_regulation_link',

    attributes: {
        /*id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },*/

            
        domain_id: {
            type: 'int'
        },
       
        regulation_id: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    }


}
