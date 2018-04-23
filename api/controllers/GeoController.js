module.exports = {

    find: function(req, res){
     
       var userConfig = req.session.userConfig;
      	if (userConfig.full) {
       		sql = " SELECT " +
                  " distinct g.id as id, g.name as name, g.description as description " +
                  "  FROM geography g " +
                  "  WHERE status = true" ; 
            var params = [];         	
      	} else {
       		sql = " SELECT " +
                  " distinct g.id as id, g.name as name, g.description as description " +
                  "  FROM geography g, subscription s, subscription_detail sd, user u " +
                  " WHERE u.id=s.user_id and s.id=sd.subscription_id and g.id = sd.geography_id and g.status = 1 and u.id=?";    		
      		var params = [req.session.user.id];
      	}	
    console.log(req.session.user.id);
	if (req.param('limit') && req.param('limit') != undefined) {
        var limit = req.param('limit');
        console.log(limit);
        sql = sql + " ORDER BY id LIMIT " + limit;
        if (req.param('offset') && req.param('offset') != undefined) {
          var offset = req.param('offset');
          console.log(offset);
          sql = sql + " OFFSET " + offset;
        } else {
          sql = sql + " OFFSET 0 ";
        }
      } else {
          if (req.param('name') && req.param('name') != undefined) {
              sql = sql + " AND name LIKE '%" + req.param('name') + "%'";
              sql = sql + " ORDER BY id ";
          }     
      } 
      var  params = [req.session.user.id];          
      User.query(sql, params, function(err, users) {
            if(err) {
             Logger.log('error', 'GeoController.find', 'The following error occurred:', null, err);
			return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Geography .Please contact Administrator.' });
                //return res.json({ err: err }, 500);
            } else {
                //console.log(users);
    			       Logger.log('debug', 'GeoController.find', 'Sent Allowed Geos.', users, null);
                res.json(users);
            }
        });

    },
    getAll : function(req,res) {
      var sql = "SELECT * FROM geography where status = true";
      User.query(sql, function(err, users) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Geography");
                console.log(users);
                res.json(users);
            }
        });

    }, 
    create: function(req, res) {
      console.log('create');
      var geoFormData = (req.body) ? req.body : undefined;
      console.log(geoFormData);
      var geography = {};
      var geographies ;
      //var accessGeo ;
      var userConfig = req.session.userConfig;
      var geographiesaccess;
      var useraccess ;
      
      async.series([
        function(callback) { 
          Geography.find({name : geoFormData.name, status: true}).exec(function (err ,geography) {
             if(err){
              Logger.log('error', 'GeoController.create', 'The following error occurred(While checking the Geography):', null, err);
                callback(err);
            }else if ( geography.length>0){
              Logger.log('debug', 'GeoController.create', 'STEP-0a:Geography Already Exist.', null, null);
              callback({errMsg : 'Geography Already Exist' , errCode : 'errgeo'});
            } else callback();
          });     
      },
      function(callback) {
        console.log('STEP-1:Insert into Geography table');
        var geoData = {
          name    : geoFormData.name,
          description : geoFormData.description
        };

        Geography.create(geoData).exec(function(err, result) {  
          if(err) {
            console.log(err);
            callback(err);
          } else {
            console.log(result);              
            geography = result;
            callback();
          }            
        });

       },

       /* command function by priyanka
       function(callback){
        var sql = "SELECT name FROM geography where status = true";
            Geography.query(sql, function (err, result) {
              if (err) {
                console.log(err);
                Logger.log('error', 'GeoController.create', 'The following error occurred:', null, err);
                return res.json({ err: err }, 500);
              } else {
                console.log("result");console.log(result);
                accessGeo=result;            
                //accessGeo = '';
                if (result.length >=0) {
                  result.forEach(function(item, index) {
                    if (index == 0) {
                      accessGeo = item.name.toUpperCase();
                    } else {
                      accessGeo = accessGeo + ' - ' + item.name.toUpperCase();
                    }
                  });
                  console.log("accessGeo",accessGeo);
                  callback();             
                } else {
                  callback();
                }  
              }
            });
       },
       */

       /*  command function by priyanka

       function(callback){
        var sql = "SELECT  user_id FROM user_permission where permission_id=8";     
        User.query(sql, function(err, result) {
            if(err) {
              console.log(err);
              return res.json({ err: "Geography not found" }, 500);
            } 
             
            else {
              console.log("result",result);
                useraccess=result;
                if (result.length >=0) {
                  result.forEach(function(item,index) {
                    useraccess =item.user_id;
                    var sql = " UPDATE subscription set access_geo=? where user_id=?";
                    var params = [accessGeo,useraccess]; 
                    console.log("params",JSON.stringify(params));                  
                    User.query(sql, params, function(err, result) {  
                      if (err) {
                        Logger.log('error', 'UserController.create', 'The following error occurred(While Creating Subscription):', null, err);
                          callback(err);
                      } else {             
                 
                      } 
                    });  
                  });                
                   callback();
                } 
              } 
              
        });    *   
         
      }*/

       ],function(err) {
          if (err) {
              console.log(err);
            if ( err.hasOwnProperty('errCode') && err.errCode == 'errgeo') 
                return res.json(500, { errCode: 'errgeo' , errMsg: 'Geography Already Exist.' });
            else    return res.json(500, { errCode: 500 , errMsg: 'Geography Already Exist.' });
          } else {
              console.log("To know Geography collection details", geography);
              Logger.log('debug', 'GeoController.create', 'Geography Created.', null, null);
              res.status(200).json(200);
            }
        });

    },

  findGeography: function(req,res) {
      console.log("geo");
      var sql = "SELECT * FROM geography WHERE id = ? and status=true";
      Geography.query(sql,[req.params.id], function(err, geo) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Geography");
                console.log(geo);
                res.json(geo);
            }
        });

  },

  update: function(req, res) {
      var geographies;
      var geoFormData = (req.body) ? req.body : undefined;
      console.log("geo form data :: " + geoFormData);
      async.series([

        //Louis : modified to test the existence of geography
         function(callback) { 
          Geography.find({name : geoFormData.name, status: true}).exec(function (err ,geography) {
             if(err){
              Logger.log('error', 'GeoController.update', 'The following error occurred(While checking the Geography):', null, err);
                callback(err);
            }else if ( geography.length>0 && geography[0].id != geoFormData.id){
              Logger.log('debug', 'GeoController.update', 'STEP-0a:Geography Already Exist.', null, null);
              callback({errMsg : 'Geography Already Exist' , errCode : 'errgeo'});
            } else callback();
          });     
      },


        //Update user table
        function(callback) {
          console.log('STEP-1:Update geography table');
          sql = "UPDATE geography SET name=?, description=?, modified_by=?, modified_date=now() WHERE id=? ";
          var params = [
            geoFormData.name,
            geoFormData.description,
            req.session.user.id,
            geoFormData.id
          ];
          Geography.query(sql, params, function(err, result) {
            if(err) {
              console.log(err);
              callback(err);
            } else {
              console.log(result);
              callback();
            }
          });

        },
        function(callback){
           console.log('STEP-2:delete reg mapping valuestable');
          sql = "DELETE FROM geography_regulation_link WHERE geography_id=?";
          var params = [

            geoFormData.id
          ];
          Geography_Regulation_link.query(sql, params, function(err, result) {
            if(err) {
              Logger.log('error', 'GeoController.getAll', 'The following error occurred:', null, err);
              callback(err);
            } else {
              console.log(result);
              callback();
            }
          });

        },
        function(callback){
           console.log('STEP-3:delete grl mapping valuestable');
          sql = "DELETE FROM geography_regulation_link WHERE geography_id=?";
          var params = [
            geoFormData.id
          ];
          Geography_Regulation_link.query(sql, params, function(err, result) {
            if(err) {
              console.log(err);
              callback(err);
            } else {
              console.log(result);
              callback();
            }
          });

        },

        /* command function by priyanka

        function(callback){
        var sql = "SELECT name FROM geography where status = true";
            Geography.query(sql, function (err, result) {
              if (err) {
                console.log(err);
                Logger.log('error', 'GeoController.create', 'The following error occurred:', null, err);
                return res.json({ err: err }, 500);
              } else {
                console.log("result");console.log(result);
                accessGeo=result;            
                //accessGeo = '';
                if (result.length >=0) {
                  result.forEach(function(item, index) {
                    if (index == 0) {
                      accessGeo = item.name;
                    } else {
                      accessGeo = accessGeo + '-' + item.name;
                    }
                  });
                  console.log("accessGeo",accessGeo);
                  callback();             
                } 
              }
            });
       },
       function(callback){
        var sql = "SELECT  user_id FROM user_permission where permission_id=8";     
        User.query(sql, function(err, result) {
            if(err) {
              console.log(err);
              return res.json({ err: "Geography not found" }, 500);
            } else {
                console.log("useraccess");
                useraccess=result;
                if (result.length >=0) {
                  result.forEach(function(item, index) {                   
                      useraccess = item.user_id; 
                      var sql = " UPDATE subscription set access_geo=? where user_id=? ";
                      var params = [accessGeo,useraccess]; 
                      console.log("params",JSON.stringify(params));                  
                      User.query(sql, params, function(err, result) {  
                        if (err) {
                          Logger.log('error', 'UserController.create', 'The following error occurred(While Creating Subscription):', null, err);
                          callback(err);
                        } else {             
                          //callback();
                        } 
                      });                     
                  });
                  callback();                           
                } 
              }        
        }); 
        }*/
        ], function(err) {
            if (err) {
                console.log(err);
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errgeo') 
                return res.json(500, { errCode: 'errgeo' , errMsg: 'Geography Already Exist.' });
            else if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while updating the domain' }, 500);
              else    return res.json({ err: err }, 500);
              } else {
                console.log('New geography Updated.');
                res.json({"status":"success"});
            }
      });
         /* console.log('update');
          var geoFormData = (req.body) ? req.body : undefined;
          console.log(geoFormData);
          var sql = "UPDATE geography set name =?,description=? where id=?";
           Geography.query(sql,[geoFormData.name,geoFormData.description,geoFormData.id], function(err, geo) {
            if(err) {
              console.log(err);
                //return res.json({ err: err }, 500);
            } else {
                console.log("Master Geography");
                console.log(geo);
                 res.json({"status":"success"});
            }
        });*/
        
  },
  destroy : function(req,res){
    var geoFormData = (req.body) ? req.body : undefined;
    console.log("geoFormData");console.log(geoFormData);
    async.series([
      function(callback) {
        console.log("destroy id :: "); console.log(geoFormData.geography_id);
        var sql = "UPDATE geography set status=false where id=?";
        Geography.query(sql,[geoFormData.geography_id],function (err ,geography) {
          if(err){
              console.log(err);
              callback(err);
          }else{
              console.log('geography::'+ geography);
              //res.send('success'); 
              callback();
          }
        });
      },//DELETING in geography_domain_link table
      function(callback) {
          var sql = "DELETE FROM geography_domain_link WHERE geography_id=?";
            var params = [geoFormData.geography_id];
            console.log("destroy geography_domain_link::params");console.log(params);
            Geography_Domain.query(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
                    Logger.log('error', 'GeoController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } else{
                    //res.send('success'); 
                    callback();             
                }
            });

      },//DELETING in geography_regulation_link table
      function(callback) {
          var sql = "DELETE FROM geography_regulation_link WHERE geography_id=?";
            var params = [geoFormData.geography_id];
            console.log("destroy geography_regulation_link::params");console.log(params);
            Geography_Regulation_link.query(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
                    Logger.log('error', 'GeoController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } else{
                    //res.send('success'); 
                    callback();             
                }
            });

      },//DELETING geography in regulation_document_link table
      function(callback) {
          var sql = "DELETE FROM regulation_document_link WHERE geography_id=?";
          var params = [geoFormData.geography_id];
          console.log("destroy regulation_document_link::params");console.log(params);
          regulation_document_link.query(sql, params, function (err, result) {
              if (err) {
                    console.log(err);
                    Logger.log('error', 'GeoController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } else{
                    //res.send('success'); 
                    callback();             
                }
            });

      },
      //DELETING geography in subscription_detail table
      function(callback) {
          var sql = "DELETE FROM subscription_detail WHERE geography_id=?";
            var params = [geoFormData.geography_id];
            console.log("destroy subscription_detail::params");console.log(params);
            SubscriptionDetail.query(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
            Logger.log('error', 'GeoController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } else{
                    res.send('success'); 
                    callback();             
                }
            });

      },
     /* command function by priyanka

      function(callback){
        var sql = "SELECT name FROM geography where status = true";
            Geography.query(sql, function (err, result) {
              if (err) {
                console.log(err);
                Logger.log('error', 'GeoController.create', 'The following error occurred:', null, err);
                return res.json({ err: err }, 500);
              } else {
                console.log("result");console.log(result);
                accessGeo=result;            
                //accessGeo = '';
                if (result.length >=0) {
                  result.forEach(function(item, index) {
                    if (index == 0) {
                      accessGeo = item.name.toUpperCase();
                    } else {
                      accessGeo = accessGeo + ' - ' + item.name.toUpperCase();
                    }
                  });
                  console.log("accessGeo",accessGeo);
                  callback();             
                } 
              }
            });
       },
       function(callback){
        var sql = "SELECT  user_id FROM user_permission where permission_id=8";     
        User.query(sql, function(err, result) {
            if(err) {
              console.log(err);
              return res.json({ err: "Geography not found" }, 500);
            } else {
                console.log("useraccess");
                useraccess=result;
                if (result.length >=0) {
                  result.forEach(function(item, index) {                   
                      useraccess = item.user_id; 
                      var sql = " UPDATE subscription set access_geo=? where user_id=? ";
                      var params = [accessGeo,useraccess]; 
                      console.log("params",JSON.stringify(params));                  
                      User.query(sql, params, function(err, result) {  
                        if (err) {
                          Logger.log('error', 'UserController.create', 'The following error occurred(While Creating Subscription):', null, err);
                          callback(err);
                        } else {             
                          //callback();
                        } 
                      });                     
                  });
                  callback();                           
                } 
              }        
        }); 
      }*/
      ], function(err) {
          if (err) {
            console.log(err);
          if ( err.hasOwnProperty('ecode'))
              return res.send({ err: 'Exception caught while delating Geography ' }, 500);
          else
              return res.json({ err: err }, 500);
          } else {
            console.log('Geography in All link Deleted.');
            //res.json(regDocDetail);
          }
    });

  },
    /*var id = req.params.id;
    console.log("destroy geo  = " + id);
    Geography.destroy({id: id}).exec(function (err, result) {
    if (err) {
      console.log(err);
      return res.json({ err: err }, 500);
    } else {
        console.log("Geography Deleted."); console.log(result);
              res.status(200).json(200);
       }
      });     */ 
  
  findregBygeoId : function(req,res){
    console.log("regbygeoid");
    console.log('geography :: id :: ' + req.params.id);
    var sql = "select r.* from geography g,regulation r,geography_regulation_link grl where g.status = 1 and r.status=true and g.id = grl.geography_id and r.id = grl.regulation_id and g.id=? ";
       
      Geography_Regulation_link.query(sql,[req.params.id],function(err, reg) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(reg);
          }
      });
    },

  findgeo: function(req, res){
    console.log("findgeo");
    console.log('geography :: id :: ' + req.params.id);
    var sql = "select * from geography where status = true and id = ? ";
    Geography.query(sql,[req.params.id],function(err,geo) {
      if(err) {
        console.log(err);
        return res.json({ err: err }, 500);
      } else {
          res.json(geo);
        }
      });
    }

}
