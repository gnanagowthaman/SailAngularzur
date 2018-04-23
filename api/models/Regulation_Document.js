
module.exports = {

    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'regulation_documenttype_link',

    attributes: {

        regulation_id: {
            type: 'int'
        },

        document_id: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    }


}
