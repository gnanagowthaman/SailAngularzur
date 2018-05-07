var redis = require('redis');
module.exports = {

    Zurikidgen : function (req,res){
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },

    find: function(req, res) {
      var sql = " SELECT DISTINCT " + 
                " u.id, u.user_name, r.type as type, p.permission as access_reg,p.permission as access1_reg, u.mobile_no as mobile_no, u.email_id as email_id, s.access_geo as access_geo, date_format(s.expiry_date,'%Y-%m-%d') as renewal_date " + 
                " FROM user u, user u1, user_role ur, role r, user_permission up, permission p, subscription s " + 
                " WHERE u.id=ur.user_id AND ur.role_id=r.id " + 
                " AND u.id=up.user_id AND up.permission_id=p.id " + 
                " AND p.permission_type=? AND u.id=s.user_id " + 
                " AND u.is_active=true and r.id != 1 and  u.created_by = u1.id and u.created_by  >= "+ req.session.user.id;

      var organization = req.session.user.company_name                 
      if (new String(organization).valueOf() != new String('zurik').valueOf()) {
        sql = sql + " AND user_group_id=" + req.session.user.user_group_id;
      }          
      if (req.param('limit') && req.param('limit') != undefined) {
        var limit = req.param('limit');
        sql = sql + " ORDER BY u.id LIMIT " + limit;
        if (req.param('offset') && req.param('offset') != undefined) {
          var offset = req.param('offset');
          sql = sql + " OFFSET " + offset;
        } else {
          sql = sql + " OFFSET 0 ";
        }
      } else {
        if (req.param('user_name') && req.param('user_name') != undefined) {
            sql = sql + " AND u.user_name LIKE '%" + req.param('user_name') + "%'";
        }
        sql = sql + " ORDER BY u.id ";
      }       
      var params = ['access']; 
      console.log('SQL', sql);          
      User.query(sql, params, function(err, users) {
        if (err) {
          Logger.log('error', 'UserController.find', 'The following error occurred(While fetching User Information):', null, err);
          return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching User Information.Please contact Administrator' });
        } else {
            Logger.log('debug', 'UserController.find', 'Sent Users.', users, null);
            return res.json(200, users);
        }
      });
    },
    //Use in Edit User/Admin Form to populate user data
    findOne: function(req, res) {
      var userId = req.params.id;
      var userData = {};
      var geoList = {};
      var subsdetail={};
      var userDataone={};
      var subsd = [];
      async.series([
        //Find user & geo from user table
        function(callback) {
          Logger.log('debug', 'UserController.findOne', 'STEP-1: Finding user & geo from user & subscription tables.', null, null);
          var sql = " SELECT u.id, u.user_name, u.email_id, u.mobile_no,u.company_name" +
                    "   FROM user u, subscription s " +
                    "  WHERE u.id=s.user_id AND u.id=? ";
          var params = [userId];
          User.query(sql, params, function(err, user) {
            if (err) {
              Logger.log('error', 'UserController.findOne', 'The following error occurred:', null, err);
              callback(err);
            } else {
                console.log(user);
                userData = user[0];
                callback();
            }
          });
        }, //get Geos from table
        function(callback) {
          var sql = "SELECT id, name, description FROM geography where status=true";
          var params = [];
          User.query(sql, params, function(err, result) {  
              if (err) {
                console.log(err);
                callback(err);
              } else {                              
                // sails.config.globalmodels.geographyGlobalModels = result;
                // console.log('geographyGlobalModels From DB!!'); 
                // console.log(sails.config.globalmodels.geographyGlobalModels); 
                geoList = result; 
                console.log('geographyList!!'); console.log(result);
                callback();
              }            
          });             
        },
        //Set Allowed Permissions & Geos of Requested User (In User Edit mode)
        function(callback) {
          Logger.log('debug', 'UserController.findOne', 'STEP-2: Get Allowed Permissions & Geos of Requested User (In User Edit mode)', null, null);
          if (new String(userData.company_name).valueOf() == new String('zurik').valueOf()) {
            userData['isZurik'] = true;  
          } else {
            userData['isZurik'] = false;
          }
          var sql = "SELECT p.permission, p.permission_type FROM permission p, user_permission up " + 
                    " WHERE p.id=up.permission_id AND up.user_id=? ";
          var params = [userId];
          User.query(sql, params, function(err, result) {
            if (err) {
              Logger.log('error', 'UserController.findOne', 'The following error occurred:', null, err);
              callback(err);
            } else {
                if (result.length > 0) {
                  //set permissions for logged in user
                  result.forEach(function(item) {                
                    if (new String(item.permission_type).valueOf() == new String('credential').valueOf()) {
                       userData['createAdmin'] = (new String(item.permission).valueOf() == new String('createAdmin').valueOf()) ? true : false;  
                    } 
                    else if (new String(item.permission_type).valueOf() == new String('subscription').valueOf()) 
                    {
                        if (new String(item.permission).valueOf() == new String('paid').valueOf()) 
                         userData['paid'] = (new String(item.permission).valueOf() == new String('paid').valueOf()) ? true : false;
                        else if (new String(item.permission).valueOf() == new String('free').valueOf()) 
                          userData['paid'] = false;
                    } 
                    else if (new String(item.permission_type).valueOf() == new String('access').valueOf()) {
                      userData['full'] = (new String(item.permission).valueOf() == new String('full').valueOf()) ? true : false;
                    }
                     else if (new String(item.permission_type).valueOf() == new String('operation').valueOf()) {
                      if (new String(item.permission).valueOf() == new String('delete').valueOf()) {
                        userData['delete1'] = true;
                      } else {
                        userData[item.permission] = true;  
                      }
                      
                    }              
                  });
                }
                // Add Not Allowed operations to userData. 
                // This is required to avoid undefine error while rendering _template.
                sails.config.globalmodels.permissionGlobalModels.forEach(function(item) {
                  if (new String(item.permission_type).valueOf() == new String('operation').valueOf()) {
                    if (new String(item.permission).valueOf() == new String('delete').valueOf()) {
                      if (!userData.hasOwnProperty('delete1')) {
                         userData['delete1'] = false;                    
                      }                        
                    } else {
                      if (!userData.hasOwnProperty(item.permission)) {
                         userData[item.permission] = false;                    
                      }                                                
                    } 
                  }
                });

                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  User permission "+JSON.stringify(userData));
              //set allowed geographies
              if (userData.full) {
                 /*geoList.forEach(function(item) {
                  var geoName = item.name.toLowerCase();
                    userData[geoName] = true;
                });*/ 
                callback();                                
              } else {
                    if (req.session.userConfig.hasOwnProperty('isZurik') && req.session.userConfig.isZurik) {
                    userData['operatingUserType'] = 'zurik';
                  } else {
                    userData['operatingUserType'] = 'others';
                  }  

                

                var sql = " SELECT distinct u.id as userid,sd.geography_id,sd.country_id, sd.state_id, "+
                          " sd.regulation_id,sd.sms,sd.web,sd.email, g.name as geography_name,"+
                          " c.name as country_name, s.name as state_name, r.name as regulation_name "+
                          " FROM user u, country c,state s,geography g, subscription_detail sd, regulation r, subscription sb "+
                          " WHERE g.id=sd.geography_id "+
                          " AND r.id=sd.regulation_id "+
                          " AND sd.country_id = c.id "+
                          " and sd.state_id = s.id "+
                          " and sb.user_id = ? "+
                          " and u.id = sb.user_id "+
                          " and sb.id = sd.subscription_id and c.status=1 and g.status=1 and s.status=1 and r.status=1 ";

                 
                  var params = [userId];
                  console.log("params 153",params);
                  User.query(sql, params, function(err, result) {
                    if (err) {
                      Logger.log('error', 'UserController.findOne', 'The following error occurred:', null, err);
                      callback(err);
                    } else {
                      console.log("userData",userData);
                      console.log("result subscription_detail 158",result);
                      result.forEach(function(item){
                      var subsdetail ={
                          id: item.geography_id+"_"+item.country_id+"_"+item.state_id+"_"+item.regulation_id,
                          geography_id : item.geography_id,
                          country_id :item.country_id,
                          state_id : item.state_id,
                          regulation_id : item.regulation_id,
                          geography_name:item.geography_name,
                          country_name:item.country_name,
                          state_name:item.state_name,
                          regulation_name:item.regulation_name,
                          user_id :userId,
                          sms:(item.sms)? "Yes":"No" ,
                          web:(item.web)? "Yes":"No" ,
                          email:(item.email)? "Yes":"No" 


                          //mycode//
                         // sms:item.sms,
                         // web:item.web,
                         // email:item.email
                      };
                      console.log("subsdetail",subsdetail);
                      subsd.push(subsdetail);
                      });
                      userData['subsd'] = subsd;
                      //userDataone = userData + subsdetail;
    
                      callback();

                    }
                  });
                  


                /*var accessGeos = userData.access_geo;
                var seperator = ' - ';
                var geoArray = accessGeos.split(seperator);
                geoArray.forEach(function(item) {
                  console.log('item GEO: ');console.log(item);
                   var geoName = item.toLowerCase();
                  userData[geoName] = true;            
                });
                // Add Not Allowed Geos to userData. 
                // This is required to avoid undefine error while rendering _template.
                geoList.forEach(function(item) {
                  var geoName = item.name.toLowerCase();
                  if (!userData.hasOwnProperty(geoName)) {
                    userData[geoName] = false;
                  }
                });*/                                            
              }
              /*if (req.session.userConfig.hasOwnProperty('isZurik') && req.session.userConfig.isZurik) {
                userData['operatingUserType'] = 'zurik';
              } else {
                userData['operatingUserType'] = 'others';
              }   */           
             
            }        
          });          
        }
      ], function(err) {   
            if (err) {                
              return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating User.Please contact Administrator.' });
            } else {
              Logger.log('debug', 'UserController.findOne', 'Sending userData::', userData, null);
              console.log("userData res",userData);
              console.log( JSON.stringify( userData['subsd']));
              return res.json(200, userData);
            }
      });

    },

    create: function(req, res) {
      var userFormData = (req.body) ? req.body : undefined;
      console.log("getting user:::::::::" + userFormData);
      Logger.log('debug', 'UserController.create', 'userFormData From Request::', userFormData, null);
      var user = {};
      var subscription = {};
      var regulation_document = {};
      var zuriksessionid = this.Zurikidgen();
      var user_group_id = -1;

      async.series([
        function(callback) { 
          User.find({email_id : userFormData.email_id, is_active: true}).exec(function (err ,user) {
            if (err) {
              Logger.log('error', 'UserController.create', 'The following error occurred(While checking the Email ID):', null, err);
              callback(err)
            } else if (user.length > 0 ) {
              Logger.log('debug', 'UserController.create', 'STEP-0a:Email Id Already Exist.', null, null);
              callback({errMsg : 'Email Id Already Exist' , errCode : 'errEmail'});
            } else {
              callback();
            }
          }); 
        },
        //Create New User Group, if Logged In user is zurik & created user's organization is others
        function(callback) {
          var organization = req.session.user.company_name                
          //LoggedIn user is not Zurik
          if (new String(organization).valueOf() != new String('zurik').valueOf()) {
            user_group_id = req.session.user.user_group_id;
            callback();
          } else {
            //LoggedIn user is Zurik & Created User is also Zurik
            if (new String(userFormData.company_name).valueOf() == new String('zurik').valueOf()) {
              user_group_id = req.session.user.user_group_id;
              callback();
            } else { //User belongs to new organization, so create new group
              var UserGroupData = {name: 'others', created_by: req.session.user.id};
              Logger.log('debug', 'UserController.create', 'STEP-0b:Insert into user_group table.', null, null);
              UserGroup.create(UserGroupData).exec(function(err, result) {  
                if (err) {
                  Logger.log('error', 'UserController.create', 'The following error occurred(While Creating UserGroup):', null, err);
                  callback(err);
                } else {
                  Logger.log('debug', 'UserController.create', 'Created UserGroup::', result, null);
                  user_group_id = result.id;
                  console.log("user_group_id",user_group_id);
                  callback();
                }            
              });
            }
          }           
        },
        //Insert into user table
        function(callback) {
          Logger.log('debug', 'UserController.create', 'STEP-1:Inserting into user table.', null, null);

          var userData = {
            user_name    : userFormData.user_name,
            email_id     : userFormData.email_id,
            mobile_no    : userFormData.mobile_no,
            company_name : userFormData.company_name,
            created_by   : req.session.user.id,
            session_id   :zuriksessionid,
            user_group_id: user_group_id,
            profile_image_link :'images/profile/photo/01.png'
          };
          User.create(userData).exec(function(err, result) {  
            if (err) {
              Logger.log('error', 'UserController.create', 'The following error occurred(While Creating User):', null, err);
              callback(err);
            } else {
              Logger.log('debug', 'UserController.create', 'STEP-1:Created User::', result, null);
              user = result;
              callback();
            }            
          });

        },
        //Insert into user_role table
        function(callback) {
          Logger.log('debug', 'UserController.create', 'STEP-2:Inserting into user_role table.', null, null);
          var sql = "INSERT INTO user_role (user_id, role_id) VALUES (?,?)";
          var params = [user.id, userFormData.role_id];
          User.query(sql, params, function(err, result) {  
            if (err) {
              Logger.log('error', 'UserController.create', 'The following error occurred(While Creating User_Role):', null, err);
              callback(err);
            } else {
              callback();
            }            
          });
        },
        //Insert into user_permission table
        function(callback) {
          Logger.log('debug', 'UserController.create', 'STEP-3:Inserting into user_permission table.', null, null);
          var userPermissionData = [];
          sails.config.globalmodels.permissionGlobalModels.forEach(function(item) {
            if (userFormData.subscription == item.permission) { //check subscription[paid/free] 
              var userSubscriptionData = {
                user_id : user.id,
                permission_id  : item.id
              };
              userPermissionData.push(userSubscriptionData);
            } else if (userFormData.access == item.permission) {  //check access[full/restricted]
              var userAccessData = {
                user_id : user.id,
                permission_id  : item.id
              };
              userPermissionData.push(userAccessData);
            } 
          /*  else if( userFormData.smsaccess == item.permission)
            {
              var smsAccessData = {
                user_id : user.id,
                permission_id  : item.id
              };
              userPermissionData.push(smsAccessData);
            }
             else if( userFormData.webaccess == item.permission)
            {
              var webAccessData = {
                user_id : user.id,
                permission_id  : item.id
              };
              userPermissionData.push(webAccessData);
            }
             else if( userFormData.emailaccess == item.permission)
            {
              var emailAccessData = {
                user_id : user.id,
                permission_id  : item.id
              };
              userPermissionData.push(emailAccessData);
            }*/
            else { //only for admin
            //check for operations [upload/publish/delete/edituser/lockuser/deleteuser] & 
            //credential[createAdmin, createUser] for admin user only
              if (userFormData.role_id == sails.config.globalmodels.SUPERADMIN || userFormData.role_id == sails.config.globalmodels.ADMIN) { //only for AdminUser
                if (userFormData.credential == item.permission) {
                  var userCredentialData = {
                    user_id : user.id,
                    permission_id  : item.id
                  };
                  userPermissionData.push(userCredentialData);
                } else {
                  if (userFormData.hasOwnProperty('operations') && userFormData.operations.length > 0) {
                    userFormData.operations.forEach(function(operation) {
                      if (item.permission == operation) {
                        var userOperationData = {
                          user_id : user.id,
                          permission_id  : item.id
                        };
                        userPermissionData.push(userOperationData);
                      }
                    });
                  }
                }            
              }
            }
          });
          // console.log('userPermissionData'); console.log(userPermissionData);
          async.forEachOf(userPermissionData, function(item, key, callback) {
            var sql = "INSERT INTO user_permission (user_id, permission_id) VALUES (?,?)";
            var params = [user.id, item.permission_id];
            User.query(sql, params, function(err, result) {
              if (err) {
                Logger.log('error', 'UserController.create', 'The following error occurred(While Creating User_Permission):', null, err);
                callback(err);
              } else {
                callback();
              }            
            });

          }, callback);

        },
        //Insert into subscription table
        function(callback) {
          Logger.log('debug', 'UserController.create', 'STEP-4:Inserting into subscription table.', null, null);
          var noOfDays = '';
          sails.config.globalmodels.configGlobalModels.forEach(function(item) {
            if (userFormData.subscription == 'free' && item.name == 'trialPeriod') {
              noOfDays = parseInt(item.value, 10);
            } else if (userFormData.subscription == 'paid' && item.name == 'paidPeriod-1') {
              noOfDays = parseInt(item.value, 10);
            }
          });
          //Format geo string from Array of geos
          var accessGeo = '';
        /*  var noOfGeo = userFormData.geographies.length;
          userFormData.geographies.forEach(function(item, index) {
            if (index == 0) {
              accessGeo = item;
            } else {
              accessGeo = accessGeo + ' - ' + item;
            }
          });*/
          var sql = " INSERT INTO subscription " +
                    "        (initiated_date, expiry_date, status, user_id, created_by, created_date) " +
                    " VALUES (now(), DATE_ADD(now() , INTERVAL ? DAY), true, ?, ?, now())";
          var params = [noOfDays, user.id, req.session.user.id];                   
          User.query(sql, params, function(err, result) {  
            if (err) {
              Logger.log('error', 'UserController.create', 'The following error occurred(While Creating Subscription):', null, err);
              callback(err);
            } else {             
              callback();
            }            
          });
        },
        //Insert into subscription_detail table
        function(callback) {
          Logger.log('debug', 'UserController.create', 'STEP-4:Inserting into subscription_detail table.', null, null);
           if (userFormData.hasOwnProperty('regulations')) {
          //if (userFormData.hasOwnProperty('regulations') && userFormData.regulations.length > 0) {
          // if (userFormData.access == 'restricted' && userFormData.regulations.length > 0) {  
            async.series([
              //Get subscription id from subscription table
              function(callback) {
                var sql = "SELECT id FROM subscription WHERE user_id=?";
                var params = [user.id];
                User.query(sql, params, function(err, result) {  
                  if (err) {
                    Logger.log('error', 'UserController.create', 'The following error occurred(While fetching Subscription):', null, err);
                    callback(err);
                  } else {              
                    subscription = result[0];
                    console.log(JSON.stringify(subscription));
                    callback();
                  }            
                });                
              },
              //Get regulation_document_link
              function(callback) {
                var sql = "SELECT * FROM regulation_document_link";
                var params = [];
                User.query(sql, params, function(err, result) {  
                  if (err) {
                    Logger.log('error', 'UserController.create', 'The following error occurred(While fetching from regulation_document_link table.):', null, err);
                    callback(err);
                  } else {             
                    regulation_document = result;
                    callback();
                  }            
                });   
              }, 
              // Do actual INSERTs into subscription detail table
              function(callback) {
                //create Array of Subscription Detail
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>.userFormData"+JSON.stringify(userFormData));
                var subscriptionDetails = [];
                userFormData.regulations.forEach(function(regulation) {
                  regulation_document.forEach(function(reg_doc_link) {
                    if (regulation.regulation_id == reg_doc_link.regulation_id &&
                        regulation.geography_id == reg_doc_link.geography_id && 
                        regulation.country_id == reg_doc_link.country_id &&
                        regulation.state_id == reg_doc_link.state_id) {
                      subscriptionDetails.push({
                        subscription_id : subscription.id,
                        geography_id    : reg_doc_link.geography_id,
                        domain_id       : reg_doc_link.domain_id,
                        regulation_id   : reg_doc_link.regulation_id,
                        document_id     : reg_doc_link.document_id,
                        country_id      : reg_doc_link.country_id,
                        state_id        : reg_doc_link.state_id,
                        sms             :regulation.sms,
                        web             :regulation.web,
                        email           :regulation.email

                      });
                    }
                  });
                });                   
                SubscriptionDetail.create(subscriptionDetails).exec(function(err, result) { 
                  if (err) {
                    Logger.log('error', 'UserController.create', 'The following error occurred(While Inserting into subscription_detail table.):', null, err);
                    callback(err);
                  } else {
                    Logger.log('debug', 'UserController.create', 'Created Subscription Details.', result, null);              
                    callback();
                  }            
                });   
              },               
            ], callback);  

          } else {
            callback();
          } 
        },                                
      ], function(err) {
            if (err) {
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errEmail') 
                  return res.json(500, { errCode: 'errEmail' , errMsg: 'Email Id Already Exist.' });
                else
                  return res.json(500, { errCode: 500 , errMsg: '' });
            } else {
                Mailer.sendWelcomeMail(user);
                Logger.log('debug', 'UserController.create', 'New User Created.', null, null);
                res.status(200).json(200);
            }
      });

    },

    reset: function(req, res){
      password=req.param("passwd");
      email=req.param("email_id");
      Logger.log('debug', 'UserController.reset', 'RESETTING:: EmailID[' + email + '] -- Password[' + password + ']', null, null);
      User.update({email_id: req.param("email_id")}, {password: req.param("passwd")}).exec(function (err, user) {
        if (err) {
          Logger.log('error', 'UserController.reset', 'The following error occurred(While resetting password.):', null, err);
          return res.json(500, { errCode: 500 , errMsg: 'Error occurred while resetting password.Please contact Administrator.' });
        } else {
          Logger.log('debug', 'UserController.reset', 'User Password Reseted::', user, null);
          return res.redirect("/");
       }
      });
    },

    checkSession: function (req,res) {
      var idcheck= req.query.uuid;
      User.find({session_id: req.query.uuid}).exec(function (err, user) {
        if (err) {
          Logger.log('error', 'UserController.checkSession', 'The following error occurred(While redirecting passreset page.):', null, err);
          return res.json(500, { errCode: 500 , errMsg: 'You are not authenticated.Please contact Administrator.' });
        } else if(user.length != 0 ) {
          Logger.log('debug', 'UserController.checkSession', 'redirecting passreset page ::', user, null);
          data = user[0].email_id;
          return res.view("passreset", {"email_id" : user[0].email_id});
        }
      });
    },

    update: function(req, res) {
      var userFormData = (req.body) ? req.body : undefined;
      Logger.log('debug', 'UserController.update', 'userFormData From Request::', userFormData, null);      
      var subscription = {};
      var regulation_document = {};
      var zuriksessionid = this.Zurikidgen();
      var user_group_id = -1;

      async.series([
        //Update user table
        function(callback) {
          Logger.log('debug', 'UserController.update', 'STEP-1:Updating user table.', null, null);
          sql = "UPDATE user SET user_name=?, email_id=?, mobile_no=?, modified_by=?, modified_date=now() WHERE id=? ";
          var params = [
            userFormData.user_name,
            userFormData.email_id,
            userFormData.mobile_no,
            req.session.user.id,
            userFormData.user_id
          ];
          User.query(sql, params, function(err, result) {  
            if (err) {
              Logger.log('error', 'UserController.update', 'The following error occurred(While Updating User):', null, err);
              callback(err);
            } else {
              Logger.log('debug', 'UserController.update', 'STEP-1:Updated User::', result, null);
              callback();
            }            
          });
   
        },

        // Update user_role table
        // function(callback) {
        // Logger.log('debug', 'UserController.update', 'STEP-1b:Updating user_role table.', null, null);
        //   var sql = "INSERT INTO user_role (user_id, role_id) VALUES (?,?)";
        //   var params = [user.id, userFormData.role_id];
        //   User.query(sql, params, function(err, result) {  
        //     if (err) {
        //       Logger.log('error', 'UserController.update', 'The following error occurred(While Updating user_role table.):', null, err);
        //       callback(err);
        //     } else {
        //       callback();
        //     }            
        //   });
        // },

        // Delete permissions from user_permission table
        function(callback) {        
          Logger.log('debug', 'UserController.update', 'STEP-2:Deleting permissions from user_permission table.', null, null);
          var sql = "DELETE FROM user_permission WHERE user_id=?";
          var params = [userFormData.user_id];
          User.query(sql, params, function(err, result) {  
            if (err) {
              Logger.log('error', 'UserController.update', 'The following error occurred(While Deleting User Permissions from user_permission Table.):', null, err);
              callback(err);
            } else {
              callback();
            }            
          });
        },        
        //Insert into user_permission table
        function(callback) {
          Logger.log('debug', 'UserController.update', 'STEP-3:Inserting into user_permission table.', null, null);
          var userPermissionData = [];
          sails.config.globalmodels.permissionGlobalModels.forEach(function(item) {
            if (userFormData.subscription == item.permission) { //check subscription[paid/free] 
              var userSubscriptionData = {
                user_id : userFormData.user_id,
                permission_id  : item.id
              };
              userPermissionData.push(userSubscriptionData);
            } else if (userFormData.access == item.permission) {  //check access[full/restricted]
              var userAccessData = {
                user_id : userFormData.user_id,
                permission_id  : item.id
              };
              userPermissionData.push(userAccessData);
            } else { //only for admin
            //check for operations [upload/publish/delete/edituser/lockuser/deleteuser] & 
            //credential[createAdmin, createUser] for admin user only
              if (userFormData.role_id == sails.config.globalmodels.SUPERADMIN || userFormData.role_id == sails.config.globalmodels.ADMIN) { //only for AdminUser
                if (userFormData.credential == item.permission) {
                  var userCredentialData = {
                    user_id : userFormData.user_id,
                    permission_id  : item.id
                  };
                  userPermissionData.push(userCredentialData);
                } else {
                  if (userFormData.hasOwnProperty('operations') && userFormData.operations.length > 0) {
                    userFormData.operations.forEach(function(operation) {
                      if (item.permission == operation) {
                        var userOperationData = {
                          user_id : userFormData.user_id,
                          permission_id  : item.id
                        };
                        userPermissionData.push(userOperationData);
                      }
                    });
                  }
                }            
              }
            }
          });
          Logger.log('debug', 'UserController.update', 'STEP-3: Modified userPermissionData::', userPermissionData, null);
          async.forEachOf(userPermissionData, function(item, key, callback) {
            var sql = "INSERT INTO user_permission (user_id, permission_id) VALUES (?,?)";
            var params = [userFormData.user_id, item.permission_id];
            console.log("params",params);
            User.query(sql, params, function(err, result) {
              if(err) {
                Logger.log('error', 'UserController.update', 'The following error occurred(While Inserting into user_permission table.):', null, err);
                callback(err);
              } else {
                callback();
              }            
            });

          }, callback);

        },
        //Update subscription table
        function(callback) {
          Logger.log('debug', 'UserController.update', 'STEP-4: Update subscription table', null, null);
          //Format geo string from Array of geos
          /*var accessGeo = '';
          var noOfGeo = userFormData.geographies.length;
          userFormData.geographies.forEach(function(item, index) {
            if (index == 0) {
              accessGeo = item;
            } else {
              accessGeo = accessGeo + ' - ' + item;
            }
          });    */
          sql = "UPDATE subscription SET  modified_by=?, modified_date=now() WHERE user_id=? ";          
          var params = [req.session.user.id, userFormData.user_id];                    
          User.query(sql, params, function(err, result) {  
            if (err) {
              Logger.log('error', 'UserController.update', 'The following error occurred(While Updating subscription table.):', null, err);
              callback(err);
            } else {  
              Logger.log('debug', 'UserController.update', 'STEP-4: Updated subscription::', result, null);           
              subscription = result;
              callback();
            }            
          });
        },
        // Delete subscription details from subscription_detail table
        function(callback) {
          Logger.log('debug', 'UserController.update', 'STEP-5: Delete subscription details from subscription_detail table.', null, null);
          async.series([
            //Get subscription id from subscription table
            function(callback) {
              var sql = "SELECT id FROM subscription WHERE user_id=?";
              var params = [userFormData.user_id];
              User.query(sql, params, function(err, result) {  
                if (err) {
                  Logger.log('error', 'UserController.update', 'The following error occurred(While Getting subscription id from subscription table.):', null, err);
                  callback(err);
                } else {              
                  subscription = result[0];
                  callback();
                }            
              });                
            },
            //Delete subscription_details for this user
            function(callback) {

              var sql = "DELETE FROM subscription_detail WHERE subscription_id=?";
              var params = [subscription.id];
              console.log("params");console.log(params);
              User.query(sql, params, function(err, result) {  
                if (err) {
                  Logger.log('error', 'UserController.update', 'The following error occurred(While Deleting From subscription_detail table.):', null, err);
                  callback(err);
                } else {
                  callback();
                }            
              });
            }
          ], callback);
        },           
        //Insert into subscription_detail table
        function(callback) {
          Logger.log('debug', 'UserController.update', 'STEP-6: Insert into subscription_detail table.', null, null);
          if (userFormData.hasOwnProperty('regulations') && userFormData.regulations.length > 0) {
          // if (userFormData.access == 'restricted' && userFormData.regulations.length > 0) {  
            async.series([
              //Get regulation_document_link
              function(callback) {
                var sql = "SELECT * FROM regulation_document_link";
                var params = [];
                User.query(sql, params, function(err, result) {  
                  if (err) {
                    Logger.log('error', 'UserController.update', 'The following error occurred(While Getting from regulation_document_link table.):', null, err);
                    callback(err);
                  } else {
                    // console.log('regulation_document_link!!'); console.log(result);              
                    regulation_document = result;
                    callback();
                  }            
                });   
              }, 
              // Do actual INSERTs into subscription detail table
              function(callback) {
                //create Array of Subscription Detail
                var subscriptionDetails = [];
                userFormData.regulations.forEach(function(regulation) {
                  regulation_document.forEach(function(reg_doc_link) {
                    if (regulation.regulation_id == reg_doc_link.regulation_id && regulation.geography_id == reg_doc_link.geography_id) {
                      subscriptionDetails.push({
                        subscription_id : subscription.id,
                        geography_id    : reg_doc_link.geography_id,
                        domain_id       : reg_doc_link.domain_id,
                        regulation_id   : reg_doc_link.regulation_id,
                        document_id     : reg_doc_link.document_id,
                         country_id      : reg_doc_link.country_id,
                        state_id        : reg_doc_link.state_id,
                        sms             :regulation.sms,
                        web             :regulation.web,
                        email           :regulation.email
                      });
                    }
                  });
                });                   
                SubscriptionDetail.create(subscriptionDetails).exec(function(err, result) { 
                  if (err) {
                    Logger.log('error', 'UserController.update', 'The following error occurred(While Creating Subscription Details.):', null, err);
                    callback(err);
                  } else {
                    Logger.log('debug', 'UserController.update', 'STEP-6: SubscriptionDetails::', result, null);
                    callback();
                  }            
                });   
              },               
            ], callback);  

          } else {
            callback();
          } 
        },                                
      ], function(err) {
            if (err) {                
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating User.Please contact Administrator.' });
            } else {
              Logger.log('debug', 'UserController.update', 'User Update Successfully.', null, null);
              res.status(200).json(200);
            }
      });
    },

    sessionGen: function(req, res){  
      session_new=this.Zurikidgen();
      sessionuser={
        user_name:req.body.email_id,
        session_id:session_new
      };
      User.update({email_id: req.body.email_id }, {password: session_new}).exec(function (err, user) {
        if (err) {
          return res.json(500, { errCode: 500 , errMsg: 'Session generation failed.Please contact Administrator' });
        } else {

          if( user[0] == undefined || user[0].user_name == undefined)
         {
           console.log(" forgot password ->");
           req.session.forgotpwd="Email Id does not exist.";
           //return res.json(500, { errCode: 500 , errMsg: 'Email Id does not exist' });
           //res.redirect("/forgotpass");
           return res.view('forgot-password',{forgotpwd: "Invalid Email ID."});
         }
         else
         {
           console.log(" forgot password ->"+user[0]);
         Mailer.sendWelcomeMail(user[0]);
         res.redirect("/");
       }
          //return res.json({'status':'Success'});        
        }
      });
    },

    findRegbygeostate : function(req, res) {

      var userConfig = req.session.userConfig;
      var regulationData = {};
      var geoList = {};
      async.series([
        //find geo from geogeography master table
        function(callback) {
            var sql = "SELECT id, name FROM geography where status=true";
            var params = [];
            User.query(sql, params, function(err, result) {  
             // console.log("gios "+result);
                if (err) {
                  Logger.log('error', 'UserController.findRegbygeostate', 'STEP-0: The following error occurred:', null, err);
                  callback(err);
                } else {           
                 regulationData.usergeoCollection = result;                                  
                  geoList = result;                  
                  callback();
                }            
            });             
          },        
        //find Geos
        function(callback) {
          if (userConfig.full) {
           // regulationData.usergeoCollection = geoList;
            callback();
          } else {
            regulationData.usergeoCollection = [];
            geoList.forEach(function(item) {
              var geoName = item.name.toLowerCase();
              if (userConfig.hasOwnProperty(geoName)) {
                        regulationData.usergeoCollection.push(item);
                      }                         
            });
            callback();
          }
        },
        //find country
        function(callback) {
         var sql ="SELECT c.id as id,c.name as name,g.id as gid, g.name as gname, c.geo_id"+
         " FROM country c,geography g where g.status=true and c.status=true and g.id = c.geo_id";

          if (userConfig.full) {
            //do nothing
          } else {
            var inClause = "";
            regulationData.usergeoCollection.forEach(function(item, index) {
              if (index == 0) {
                inClause = item.id; 
              } else {
                inClause = inClause + "," + item.id;
              }
            });
            sql = sql + " AND c.geo_id IN (" + inClause + ")";
          }
        var params = [];      
        Country.query(sql, params, function(err, result) {
          //console.log("gios -1 "+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'UserController.findRegbygeostate', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.countryCollection = result;
                    callback();
                  } else {
                    regulationData.countryCollection = [];
                    callback();
                  }
          }
        });               

        },
        //find states
        function(callback) {
         var sql ="SELECT g.id as gid,s.id as id,s.name as name, s.country_id as scid FROM geography g,country c,state s"+
         " where s.status = true and g.status=true and c.status=true and c.id = s.country_id and g.id = s.geography_id";

          if (userConfig.full) {
            //do nothing
          } else {
            var inClause = "";
            regulationData.countryCollection.forEach(function(item, index) {
              if (index == 0) {
                inClause = item.id; 
              } else {
                inClause = inClause + "," + item.id;
              }
            });
            sql = sql + " AND s.country_id IN (" + inClause + ")";
          }
        var params = [];      
        State.query(sql, params, function(err, result) {
         // console.log("gios --2"+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'UserController.findRegbygeostate', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.stateCollection = result;
                    callback();
                  } else {
                    regulationData.stateCollection = [];
                    callback();
                  }
          }
        });               
      },
        //find Regulations
        function(callback) {
          var sql = "SELECT distinct rdl.geography_id, rdl.domain_id, rdl.regulation_id as id,rdl.country_id, rdl.state_id, r.name as name " + 
                "  FROM regulation r, regulation_document_link rdl WHERE r.status=true and r.id=rdl.regulation_id ";

          if (userConfig.full) {
          var params = [];      
          Regulation.query(sql, params, function(err, result) {
           // console.log("gios 3"+JSON.stringify(result));
            //  console.log("gios 3"+JSON.stringify(result));
                  if (err) {
                    Logger.log('error', 'UserController.findRegbygeostate', 'The following error occurred:', null, err);
                    callback(err);               
                  } else {          
                    if (result.length > 0) {
                      regulationData.regCollection = result;
                      callback();
                    } else {
                      regulationData.regCollection = [];
                      callback();
                    }
            }
          }); 
          } else { //restricted
            var sqld = "SELECT distinct sd.geography_id, sd.domain_id, sd.regulation_id, sd.country_id, sd.state_id FROM subscription s, subscription_detail sd " + 
                   " WHERE s.id=sd.subscription_id AND s.user_id=?";
            var params = [req.session.user.id];
          Regulation.query(sqld, params, function(err, result) {
                  if (err) {
                    Logger.log('error', 'UserController.findRegbygeostate', 'The following error occurred:', null, err);
                    callback(err);               
                  } else {          
                    if (result.length > 0) {
                   
                     var params = [];      
                Regulation.query(sql, params, function(err, regs) {
                   // console.log("gios 3"+JSON.stringify(regs));
                        if (err) {
                          Logger.log('error', 'UserController.findRegbygeostate', 'The following error occurred:', null, err);
                          callback(err);               
                        } else {          
                          if (regs.length > 0) {
                            regulationData.regCollection = regs;
                            callback();
                          } else {
                            regulationData.regCollection = [];
                            callback();
                          }
                  }
                });                                         
                    } else {
                      regulationData.regCollection = [];
                      callback();
                    }
            }
          });             
          }         
        
        },
       
      ], function(err) {
            if (err) {              
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching regulation while uploading file.Please contact Administrator.' });
            } else {               
                Logger.log('debug', 'UserController.findRegbygeostate', 'RegulationData Sent.', regulationData, null);
                return res.json(200, regulationData);
            }
      });
    },

      getRegbygeostate : function(req, res) {

      var userConfig = req.session.userConfig;
      var regulationData = {};
      var geoList = {};
      async.series([
        //find geo from geogeography master table
        function(callback) {
            var sql = "SELECT id, name FROM geography where status=true";
            var params = [];
            User.query(sql, params, function(err, result) {  
             // console.log("gios "+result);
                if (err) {
                  Logger.log('error', 'UserController.getRegbygeostate', 'STEP-0: The following error occurred:', null, err);
                  callback(err);
                } else {           
                 regulationData.usergeoCollection = result;                                  
                  geoList = result;                  
                  callback();
                }            
            });             
          },        
        //find Geos
        function(callback) {
          if (userConfig.full) {
           // regulationData.usergeoCollection = geoList;
            callback();
          } else {
            regulationData.usergeoCollection = [];
            geoList.forEach(function(item) {
              var geoName = item.name.toLowerCase();
              if (userConfig.hasOwnProperty(geoName)) {
                        regulationData.usergeoCollection.push(item);
                      }                         
            });
            console.log("geo checking 2 ==+++++++++++++++++==" , regulationData.usergeoCollection);
            callback();
          }
        },
        //find country
        function(callback) {
         var sql ="SELECT c.id as id,c.name as name,g.id as gid, g.name as gname, c.geo_id"+
         " FROM country c,geography g where g.status=true and c.status=true and g.id = c.geo_id";

          if (userConfig.full) {
            //do nothing
          } else {
            var inClause = "";
            regulationData.usergeoCollection.forEach(function(item, index) {
              if (index == 0) {
                inClause = item.id; 
              } else {
                inClause = inClause + "," + item.id;
              }
            });
            sql = sql + " AND c.geo_id IN (" + inClause + ")";
          }
        var params = [];      
        Country.query(sql, params, function(err, result) {
          //console.log("gios -1 "+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'UserController.getRegbygeostate', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.countryCollection = result;

                    console.log("checking country collection +++++++++", JSON.stringify(regulationData.countryCollection ));
                    callback();
                  } else {
                    regulationData.countryCollection = [];
                    callback();
                  }
          }
        });               

        },
        //find states
        function(callback) {
         var sql ="SELECT s.id as id,s.name as name, s.country_id as scid, s.geography_id as gid FROM country c,state s"+
         " where s.status = true and c.status=true and c.id = s.country_id";

          if (userConfig.full) {
            //do nothing
          } else {
            var inClause = "";
            regulationData.countryCollection.forEach(function(item, index) {
              if (index == 0) {
                inClause = item.id; 
              } else {
                inClause = inClause + "," + item.id;
              }
              console.log("inClause----------------------------->",inClause);
            });
            sql = sql + " AND s.country_id IN (" + inClause + ")";
          }
        var params = [];      
        State.query(sql, params, function(err, result) {
         // console.log("gios --2"+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'UserController.getRegbygeostate', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.stateCollection = result;
                    callback();
                  } else {
                    regulationData.stateCollection = [];
                    callback();
                  }
          }
        });               
      },
        //find Regulations
        function(callback) {
          var sql = "SELECT distinct rdl.geography_id, rdl.regulation_id as rlid,rdl.country_id, rdl.state_id, r.name as name " + 
                "  FROM regulation r, regulation_document_link rdl WHERE r.status=true and r.id=rdl.regulation_id ";

          if (userConfig.full) {
          var params = [];      
          Regulation.query(sql, params, function(err, result) {
            console.log("user controller reguation data >>>>>>>>>>>>"+JSON.stringify(result));
            //  console.log("gios 3"+JSON.stringify(result));
                  if (err) {
                    Logger.log('error', 'UserController.getRegbygeostate', 'The following error occurred:', null, err);
                    callback(err);               
                  } else {          
                    if (result.length > 0) {
                      regulationData.regCollection = result;
                      callback();
                    } else {
                      regulationData.regCollection = [];
                      callback();
                    }
            }
          }); 
          } else { //restricted


            var sqld = "SELECT distinct sd.geography_id, sd.domain_id, sd.regulation_id, sd.country_id, sd.state_id FROM subscription s, subscription_detail sd " + 
                   " WHERE s.id=sd.subscription_id AND s.user_id=?";
            var params = [req.session.user.id];
          Regulation.query(sqld, params, function(err, result) {

             console.log("user controller restricted reguation data >>>>>>>>>>>>"+JSON.stringify(result));

                  if (err) {
                    Logger.log('error', 'UserController.getRegbygeostate', 'The following error occurred:', null, err);
                    callback(err);               
                  } else {          
                    if (result.length > 0) {
                   
                     var params = [];      
                Regulation.query(sql, params, function(err, regs) {
                   // console.log("gios 3"+JSON.stringify(regs));
                        if (err) {
                          Logger.log('error', 'UserController.getRegbygeostate', 'The following error occurred:', null, err);
                          callback(err);               
                        } else {          
                          if (regs.length > 0) {
                            regulationData.regCollection = regs;
                            callback();
                          } else {
                            regulationData.regCollection = [];
                            callback();
                          }
                  }
                });                                         
                    } else {
                      regulationData.regCollection = [];
                      callback();
                    }
            }
          });             
          }         
        
        },
       
      ], function(err) {
            if (err) {              
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching regulation while uploading file.Please contact Administrator.' });
            } else {               
                Logger.log('debug', 'UserController.getRegbygeostate', 'RegulationData Sent.', regulationData, null);
                return res.json(200, regulationData);
            }
      });
    },
    passwordChange:function(req,res){

      var email = req.param("email_id");
      var password = req.param("password");
      Logger.log('debug', 'UserController.passwordChange', 'RESETTING:: EmailID[' + email + '] -- Password[' + password + ']', null, null);
      User.update({email_id: req.session.user.email_id}, {password: req.param("password")}).exec(function (err, user) {
        if (err) {
          Logger.log('error', 'UserController.passwordChange', 'The following error occurred(While resetting password.):', null, err);
          return res.json(500, { errCode: 500 , errMsg: 'Error occured while changing Password.' });
        } else {
          Logger.log('debug', 'UserController.passwordChange', 'User Password Reseted::', user, null);
          return res.redirect("/");
       }
      });

    },
    destroy: function(req, res) {
      Logger.log('debug', 'UserController.destroy', 'Deleting User[id] ' + req.params.id, null, null);
      console.log("user to be deleted id",req.params.id);
      console.log("user to be updated id ",req.session.user.id);
      var userid = req.session.user.id;
      var thisuserid=req.params.id;
      async.series([
            // selecting id from subscription table   
          function(callback){
              User.update({id: req.params.id}, {is_active: false}).exec(function (err, user) {
                if (err) {
                  Logger.log('error', 'UserController.destroy', 'step 1 :The following error occurred(While deleting from user table.):', null, err);
                  return res.json(500, { errCode: 500 , errMsg: 'Error occurred while deleting user.Please contact Administrator.' });
                } else {
                  Logger.log('debug', 'UserController.destroy', 'User Soft Deleted.', req.params.id, null);
                  callback();
                  //res.status(200).json(200);
                }
              }); 
          }, 
          function(callback){
            //var sql = "select created_by from user where created_by = ?"
            var sql ="update user set created_by = ?,modified_by = ?,modified_date = now() where created_by = ? ";
            var params=[userid ,userid, thisuserid];
            console.log("params",params);
            User.query(sql,params,function(err,result){
              if(err){
                callback(err);
                Logger.log('error', 'UserController.destroy', 'step 2 :The following error occurred(While deleting from user table.):', null, err);
              } else {
                Logger.log('debug', 'UserController.destroy', 'User Deleted.', req.params.id, null);
                console.log("result",result);
                callback();
              }
            });
          },
      ],function(err) {
        if (err) {
            console.log(err);
            if ( err.hasOwnProperty('ecode'))
                return res.send({ err: 'Exception caught while deleting  user ' }, 500);
            else
                return res.json({ err: err }, 500);
        } else {
              console.log(' subscription_detail link deleted.');
               res.status(200).json(200);
        }
      });    
    },
    //delete user row table/admin row table 
    deleteuser : function(req,res){
        var postData = (req.body) ? req.body : undefined;
        console.log(postData);
        var subid ;
        var userid;
        
      async.series([
        // selecting id from subscription table   
         function(callback){
          var sql = "SELECT id FROM subscription where user_id=?";
          var params = [postData.userid];
          console.log("params",params);
          SubscriptionDetail.query(sql, params, function (err, result) {
                  if (err) {
                      console.log(err);
                      return res.json({ err: err }, 500);
                 } else{
                      console.log("result",result);
                      subid=result[0].id;
                      console.log("subid",subid);
                      callback();             
                  }
            });


         },
        //deleting in subscription_detail   
        function(callback){
          var postData = (req.body) ? req.body : undefined;           
            var sql = "DELETE FROM subscription_detail"+
            " WHERE geography_id=? AND country_id=? AND state_id=? AND regulation_id=? AND subscription_id=?";
            var params = [postData.geography_id, postData.country_id, postData.state_id,postData.regulation_id,subid];
              console.log("subscription_detail == params");console.log(params);
              SubscriptionDetail.query(sql, params, function (err, result) {
                  if (err) {
                      console.log(err);
                      return res.json({ err: err }, 500);
                 } else{
                      res.send('success'); 
                     callback();             
                  }
            });
        }
       
    ], function(err) {
        if (err) {
            console.log(err);
            if ( err.hasOwnProperty('ecode'))
                return res.send({ err: 'Exception caught while deleting data in user ' }, 500);
            else
                return res.json({ err: err }, 500);
        } else {
              console.log(' subscription_detail link deleted.');
              //res.json(regDocDetail);
      }
      });    
  },
  //chaning particular sms,email,web for particular user
  alertchange:function(req,res){
    console.log("alertchange");
    var useralertFormData = (req.body) ? req.body : undefined;
    var userid= req.session.user.id;
    var subscription;
    console.log("userid");
    async.series([
              //Get subscription id from subscription table
              function(callback) {
                var sql = "SELECT id FROM subscription WHERE user_id=?";
                var params = [userid];
                User.query(sql, params, function(err, result) {  
                  if (err) {
                    Logger.log('error', 'UserController.create', 'The following error occurred(While fetching Subscription):', null, err);
                    callback(err);
                  } else {              
                    subscription = result[0];
                    console.log(JSON.stringify(subscription));
                    callback();
                  }            
                });                
              },
              //Delete subscription_details for this user
            function(callback) {
              var sql = "update subscription_detail SET sms=?, web=?, email=? WHERE subscription_id=?";
              var params = [useralertFormData.smsaccess, useralertFormData.webaccess, useralertFormData.emailaccess, subscription.id];
              console.log("params");console.log(params);
              User.query(sql, params, function(err, result) {  
                if (err) {
                  Logger.log('error', 'UserController.update', 'The following error occurred(While Deleting From subscription_detail table.):', null, err);
                  callback(err);
                } else {
                  callback();
                }            
              });
            }                                       
      ], function(err) {
            if (err) {                
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating alert type for User.Please contact Administrator.' });
            } else {
              Logger.log('debug', 'UserController.update', 'User Update Successfully.', null, null);
              res.status(200).json(200);
            }
      });

  }


}
