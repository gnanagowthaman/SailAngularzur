
module.exports = {

    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'alert_map',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        message: {
             type: 'string'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    }


}
