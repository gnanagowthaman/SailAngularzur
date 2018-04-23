
module.exports = {
    
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
    tableName: 'geography_regulation_link',    

    attributes: {
        

        geography_id: {
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