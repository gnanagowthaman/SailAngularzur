var bcrypt = require('bcrypt')
module.exports = {
    
    autoCreatedAt: 'created_date',
    autoUpdatedAt: 'modified_date',
    autoPK: false,
    tableName: 'user',    

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        user_name: {
            type: 'string'
        },

        password: {
            type: 'string',
            minLength: 6,
            defaultsTo: 'zurik123'
        },

        email_id: {
            type: 'string'          
        },

        session_id:{
            type: 'string'
        },
        
        company_name: {
            type: 'string'
        },

        is_active: {
            type: 'boolean',
            defaultsTo: true
        }, 

        user_group_id: {
            type: 'int'
        },
        
        created_by: {
            type: 'int'
        },

        modified_by: {
            type: 'int'
        },

        profile_image_link:{
            type:'string'
        },

        mobile_no: {
            type: 'string'
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },        
    },

     beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    },
     beforeUpdate: function(user, cb) {
        if (user.password)
        {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(user.password, salt, function(err, hash) {
                        if (err) {
                            console.log(err);
                            cb(err);
                        } else {
                            user.password = hash;
                           cb();
                        }
                    });
                });
        }
        else
        {
            cb();
        }

    },
      

}    