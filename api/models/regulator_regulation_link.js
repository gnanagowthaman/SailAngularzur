
module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'regulator_regulation_link',

    attributes: {
        
        regulation_id: {
            type: 'int'
        },

        regulator_id: {
            type: 'int'
        },

       

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    }


}
