module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'news',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        geo_id: {
            type: 'int'
        },

        news_content: {
            type: 'string'
        },

        news_date: {
            type: 'date'
        },


        created_by: {
            type: 'int'
        },

        modified_by: {
            type: 'int'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    }
      

}    
