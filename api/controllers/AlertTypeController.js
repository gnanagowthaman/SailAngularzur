var path = require('path');
var basePath = __dirname + '/../../views/emailTemplates';
module.exports = {

getAll:function (req,res) {
     var sql = "SELECT id, message FROM alert_map ";
     if (req.param('limit') && req.param('limit') != undefined) {
        var limit = req.param('limit');
        console.log(limit);
        sql = sql + " ORDER BY id desc LIMIT " + limit;
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
      Alerts.query(sql, function(err, alerts) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Alerts");
                console.log(alerts);
                res.json(alerts);
            }
        });
   
  },

  create: function(req, res) {
      console.log('create');
      var _self;
      var alertFormData = (req.body) ? req.body : undefined;
      console.log(":::::::::::" + alertFormData.alertId);
      console.log(alertFormData);

       var alertObj = JSON.parse(alertFormData.alertId);

       console.log(alertObj.length);
    
      var alerts = {};
    async.series([
        function(callback) {
                var writeOptions = {
                    type      : 'Email',
                    basePath  : basePath,
                    dirName   : alertFormData.path,
                    fileName  : alertFormData.filename
                };    
                console.log("test email  ::::" + JSON.stringify(writeOptions));          
                    Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Uploading File: ' + alertFormData.filename, writeOptions, null);
                    FileManagerService.uploadFileAlert1(req, res, writeOptions,'uploadFile', FileManagerService.saveFileToDiskAlert1, function(err, files) {
                    if (err) {
                        Logger.log('error', 'AlertTypeController.create', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                   
                    } else {
                        Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Writing fileContent Done.', null, null);
                        callback();               
                    }   
                });
            },
                function(callback) {
                var writeOptions = {
                    type      : 'Sms',
                    basePath  : basePath,
                    dirName   : alertFormData.smspath,
                    fileName  : alertFormData.smsfilename
                }; 
                console.log(writeOptions);             
                    Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Uploading File: ' + alertFormData.smsfilename, writeOptions, null);
                    FileManagerService.uploadFileAlert1(req, res, writeOptions,'uploadFileSms', FileManagerService.saveFileToDiskAlert1, function(err, files) {
                    if (err) {
                        Logger.log('error', 'AlertTypeController.create', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                   
                    } else {
                        Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Writing fileContent Done.', null, null);
                        callback();               
                    }   
                });
            },

            function(callback) {
                var writeOptions = {
                    type      : 'Web',
                    basePath  : basePath,
                    dirName   : alertFormData.webpath,
                    fileName  : alertFormData.webfilename
                }; 
                console.log(writeOptions);             
                    Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Uploading File: ' + alertFormData.webfilename, writeOptions, null);
                    FileManagerService.uploadFileAlert1(req, res, writeOptions,'uploadFileWeb', FileManagerService.saveFileToDiskAlert1, function(err, files) {
                    if (err) {
                        Logger.log('error', 'AlertTypeController.create', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                   
                    } else {
                        Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Writing fileContent Done.', null, null);
                        callback();               
                    }   
                });
            },

            function(callback)
            {
                _self = this;
                 var sql = "INSERT INTO alert_map (message, created_date)  VALUES (?, now())";
                var params = [alertFormData.message];

                 console.log(JSON.stringify(params));
                  AlertMap.query(sql, params, function(err, result) 
                  {
                    if(err) {
                      console.log(err);
                      callback(err);
                    }
                    else
                    {
                         console.log("Reading data "+JSON.stringify(result));
                        _self.alertMapId = result.insertId;
                        callback();
                    }           
                  });

            },

            function(callback)
            {
                for(i=0;i <  alertObj.length; i++ )
                  {
                      console.log(" gid "+alertObj[i].gid);

                      var rid = null;
                      var rlid = null;

                      if( alertObj[i].rid  != undefined )
                      {
                        rid = alertObj[i].rid;
                         rlid = alertObj[i].rlid;
                      }




                      var sql = "INSERT INTO alerts (alertmap_id,geography_id, country_id,state_id,domain_id, "+
                                " regulator_id,regulation_id,email,web, created_date) VALUES (?,?,?,?,?,?,?,?,?, now())";
                      var params = [_self.alertMapId,
                                    alertObj[i].gid,
                                    alertObj[i].cntid,
                                    alertObj[i].sid,
                                    alertObj[i].did,
                                    rid,
                                    rlid,
                                    alertFormData.email,
                                    alertFormData.web];

                      console.log(JSON.stringify(params));
                      Alerts.query(sql, params, function(err, result) {
                        if(err) {
                          console.log(err);
                          callback(err);
                        }
                        else
                        {
                            callback();
                        }           
                      });
                   
                  }
                  
            },

        //     function(callback) {
        //         console.log('STEP-1:Insert into alerts table');
        //         console.log(alertFormData.regulation_id);
        //         console.log(alertFormData.regulator_id);
        //         if((alertFormData.regulation_id == "null") && (alertFormData.regulator_id == "null")){
        //           var alertData = {
        //           name    : alertFormData.message,
        //           geography_id  : alertFormData.geography_id,
        //           country_id  : alertFormData.country_id,
        //           state_id    : alertFormData.state_id,
        //           domain_id   : alertFormData.domain_id,
        //           email       : alertFormData.email,
        //           sms       : alertFormData.sms,
        //           web       : alertFormData.web,
        //           //file_name    : alertFormData.filename,
        //           //file_path   : alertFormData.path
        //         };
        //         console.log("alertData ::: " + JSON.stringify(alertData));
        //         Alerts.create(alertData).exec(function(err, result) { 
        //              if(err) {
        //               console.log("errr");
        //               console.log(err);
        //               callback(err);
        //           } else {
        //               alerts = result;
        //               callback();
        //             }
                 
        //         }); 
        //         }
        //         else if((alertFormData.regulation_id !== "null") && (alertFormData.regulator_id == "null")){
        //           var alertData = {
        //           name    : alertFormData.message,
        //           geography_id  : alertFormData.geography_id,
        //           country_id  : alertFormData.country_id,
        //           state_id    : alertFormData.state_id,
        //           domain_id   : alertFormData.domain_id,
        //           regulation_id : alertFormData.regulation_id,
        //           email       : alertFormData.email,
        //           sms       : alertFormData.sms,
        //           web       : alertFormData.web,
        //           //file_name    : alertFormData.filename,
        //           //file_path   : alertFormData.path
        //         };
        //         console.log("alertData ::: " + JSON.stringify(alertData));
        //         Alerts.create(alertData).exec(function(err, result) { 
        //              if(err) {
        //               console.log("errr");
        //               console.log(err);
        //               callback(err);
        //           } else {
        //               alerts = result;
        //               callback();
        //             }
                 
        //         }); 
        //         }
        //         else if((alertFormData.regulation_id == "null") && (alertFormData.regulator_id !== "null")){
        //           var alertData = {
        //           name    : alertFormData.message,
        //           geography_id  : alertFormData.geography_id,
        //           country_id  : alertFormData.country_id,
        //           state_id    : alertFormData.state_id,
        //           domain_id   : alertFormData.domain_id,
        //           regulator_id : alertFormData.regulator_id,
        //           email       : alertFormData.email,
        //           sms       : alertFormData.sms,
        //           web       : alertFormData.web,
        //           //file_name    : alertFormData.filename,
        //           //file_path   : alertFormData.path
        //         };
        //         console.log("alertData ::: " + JSON.stringify(alertData));
        //         Alerts.create(alertData).exec(function(err, result) { 
        //              if(err) {
        //               console.log("errr");
        //               console.log(err);
        //               callback(err);
        //           } else {                     
        //               alerts = result;
        //               callback();
        //             }
                 
        //         }); 
        //         }
        //         else {
      
        //         async.forEachOf(alertFormData.alertId, function(item, callback) {
        //             console.log("test::::" + item);
        //             console.log("without file upload:::::::::::" + JSON.stringify(alertFormData.alertId));
        //             var sql = "INSERT INTO alerts (message, geography_id, country_id,state_id,domain_id, regulator_id,regulation_id,email,sms,web) VALUES (?,?,?,?,?,?,?,?,?,?)";
        //             var params = [alertFormData.message, item.gid,item.cntid,item.sid,item.did,item.rid,item.rlid,alertFormData.email,alertFormData.web];
        //             console.log(JSON.stringify(params));
        //             Alerts.query(sql, params, function(err, result) {
        //               if(err) {
        //                 console.log(err);
        //                 callback(err);
        //               } else {
        //                 callback();
        //               }
        //             });
        //         }, callback);
        //      }

        // },

        function(callback) {
            console.log("STEP -2: insert into alert_file table");
            console.log(_self.alertMapId);
            
               if( alertFormData.filename == undefined )
                     alertFormData.filename = null;
                if( alertFormData.webfilename == undefined )
                    alertFormData.webfilename = null;

                  if( alertFormData.path == undefined )
                     alertFormData.path = null;
                if( alertFormData.webpath == undefined )
                    alertFormData.webpath = null;
                

               // result.forEach(function(item) {
                    var sql = "INSERT INTO alert_file (alert_id, file_name, file_path) values (?,?,?), (?,?,?)";
                    var params = [
                        _self.alertMapId,
                        alertFormData.filename,
                        alertFormData.path,
                        _self.alertMapId,
                        alertFormData.webfilename,
                        alertFormData.webpath
                    ];
                    console.log("test :::::::::::::::::::::");
                    console.log(params);
                    alert_file.query(sql, params, function(err, result) {
                      if(err) {
                        console.log(err);
                        callback(err);
                      } else {
                        console.log(result);
                        callback();
                      }
                    });                
               // });
                   
          },
        ], function(err) {
            if (err) {
                    console.log(err);
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errAlerts')
                    return res.json(500, { errCode: 'errAlerts' , errMsg: 'Error while creating alert .' });
                else    return res.json(500, { errCode: 500 , errMsg: 'Error while creating alert.' });
            } else {
                Logger.log('debug', 'AlertTypeController.create', 'Alert Created.', null, null);
                   // res.status(200).json(200, {alertId : _self.alertMapId});
                    res.json(200, {alertId : _self.alertMapId});
        }
        });

  },

  update : function(req, res){
      console.log('edit');
      var alertFormData = (req.body) ? req.body : undefined;
      console.log("test" + JSON.stringify(alertFormData));
       var alertObj = JSON.parse(alertFormData.alertId);
       console.log(alertObj.length);
      var alerts = {};
       async.series([
        function(callback) {
                var writeOptions = {
                    type      : 'Email',
                    basePath  : basePath,
                    dirName   : alertFormData.path,
                    fileName  : alertFormData.filename
                };    
                console.log("test email  ::::" + JSON.stringify(writeOptions));          
                Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Uploading File: ' + alertFormData.filename, writeOptions, null);
                FileManagerService.uploadFileAlert1(req, res, writeOptions,'uploadFile', FileManagerService.saveFileToDiskAlert1, function(err, files) {
                    if (err) {
                        Logger.log('error', 'AlertTypeController.create', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                   
                    } else {
                        Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Writing fileContent Done.', null, null);
                        callback();               
                    }   
                });
            },
          function(callback) {
                var writeOptions = {
                    type      : 'Sms',
                    basePath  : basePath,
                    dirName   : alertFormData.smspath,
                    fileName  : alertFormData.smsfilename
                }; 
                console.log(writeOptions);             
                Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Uploading File: ' + alertFormData.smsfilename, writeOptions, null);
                FileManagerService.uploadFileAlert1(req, res, writeOptions,'uploadFileSms', FileManagerService.saveFileToDiskAlert1, function(err, files) {
                    if (err) {
                        Logger.log('error', 'AlertTypeController.create', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                   
                    } else {
                        Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Writing fileContent Done.', null, null);
                        callback();               
                    }   
                });
            },

            function(callback) {
                var writeOptions = {
                    type      : 'Web',
                    basePath  : basePath,
                    dirName   : alertFormData.webpath,
                    fileName  : alertFormData.webfilename
                }; 
                console.log(writeOptions);             
                Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Uploading File: ' + alertFormData.webfilename, writeOptions, null);
                FileManagerService.uploadFileAlert1(req, res, writeOptions,'uploadFileWeb', FileManagerService.saveFileToDiskAlert1, function(err, files) {
                    if (err) {
                        Logger.log('error', 'AlertTypeController.create', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                   
                    } else {
                        Logger.log('debug', 'AlertTypeController.create', 'STEP-1: Writing fileContent Done.', null, null);
                        callback();               
                    }   
                });
            },

    
            function(callback)
            {

           
                    sql = "DELETE FROM alerts WHERE alertmap_id=?";
                    params = [alertFormData.recId];

                    Alerts.query(sql, params, function (err, result) 
                    {
                            if (err) {
                                console.log(err);
                                Logger.log('error', 'AlertTypeController.destroy', 'The following error occurred:', null, err);
                                return res.json({ err: err }, 500);
                            } 
                            else
                            {
                               callback();
                              
                            }
                  });
                },




            function(callback)
            {
                _self = this;
                var sql = "update alert_map set message=?  where id=?";
                var params = [alertFormData.message, alertFormData.recId];

                 console.log(JSON.stringify(params));
                  AlertMap.query(sql, params, function(err, result) 
                  {
                    if(err) {
                      console.log(err);
                      callback(err);
                    }
                    else
                    {
                         console.log("Reading data "+JSON.stringify(result));
                         callback();
                    }           
                  });

            },

            function(callback)
            {
                for(i=0;i <  alertObj.length; i++ )
                  {
                      console.log(" gid "+alertObj[i].gid);

                       var rid = null;
                      var rlid = null;

                      if( alertObj[i].rid  != undefined )
                      {
                        rid = alertObj[i].rid;
                         rlid = alertObj[i].rlid;
                      }


                      var sql = "INSERT INTO alerts (alertmap_id,geography_id, country_id,state_id,domain_id, "+
                                " regulator_id,regulation_id,email,web) VALUES (?,?,?,?,?,?,?,?,?)";
                      var params = [_self.recId,
                                    alertObj[i].gid,
                                    alertObj[i].cntid,
                                    alertObj[i].sid,
                                    alertObj[i].did,
                                    rid,
                                    rlid,
                                    alertFormData.email,
                                    alertFormData.web];

                      console.log(JSON.stringify(params));
                      Alerts.query(sql, params, function(err, result) {
                        if(err) {
                          console.log(err);
                          callback(err);
                        }
                        else
                        {
                            callback();
                        }           
                      });
                   
                  }
                  
            },

        function(callback) {
              console.log("STEP -2: update alert_file table");

                if( alertFormData.filename == undefined )
                     alertFormData.filename = null;
                if( alertFormData.webfilename == undefined )
                    alertFormData.webfilename = null;

                  if( alertFormData.path == undefined )
                     alertFormData.path = null;
                if( alertFormData.webpath == undefined )
                    alertFormData.webpath = null;
            
              var params = [
                        alertFormData.filename,
                        alertFormData.path,
                        alertFormData.recId,
                        alertFormData.webfilename,
                        alertFormData.webpath,
                        alertFormData.recId,
                    ];
              console.log(params);
             var sql = "UPDATE alert_file SET file_name =?,file_path =? where alert_id=? ";
              alert_file.query(sql, params,function(err, result) { 
                     if(err) {
                      console.log(err);
                      callback(err);
                  } else {
                      console.log(result);
                      alerts = result;
                      callback();
                    }
                 
                }); 
            },
        ], function(err) {
            if (err) {
                    console.log(err);
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errAlerts')
                    return res.json(500, { errCode: 'errAlerts' , errMsg: 'Error while updating alert .' });
                else    return res.json(500, { errCode: 500 , errMsg: 'Error while updating alert.' });
            } else {
                Logger.log('debug', 'AlertTypeController.update', 'Alert updated.', null, null);
                    res.status(200).json(200);
        }
        });

  },

  findAlerts:function(req,res){

      var geoId = req.param('geoId');
       var params = [];

      /*
      commented by Louis, as needed to show the alert message from alerts_user table for the logged in user 

        var sql =" SELECT am.message,d.name as domain, g.name as geography, reg.name as regulation, co.name as country,"+
                   " st.name as state, rt.name as regulator,  am.created_date "+                      
                    " FROM domain d, geography g, regulation reg, country co, state st,regulator rt , alerts a, alert_map am "+
                    " WHERE am.id = alertmap_id and g.id=a.geography_id  AND d.id=a.domain_id AND reg.id=a.regulation_id AND "+
                    " co.id = a.country_id AND st.id=a.state_id  AND rt.id = a.regulator_id ";

         var geoClause = " AND a.geography_id=? ";
       var orderByClause = " ORDER BY Date(am.created_date) desc ";
      

        if (geoId == undefined || geoId == 0) {
          sql = sql + orderByClause;     
        } else {
          sql = sql + geoClause + orderByClause;
          params = [geoId];
        }
        */


          var sql =" SELECT au.message,d.name as domain, g.name as geography, reg.name as regulation, "+
                    " co.name as country, st.name as state, rt.name as regulator,  DATE_FORMAT(au.created_date,'%d/%m/%Y') as created_date, au.id  FROM domain d, geography g,"+
                    " regulation reg, country co, state st,regulator rt , alerts_user au  WHERE g.id=au.geography_id "+
                    " AND d.id=au.domain_id AND reg.id=au.regulation_id AND  co.id = au.country_id AND st.id=au.state_id  "+
                    " AND rt.id = au.regulator_id  and au.user_id =? and au.is_archive=0 "

         var geoClause = " AND au.geography_id=? ";
       var orderByClause = " order by DATE(au.created_date) desc ";
      

        if (geoId == undefined || geoId == 0) 
        {
          sql = sql + orderByClause;   
          params = [req.session.user.id];  
        } else {
          sql = sql + geoClause + orderByClause;
          params = [req.session.user.id, geoId];
        }

        console.log(" Alerts query "+sql);
       

           Alerts.query(sql, params, function(err, result) {
          if (err) {
              Logger.log('error', 'AlertTypeController.findAlerts', 'The following error occurred:', null, err);
              return res.json(500, { errCode: 500 , errMsg: 'Error occurred while getting message.' });
          } else {
              Logger.log('debug', 'AlertTypeController.findAlerts', 'Alert List Sent.', result, null);
            //  if( result.length > 0 )
                  // updateUserAlertStatus(req.session.user.id,1);
              return res.json(200, result);
          }
    });    
  },

  destroy : function(req,res){
        var alertFormData = (req.body) ? req.body : undefined;
        console.log("alertFormData");console.log(alertFormData);  

        var sql = "DELETE FROM alert_map WHERE id=?";
        var params = [alertFormData.alert_id];
        console.log("destroy alerts::params");console.log(params);


        AlertMap.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
            Logger.log('error', 'AlertTypeController.destroy', 'The following error occurred:', null, err);
            return res.json({ err: err }, 500);
        } 
        else{
                sql = "DELETE FROM alerts WHERE alertmap_id=?";
                params = [alertFormData.alert_id];

                Alerts.query(sql, params, function (err, result) 
                {
                        if (err) {
                            console.log(err);
                            Logger.log('error', 'AlertTypeController.destroy', 'The following error occurred:', null, err);
                            return res.json({ err: err }, 500);
                        } 
                        else
                        {
                            sql = "DELETE FROM alert_file WHERE alert_id=?";
                            params = [alertFormData.alert_id];

                            Alerts.query(sql, params, function (err, result) 
                            {
                                    if (err) {
                                        console.log(err);
                                        Logger.log('error', 'AlertTypeController.destroy', 'The following error occurred:', null, err);
                                        return res.json({ err: err }, 500);
                                    } 
                                    else
                                    {
                                        return res.json(200, result);
                                    }
                            });
                        }
                });

                    //res.send('success'); 
             // return res.json(200, result);
                                
            }
         });
  },

  findGeoByAlertId : function(req,res){
      console.log('alert :: id :: ' + req.params.id);
      var sql = "select  a.geography_id as id from alerts a,alert_map am, geography g "+
                " where  g.status=true and g.id = a.geography_id and a.alertmap_id = am.id and am.id=? ";

      Geography.query(sql,[req.params.id],function(err, geo) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(geo);
          }
      });
    },

  findAlert: function(req, res){
      console.log('alert for getting name:: id :: ' + req.params.id);
      var sql = "select id,message from alert_map where id = ? ";
      Alerts.query(sql,[req.params.id],function(err, alerts) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);

          } else {
               res.json(alerts);
          }
      });
    },

    findCountryByAlertId : function(req,res){
      console.log('alert :: id :: ' + req.params.id);
     // var sql = "select c.* from alerts a,country c where  c.status=true and c.id = a.country_id and a.id=? ";
      var sql = "select  a.country_id as id from alerts a,alert_map am, country c "+
                " where  c.status=true and c.id = a.country_id and a.alertmap_id = am.id and am.id=? ";

      Country.query(sql,[req.params.id],function(err, country) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(country);
          }
      });
    },

    findStateByAlertId : function(req,res){
      console.log('alert :: id :: ' + req.params.id);
     // var sql = "select s.* from alerts a,state s where  s.status=true and s.id = a.state_id and a.id=? ";

        var sql = "select  a.state_id as id from alerts a,alert_map am, state s "+
                " where  s.status=true and s.id = a.state_id and a.alertmap_id = am.id and am.id=? ";


      State.query(sql,[req.params.id],function(err, state) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(state);
          }
      });
    },

    findDomainByAlertId : function(req,res){
      console.log('alert :: id :: ' + req.params.id);
     // var sql = "select d.* from alerts a,domain d where  d.status=true and d.id = a.domain_id and a.id=? ";

      var sql = "select  a.domain_id as id from alerts a,alert_map am, domain d "+
                " where  d.status=true and d.id = a.domain_id and a.alertmap_id = am.id and am.id=? ";


      Domain.query(sql,[req.params.id],function(err, domain) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(domain);
          }
      });
    },

    findRegulatorByAlertId : function(req,res){
      console.log('alert :: id :: ' + req.params.id);
     // var sql = "select r.* from alerts a,regulator r where  r.status=true and r.id = a.regulator_id and a.id=? ";

      var sql = "select  a.regulator_id as id from alerts a,alert_map am, regulator r "+
            " where  r.status=true and r.id = a.regulator_id and a.alertmap_id = am.id and am.id=? ";


      Regulator.query(sql,[req.params.id],function(err, regulator) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(regulator);
          }
      });
    },

    findRegulationByAlertId : function(req,res){
      console.log('alert :: id :: ' + req.params.id);
    //  var sql = "select reg.* from alerts a,regulation reg where  reg.status=true and reg.id = a.regulation_id and a.id=? ";

        var sql = "select  a.regulation_id as id from alerts a,alert_map am, regulation r "+
            " where  r.status=true and r.id = a.regulation_id and a.alertmap_id = am.id and am.id=? ";


      Regulation.query(sql,[req.params.id],function(err, regulation) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(regulation);
          }
      });


    },

    findalertbygeo:function(req,res){
      var userConfig = req.session.userConfig;
      var regulationData = {};
      var geoList = {};
      async.series([
       //find geo from geogeography master table
        function(callback) {
            var sql = "SELECT id, name FROM geography where status=true";
 
             if (!userConfig.full) {
               sql = "SELECT distinct g.id, g.name FROM subscription s, subscription_detail sd, geography g " + 
                   " WHERE g.status = 1 and s.id=sd.subscription_id AND s.user_id=? and sd.geography_id = g.id";
 
             }
      
      console.log(" geography list "+sql);
 
            var params = [];
            User.query(sql, params, function(err, result) {  
                if (err) {
                  Logger.log('error', 'AlertTypeController.findalertbygeo', 'STEP-0: geography :The following error occurred:', null, err);
                  callback(err);
                } else {                                             
                  regulationData.geoCollection = result;                 
                  callback();
                }            
            });             
          },        
        
        //find countries
        function(callback) {
        
        var sql ="SELECT  c.id as cntid,c.name as name,g.id as gid "+
                " FROM country c,geography g where c.status = 1 and g.status=true and g.id = c.geo_id ";
 
 
          if (!userConfig.full) {
            sql = "SELECT distinct c.id as cntid,c.name as name,g.id as gid "+
                   " FROM subscription s, subscription_detail sd, geography g, country c " + 
                 " WHERE s.id=sd.subscription_id AND s.user_id=? and sd.geography_id = g.id and g.status=true and c.status = true";
 
          }
        var params = [];      
        Regulation.query(sql, params, function(err, result) {
                if (err) {
                  Logger.log('error', 'AlertTypeController.findalertbygeo', 'step 1 countries :The following error occurred:', null, err);
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
        //find state
        function(callback) {
      
        var sql =" SELECT  s.id as sid,s.name as name, s.country_id as cntid, g.id as gid "+
                 " FROM geography g, country c,state s"+
                   " where g.status = true and c.status = true and s.status = true and c.id = s.country_id and s.geography_id = g.id" ;
 
 
          if (!userConfig.full) {
            sql = "SELECT distinct s.id as sid,s.name as name, s.country_id as cntid, s.geography_id as gid  "+
                   " FROM subscription s, subscription_detail sd, country c ,state s" + 
                 " WHERE s.id=sd.subscription_id AND s.user_id=? and  "+
                 " sd.country_id = c.id and sd.state_id = s.id and s.status = true and c.status = true";
          
          }
        var params = [];      
        Regulation.query(sql, params, function(err, result) {
                if (err) {
                  Logger.log('error', 'AlertTypeController.findalertbygeo', 'step 2 state :The following error occurred:', null, err);
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
        // find domains
        function(callback) {
 
           var sql = "SELECT  d.id as did ,d.name, d.description,"+
            " gd.geography_id as gid, gd.country_id as cntid, gd.state_id as sid, gd.domain_id as did"+
          " FROM domain d, geography_domain_link gd  "+
          " where d.status = true "+
          " and  d.id = gd.domain_id";
 
    
          var params = [];
          if (!userConfig.full) {
            sql = "SELECT distinct d.id as did ,d.name, d.description, "+
             " sd.geography_id as gid, sd.country_id as cntid, sd.state_id as sid "+
          " FROM domain d, subscription s, subscription_detail sd, user u "+
          " WHERE d.status = 1 and u.id=s.user_id and s.id=sd.subscription_id and d.id = sd.domain_id and  u.id=?";   
          params = [req.session.user.id];
          }
          
        Regulation.query(sql, params, function(err, result) {
                if (err) {
                  Logger.log('error', 'AlertTypeController.findalertbygeo', 'step 3 domain:The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.domainCollection = result;
                    callback();
                  } else {
                    regulationData.domainCollection = [];
                    callback();
                  }
          }
        });               
 
        },
        
            // find regulator
        function(callback){
 
          var sql = " select distinct rdl.regulator_id as rid, rdl.geography_id as gid, rdl.country_id as cntid, rdl.state_id as sid, "+
                " rdl.domain_id as did, r.name as name"+
                  " from regulation_document_link rdl, regulator r "+
                  " where r.id = rdl.regulator_id and r.status = true";
 
          var params = [];
            if (!userConfig.full) 
            {
 
              sql = "select distinct rdl.regulator_id as rid, rdl.geography_id as gid, rdl.country_id as cntid, rdl.state_id as sid, "+
                    " rdl.domain_id as did, r.name as name "+
                  " from regulation_document_link rdl, regulator r, user u, subscription_detail sd, subscription s "+
                  " where r.id = rdl.regulator_id and r.status = true "+
                  " and u.id = s.user_id and  s.id = sd.subscription_id "+
                  " and sd.regulation_id = rdl.regulation_id and u.id = ?";
 
               params = [req.session.user.id];
            }
 
               Regulation.query(sql,params,function(err,result){
                 if (err) {
                    Logger.log('error', 'RAlertTypeController.findalertbygeo', 'step 4:regulatorThe following error occurred:', null, err);
                    callback(err);               
                  }
                  else{
                    regulationData.regulatorCollection = result;
                    callback();
                  }
               });    
        },
        //find Regulations
        function(callback) {
          
   
 
        var sql = "SELECT DISTINCT r.id as rlid, r.name as name, rdl.geography_id as gid, rdl.country_id as cntid, "+
            " rdl.state_id as sid, rdl.domain_id  as did, rdl.regulator_id as rid  "+
            " FROM regulation_document_link rdl,regulation r "+
            " WHERE r.id = rdl.regulation_id and r.status = true; ";
 
          if (userConfig.full) {
          var params = [];      
          Regulation.query(sql, params, function(err, result) {
                  if (err) {
                    Logger.log('error', 'AlertTypeController.findalertbygeo', 'step 5:regulations:The following error occurred:', null, err);
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
 
        
                var sqld ="select distinct rdl.regulation_id as rlid, rdl.geography_id as gid, rdl.country_id as cntid, "+
                          " rdl.state_id as sid, rdl.domain_id as did, r.name as name "+
                        " from regulation_document_link rdl, regulation r, user u, subscription_detail sd, subscription s "+
                        " where r.id = rdl.regulation_id and r.status = true "+
                        " and u.id = s.user_id and  s.id = sd.subscription_id "+
                      " and sd.regulation_id = rdl.regulation_id and u.id = ?";
 
 
            var params = [req.session.user.id];
          Regulation.query(sqld, params, function(err, result) {
                  if (err) {
                    Logger.log('error', 'AlertTypeController.findalertbygeo', 'The following error occurred:', null, err);
                    callback(err);               
                  } else {          
                    if (result.length > 0) {
                  var domainInClause = "";
                  var regInClause = "";
                  result.forEach(function(item, index) {
                    if (index == 0) {
                      domainInClause = item.domain_id;
                      regInClause = item.regulation_id; 
                    } else {
                      domainInClause = domainInClause + "," + item.domain_id;
                      regInClause = regInClause + "," + item.regulation_id;
                    }
                  });
                  sql = sql + " AND rdl.domain_id IN (" + domainInClause + ") " +
                        " AND r.id IN (" + regInClause + ")";                                       
                var params = [];      
                Regulation.query(sql, params, function(err, regs) {
                        if (err) {
                          Logger.log('error', 'AlertTypeController.findalertbygeo', 'step 5:regulations:The following error occurred:', null, err);
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
                Logger.log('debug', 'AlertTypeController.findalertbygeo', 'RegulationData Sent.', regulationData, null);
                return res.json(200, regulationData);
            }
      });
  },

  getUserAlertCount:function(req,res){

      var geoId = req.param('geoId');
       var params = [];

   

      var sql = "select count(au.id) as cnt from alerts_user au where au.status = 0 and au.is_archive=0 and au.geography_id IS NOT NULL and au.user_id = ?";

         var geoClause = " AND au.geography_id=? ";
       var orderByClause = " ORDER BY au.created_date desc ";
      

        if (geoId == undefined || geoId == 0) 
        {
          sql = sql + orderByClause;   
          params = [req.session.user.id];  
        } else {
          sql = sql + geoClause + orderByClause;
          params = [req.session.user.id, geoId];
        }

        console.log(" Alerts query "+sql);
       

           AlertsUser.query(sql, params, function(err, result) {
          if (err) {
              Logger.log('error', 'AlertTypeController.getUserAlertCount', 'The following error occurred:', null, err);
              return res.json(500, { errCode: 500 , errMsg: 'Error occurred while getting message.' });
          } else {
              Logger.log('debug', 'AlertTypeController.getUserAlertCount', 'Alert List Sent.', result, null);
              return res.json(200, {alertCount:result[0].cnt});
          }
    });    
  },

   updateUserAlertStatus :function(req,res)
    {
      try
      {

       
            var userData = (req.body) ? req.body : undefined;
            console.log("Status >>>>>>>>>>>>>>>>>>>>> "+JSON.stringify(userData));
         
           var sql = " update alerts_user set status =? where user_id =?";

                     console.log(sql);

            var params=[userData.status,req.session.user.id];

             AlertsUser.query(sql, params, function(err, result) 
            {
                 if (err) {
              Logger.log('error', 'AlertTypeController.updateUserAlertStatus', 'The following error occurred:', null, err);
              return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating status of alert.' });
          } else {
              Logger.log('debug', 'AlertTypeController.updateUserAlertStatus', 'Alert List status update.', result, null);
              return res.json(200);
          }
               
            });
      }
      catch(exception)
      {
        console.log(exception.message);
        return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating status of alert.' });
      }
          
     },

    archiveAll : function(req, res){
        console.log("archive all alerts");

        var sql = "update alerts_user set is_archive =1 where is_archive=0 and user_id = ?";

        params = [req.session.user.id];  

        AlertsUser.query(sql,params, function(err, result) 
            {
              if (err) {
                Logger.log('error', 'AlertTypeController.archiveAll', 'The following error occurred:', null, err);
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating archive of alert.' });
              } else {
                Logger.log('debug', 'AlertTypeController.archiveAll', 'Alert List status update.', result, null);
                return res.json(200);
              }
               
        });
    },

    findAlertArchive:function(req,res){

      var geoId = req.param('geoId');
       var params = [];

          var sql =" SELECT au.message,d.name as domain, g.name as geography, reg.name as regulation, "+
                    " co.name as country, st.name as state, rt.name as regulator, DATE_FORMAT(au.created_date,'%d/%m/%Y') as created_date  FROM domain d, geography g,"+
                    " regulation reg, country co, state st,regulator rt , alerts_user au  WHERE g.id=au.geography_id "+
                    " AND d.id=au.domain_id AND reg.id=au.regulation_id AND  co.id = au.country_id AND st.id=au.state_id  "+
                    " AND rt.id = au.regulator_id  and au.user_id =? and au.is_archive =1"

         var geoClause = " AND au.geography_id=? ";
       var orderByClause = " order by DATE(au.created_date) desc ";
      

        if (geoId == undefined || geoId == 0) 
        {
          sql = sql + orderByClause;   
          params = [req.session.user.id];  
        } else {
          sql = sql + geoClause + orderByClause;
          params = [req.session.user.id, geoId];
        }

        console.log(" Alerts query "+sql);
       

           Alerts.query(sql, params, function(err, result) {
          if (err) {
              Logger.log('error', 'AlertTypeController.findAlertArchive', 'The following error occurred:', null, err);
              return res.json(500, { errCode: 500 , errMsg: 'Error occurred while getting message.' });
          } else {
              Logger.log('debug', 'AlertTypeController.findAlertArchive', 'Alert List Sent.', result, null);
            //  if( result.length > 0 )
                  // updateUserAlertStatus(req.session.user.id,1);
              return res.json(200, result);
          }
    });    
  },

  archive: function(req, res){
    console.log("alertFormData");
    // var postData = (req.body) ? req.body : undefined;
    var alert_id = req.params.alert_id;
        console.log("alert_id");console.log(alert_id);  

        var sql = "update alerts_user set is_archive =1 where id=? ";
        var params = [alert_id];
        console.log("destroy alerts::params");console.log(params);

        AlertsUser.query(sql,params, function(err, result) 
            {
              if (err) {
                Logger.log('error', 'AlertTypeController.archive', 'The following error occurred:', null, err);
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating archive of alert.' });
              } else {
                Logger.log('debug', 'AlertTypeController.archive', 'Alert List status update.', result, null);
                return res.json(200);
              }
               
        });
  },

  findDAlert: function(req, res){
    var sql = "SELECT id, message FROM alerts_user where status = 0 and is_archive = 0 and user_id = ? ";
     var params = [req.session.user.id];
      Alerts.query(sql, params,function(err, alerts) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master DAlerts");
                console.log(alerts);
                res.json(alerts);
            }
        });
  },

    updateDate: function(req, res){
    console.log("updateDate");
    // var postData = (req.body) ? req.body : undefined;
    var fromDate = req.param('fromDate');
    console.log("fromDate");
    console.log(fromDate); 

    var toDate = req.param('toDate');
    console.log("toDate");
    console.log(toDate);


        var sql = "SELECT distinct au.message,d.name as domain, g.name as geography, reg.name as regulation, "+ 
                    " co.name as country, st.name as state, rt.name as regulator,  DATE_FORMAT(au.created_date,'%d/%m/%Y') as created_date FROM domain d, geography g,"+
                    " regulation reg, country co, state st,regulator rt , alerts_user au  WHERE g.id=au.geography_id "+
                    " AND d.id=au.domain_id AND reg.id=au.regulation_id AND  co.id = au.country_id AND st.id=au.state_id  "+
                    " AND rt.id = au.regulator_id and au.is_archive =1 AND date(au.created_date) BETWEEN ? AND ? AND au.user_id = ?";
        
        console.log("sql ::" + sql);
        var params = [fromDate,toDate,req.session.user.id];
        console.log("destroy alerts::params");console.log(params);

        AlertsUser.query(sql,params, function(err, result)
            {
              if (err) {
                Logger.log('error', 'AlertTypeController.updateDate', 'The following error occurred:', null, err);
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating archive of alert.' });
              } else {
                Logger.log('debug', 'AlertTypeController.updateDate', 'Alert List status update.', result, null);
                return res.json(result);
              }
              
        });
  }
  
}
