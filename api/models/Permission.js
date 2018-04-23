module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'user_permission',    

    attributes: {
        user_id: {
            type: 'integer'
        },

        permission_id: {
            type: 'integer'
        },

        

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    }
      

}    