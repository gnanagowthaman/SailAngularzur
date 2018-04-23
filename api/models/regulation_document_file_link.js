
module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'regulation_document_file_link',

    attributes: {

        regulation_document_id: {
            type: 'int'
        },

        file_id: {
            type: 'int'
        },
        level: {
            type: 'int'
        },
        is_uploaded: {
            type: 'int'
        },
        is_published: {
            type: 'int'
        },
        uploaded_by: {
            type: 'int'
        },
        published_by: {
            type: 'int'
        },
        uploaded_date: {
            type: 'int'
        },
        published_date: {
            type: 'int'
        },
        tobepublished: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },
    }


}
