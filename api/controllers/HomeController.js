/**
 * HomeController.js
 *
 * @description ::
 */

module.exports = {

  adminDashboard: function(req, res) {
    if (req.session.user.role_id == sails.config.globalmodels.SUPERADMIN || req.session.user.role_id == sails.config.globalmodels.ADMIN) {
      //populate dashboardModel which will be used by Dust Engine to render admin-dashboard.dust 
      var dashboardModel = {user_name: req.session.user.user_name , profile_image_link: req.session.user.profile_image_link};
      var geoList={};
      async.series([
        function(callback) {
          // ....................geography list..........
          var sql = "SELECT id, name FROM geography where status=true";
          var params = [];
          User.query(sql, params, function(err, result) {  
            if (err) {
              Logger.log('error', 'HomeController.adminDashboard', 'The following error occurred:', null, err);
              callback(err);
            } else {                              
              geoList = result; 
              Logger.log('debug', 'HomeController.adminDashboard', 'geographyList!!', result, null);
              callback();
            }            
          });           
        },

        function(callback) {
          if (new String(req.session.user.company_name).valueOf() == new String('zurik').valueOf()) {
            dashboardModel['isZurik'] = true;  
          } else {
            dashboardModel['isZurik'] = false;  
          }      
          var sql = "SELECT p.permission, p.permission_type FROM permission p, user_permission up " + 
                    " WHERE p.id=up.permission_id AND up.user_id=? ";
          var params = [req.session.user.id];
          User.query(sql, params, function(err, result) {
            if (err) {
              Logger.log('error', 'HomeController.adminDashboard', 'The following error occurred:', null, err);
              return res.json(500, { errCode: 500 , errMsg: '' });          
            } else {

                if (result.length > 0) {
                  //set permissions for logged in user
                  result.forEach(function(item) {                
                    if (new String(item.permission_type).valueOf() == new String('operation').valueOf()) {
                      dashboardModel[item.permission] = true;
                    } else {
                      switch (item.permission) {
                        case 'createAdmin':
                          dashboardModel['createAdmin'] = true;
                          break;
                        case 'createUser':
                          dashboardModel['createAdmin'] = false;
                          break;                      
                        case 'paid':
                          dashboardModel['paid'] = true;
                          break;
                        case 'free':
                          dashboardModel['paid'] = false;
                          break;                      
                        case 'full':
                          dashboardModel['full'] = true;
                          break;
                        case 'restricted':
                          dashboardModel['full'] = false;
                          break;                                                            
                      }
                    }
                  });
                }

              //set allowed geographies for logged in user
              if (dashboardModel.full) {
                geoList.forEach(function(item) {
                  var geoName = item.name.toLowerCase();
                    dashboardModel[geoName] = true;
                });
                callback();                            
              } else {
                //get the allowed Geos from subscripttion table.
               // var sql = "SELECT id, access_geo FROM subscription WHERE user_id=?";
                 var sql  = " SELECT distinct s.id, g.name as access_geo FROM subscription s, subscription_detail sd, geography g " +
                          " WHERE s.id = sd.subscription_id and " +
                           " g.id = sd.geography_id and s.user_id=?";
                var params = [req.session.user.id];

                console.log("User id checking " , req.session.user.id);
                User.query(sql, params, function(err, result) {
                  if (err) {
                    Logger.log('error', 'HomeController.adminDashboard', 'The following error occurred:', null, err);
                    // return res.json(500, { errCode: 500 , errMsg: '' });
                    callback(err); 
                  } else {
                    if (result.length > 0) {
                      var accessGeos = result;
                      console.log(" User geo checking +++++++++++++++++++++++++++++++++" , JSON.stringify(accessGeos));
                        accessGeos.forEach(function(item) {
                      
                        var geoName = item.access_geo.toLowerCase();
                        dashboardModel[geoName] = true; 

                        var subscription_id = item.id;
                        dashboardModel[subscription_id];

                      });
                    }
                    callback();                
                  }
                });              

              }
              
            }        
          });          
        },

      ], function(err) {
        if (err) {
          Logger.log('error', 'HomeController.adminDashboard', 'The following error occurred:', null, err);
          return res.json({ err: err }, 500);
        } else {
          Logger.log('debug', 'HomeController.adminDashboard', 'userConfig stored in session::', dashboardModel, null);
          //set the user specific data in session
          req.session.userConfig = dashboardModel;
          return res.view('homepage', dashboardModel);  
        }
      });
    } else {
        return res.redirect('/');
    }      
  },


  userDashboard: function(req, res) {
    if (req.session.user.role_id == sails.config.globalmodels.CLIENT) {
      //populate dashboardModel which will be used by Dust Engine to render admin-dashboard.dust 
      var dashboardModel = {user_name: req.session.user.user_name,profile_image_link: req.session.user.profile_image_link};
      var geoList={};
      async.series([
        function(callback) {
          // ....................geography list..........
          var sql = "SELECT id, name FROM geography where status=true";
          var params = [];
          User.query(sql, params, function(err, result) {                 
            if (err) {
              Logger.log('error', 'HomeController.adminDashboard', 'The following error occurred:', null, err);
              callback(err);
            } else {                              
              geoList = result; 
              Logger.log('debug', 'HomeController.adminDashboard', 'geographyList!!', result, null);
              callback();
            }              
          });           
        },

        function(callback) {
          if (new String(req.session.user.company_name).valueOf() == new String('zurik').valueOf()) {
            dashboardModel['isZurik'] = true;  
          } else {
            dashboardModel['isZurik'] = false;  
          }      
          var sql = "SELECT p.permission, p.permission_type FROM permission p, user_permission up " + 
                    " WHERE p.id=up.permission_id AND up.user_id=? ";
          var params = [req.session.user.id];
          User.query(sql, params, function(err, result) {
            if (err) {
              Logger.log('error', 'HomeController.adminDashboard', 'The following error occurred:', null, err);
              return res.json(500, { errCode: 500 , errMsg: '' });          
            } else {
                if (result.length > 0) {
                  //set permissions for logged in user
                  result.forEach(function(item) {                
                    if (new String(item.permission_type).valueOf() == new String('operation').valueOf()) {
                      dashboardModel[item.permission] = true;
                    } else {
                      switch (item.permission) {
                        case 'createAdmin':
                          dashboardModel['createAdmin'] = true;
                          break;
                        case 'createUser':
                          dashboardModel['createAdmin'] = false;
                          break;                      
                        case 'paid':
                          dashboardModel['paid'] = true;
                          break;
                        case 'free':
                          dashboardModel['paid'] = false;
                          break;                      
                        case 'full':
                          dashboardModel['full'] = true;
                          break;
                        case 'restricted':
                          dashboardModel['full'] = false;
                          break;                                                            
                      }
                    }
                  });
                }
              //set allowed geographies for logged in user
              if (dashboardModel.full) {
                geoList.forEach(function(item) {
                  var geoName = item.name.toLowerCase();
                    dashboardModel[geoName] = true;
                });
                callback();                            
              } else {
                //get the allowed Geos from subscripttion table.
               // var sql = "SELECT id, access_geo FROM subscription WHERE user_id=?";

               var sql  = " SELECT s.id, g.name as access_geo FROM subscription s, subscription_detail sd, geography g " +
                          " WHERE s.id = sd.subscription_id and " +
                           " g.id = sd.geography_id and s.user_id=?";
                var params = [req.session.user.id];
                User.query(sql, params, function(err, result) {
                  if (err) {
                    Logger.log('error', 'HomeController.adminDashboard', 'The following error occurred:', null, err);
                    // return res.json(500, { errCode: 500 , errMsg: '' });
                    callback(err); 
                  } else {
                    if (result.length > 0) {

                      var accessGeos = result;
                      console.log(" User geo checking" , JSON.stringify(accessGeos));
                      accessGeos.forEach(function(item) {

                      var geoName = item.access_geo.toLowerCase();
                      dashboardModel[geoName] = true; 

                      var subscription_id = item.id;
                      dashboardModel[subscription_id];


                    });
                    }
                    callback();                
                  }
                });              
              }
              
            }        
          });          
        },

         function(callback) {
          // ....................geography list..........
          var sql = "select count(id) as cnt from alerts_user where status = 0 and is_archive=0 and geography_id IS NOT NULL and user_id = ?";
          var params = [req.session.user.id];
          AlertsUser.query(sql, params, function(err, result) {  
            if (err) {
              Logger.log('error', 'HomeController.userDashboard', 'The following error occurred:', null, err);
              callback(err);
            } else { 
              if( result[0].cnt> 0 )
               dashboardModel['alertCount'] = result[0].cnt;     
              else
                dashboardModel['alertCount'] = '';     
               console.log(" ************************************** alerts count ",result);
               Logger.log('debug', 'HomeController.userDashboard', 'geographyList!!', result, null);
              callback();
            }            
          });           
        },

      ], function(err) {
        if (err) {
          Logger.log('error', 'HomeController.userDashboard', 'The following error occurred:', null, err);
          return res.json({ err: err }, 500);
        } else {
          Logger.log('debug', 'HomeController.userDashboard', 'userConfig stored in session::', dashboardModel, null);
          //set the user specific data in session
          req.session.userConfig = dashboardModel;
          return res.view('user-dashboard', dashboardModel);
        }
      });

    } else {
      return res.redirect('/');
    }      
  },

};
