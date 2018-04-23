var passport = require('passport');
var redis = require('redis');
var port = process.env.REDIS_PORT || 6379;  
var host = process.env.REDIS_HOST || '127.0.0.1';
var client = redis.createClient();

   

module.exports = {
    _config: {
        // actions: false,
        shortcuts: false,
        rest: false
    },  

    locallogin: function(req, res) {
            
      passport.authenticate('local', function(err, user, info) {
        if ((err) || (!user)) {            
            return res.view('login',{message: info.message});
        }

        req.logIn(user, function(err) {
          if (err) {
            return res.view('login',{message: info.message});
          } else {            
                console.log("inthe login section");
                client.keys('sess*', function(err,value){
                          if (err) return console.log(err);
                          console.log("From the clientkeys", value.length);

                          async.forEachOf(value, function(item, key, callback){
                            if (err) {
                              console.log(err);
                              callback(err);    
                            } else {
                              console.log("after Ist sync", item, key )
                               var iteration_level=item;
                                  client.get(item, function(err, value2){
                                          //return an array of objects according to key, value, or key and value matching
                                          function getObjects(obj, key, val) {
                                              var objects = [];
                                              for (var i in obj) {
                                                if (!obj.hasOwnProperty(i)) continue;
                                                if (typeof obj[i] == 'object') {
                                                      objects = objects.concat(getObjects(obj[i], key, val));    
                                                }   
                                                  //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                                                if (i == key && obj[i] == val || i == key && val == '') { //
                                                    objects.push(obj);
                                                } else if (obj[i] == val && key == ''){
                                                    //only add if the object is not already in the array
                                                    if (objects.lastIndexOf(obj) == -1){
                                                        objects.push(obj);
                                                    }
                                                }
                                                //}
                                              }
                                              return objects;
                                          }

                                          var js = JSON.parse(value2);
                                          if(getObjects(js,'email_id', user.email_id).length !==0){
                                            console.log("value iteration", iteration_level);
                                            client.del(iteration_level);
                                            console.log("got it");
                                            callback();
                                          } else {
                                            callback();
                                          }
                                        
                                  });                                
                      }

                      }, function(err){
                        if (err) {                
                          return res.json(500, { errCode: 500 , errMsg: 'Error occurred while login.' });
                        } else {
                          console.log("success login", user);
                           req.session.user = user;
                                    if (user.role_id == sails.config.globalmodels.SUPERADMIN || user.role_id == sails.config.globalmodels.ADMIN) {
                                      console.log('from adminDashboard');
                                      return res.redirect('/adminDashboard');
                                    } else if (user.role_id == sails.config.globalmodels.CLIENT) {
                                      console.log('from userDashboard0');
                                      return res.redirect('/userDashboard');
                                    } else  {
                                       
                                      // return res.redirect('/adminDashboard');
                                    } 
                          //return res.json(200,{ message:"success"});
                        }
                      });
      }); }
      })
      })(req, res);
           

  },

    logout: function(req, res) {
      req.session.destroy();
      console.log("FRom the logout section");
      Logger.log('debug', 'AuthController.logout', 'User loggedout.', null, null);
      req.logout(); 

      return res.redirect('/');
    },

    redirectToLogin: function(req, res) {
      Logger.log('debug', 'AuthController.redirectToLogin', 'User redirectToLogin.', null, null);
      return res.view('login',{message: 'Your session expired, Please Login again!'});
    }

};

