module.exports = {
    
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'alert_file',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        alert_id: {
        	type: 'int'
        },
       
        file_name: {
            type: 'string'
        },

        file_path: {
            type: 'string'
        },
       

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        },        
    }
      

}    