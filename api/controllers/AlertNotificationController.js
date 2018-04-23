module.exports = {


 send: function(req, res) 
 {
    try
    {
      this.sendAlerts(req,res);
    }
    catch(exception)
    {
      console.log(exception.message);
        return res.json(500, { errCode: 500 , errMsg: 'Internal server server , contact Administrator.' });
    }

 },

  
   sendAlerts: function(req, res) 
   {
      _self = this,
    console.log('create');
      var alertFormData = (req.body) ? req.body : undefined;
       console.log('create',alertFormData);
      var alerts = {};
      var userid={};
      var subscriptionid={};
      var userdetails={};
      var usermail = {};
      var baseWebPath =  '/../../views/emailTemplates/web';
      var baseEmailPath =  '/../../views/emailTemplates/Email';

      var fullUsers={};

      var alertMap_id = alertFormData.alertMapId;

      var geography_id = alertFormData.geography_id, 
          domain_id    = alertFormData.domain_id, 
          regulation_id= alertFormData.id,  
          country_id = alertFormData.country_id,
          state_id = alertFormData.state_id,
          regulation_id = alertFormData.regulation_id;
          regulator_id = alertFormData.regulator_id;
          alertText = alertFormData.alertText;
          emailpath = alertFormData.emailpath;
          email  = alertFormData.email;
          web = alertFormData.web;

          console.log("alertText",alertText);
          console.log(geography_id + country_id + domain_id + regulation_id + state_id);
          console.log(emailpath);
          console.log("testing email::::" + alertFormData.email);

           var emailPath = "";
           var webPath ="";
      
          if(email == undefined || email == ""){
              emailPath= '/../../views/emailTemplates/welcomeEmail/email';
              console.log(emailPath);
          }else {
              emailPath = '/../../views/emailTemplates/Email'
              console.log(emailPath);
          }

          if(web == undefined || web == ""){
             webPath = '/../../views/emailTemplates/welcomeEmail/web';
              console.log(webPath);
          }else {
              webPath = baseWebPath;
              console.log(webPath);
          }
         
                
        async.series([

        function(callback) 
        {

          var params=[];

          var sql = " select u.id as userid, u.user_name,u. email_id "+
                    " from user u, user_role ur, role r, permission p, user_permission up "+  
                    " where u.id = ur.user_id and ur.role_id = r.id and r.id = 3 "+
                    " and up.user_id = u.id and up.permission_id = p.id and p.permission = 'full' and u.is_active = true;";

          console.log("***********  sql "+sql);

              User.query(sql, params, function(err, result) 
              {
                  if (err) 
                  {
                    Logger.log('error', 'AlertNotificationController.send', 'The following error occurred:', null, err);
                    callback(err);
                  } 
                  else 
                  {
                      fullUsers =result ;
                      callback();
                  }
                }); 
          },
       
          
        function(callback) 
        {

          

          var sql = " select distinct u.id as userid, u.email_id, u.user_name, sd.email, sd.web, af.file_path, "+
                    " a.geography_id, a.country_id, a.state_id, a.domain_id, a.regulator_id, a.regulation_id,"+
                    "  sd.web, sd.sms, sd.email "+
                    " from user u,  "+
                    " subscription s,  "+
                    " subscription_detail sd, "+
                    " regulation_document_link rdl, "+
                    " alerts a, alert_map am, alert_file af  "+
                    "  where u.id = s.user_id   "+
                    " and u.is_active = true  "+
                    " and sd.subscription_id = s.id "+ 
                    " and a.geography_id = sd.geography_id  "+
                    " and a.country_id = sd.country_id  "+
                    " and a.state_id = sd.state_id   "+ 
                    " and a.domain_id = sd.domain_id  "+
                    " and a.alertmap_id = am.id  "+ 
                    " and am.id = af.alert_id  "+
                    " and am.id = ?";

          console.log("***********  sql "+sql + alertMap_id);


          var params =[alertMap_id];

            if(regulator_id != undefined && regulator_id != "")
             {
                sql += " and a.regulation_id = sd.regulation_id ";
             }  

              console.log("***********  sql "+sql + alertMap_id);

             console.log("params user",params);
              User.query(sql, params, function(err, result) 
              {
                  if (err) 
                  {
                    Logger.log('error', 'AlertNotificationController.send', 'The following error occurred:', null, err);
                    callback(err);
                  } 
                  else 
                  {
                      userdetails =result ;
                      console.log("userdetails",userdetails);
                      result.forEach(function(item)
                      {
                        usermail = item;
                        console.log("")
                         if( item.email == 1)
                         {
                            if( item.file_path != undefined && item.file_path != "")
                              emailPath = baseEmailPath + item.file_path;

                            console.log("Send mail from path "+emailPath)

                            Mailer.sendalertMail(usermail,alertText,emailPath); // path added for test purpose
                         }
                        if( item.web == 1)
                        {
                           if( item.file_path != undefined && item.file_path != "")
                              webPath = baseWebPath + item.file_path;

                            console.log("Send web mail from path "+webPath)
                              _self.writeUserAlerts(item,alertText);

                     //     Mailer.sendalertMail(usermail,alertText,webPath); // path added for test purpose
                        }

      
                        

                      });
                     
                  }
                }); 
              if( fullUsers.length > 0 )
                        {
                           fullUsers.forEach( function(fitem)
                           {  
                            usermail = fitem;
                              fitem.userid = fitem.userid;
                               Mailer.sendalertMail(usermail,alertText,emailPath); // path added for test purpose
                                fitem.geography_id = alertFormData.geography_id, 
                                fitem.domain_id    = alertFormData.domain_id, 
                                fitem.country_id = alertFormData.country_id,
                                fitem.state_id = alertFormData.state_id,
                                fitem.regulation_id = alertFormData.regulation_id;
                                fitem.regulator_id = alertFormData.regulator_id;
                                       
                            //   Mailer.sendalertMail(usermail,alertText,webPath); // path added for test purpose
                              _self.writeUserAlerts(fitem,alertText);
                           });
                        }

                         console.log("usermail",usermail);
                      console.log("usermail",usermail.email_id);

                      callback();
 
      },

                             
      ], function(err) {
            if (err) {
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errdata') 
                  return res.json(500, { errCode: 'errEmail' , errMsg: 'alerts error.' });
                else
                  return res.json(500, { errCode: 500 , errMsg: '' });
            } else {
               // Mailer.sendalertMail(usermail,alertText,path); // path added for test purpose
                Logger.log('debug', 'AlertNotificationController.send', 'alert data inserted.', null, null);
                res.status(200).json(200);
            }
      });
    },

    writeUserAlerts :function(data,alertText)
    {
      try
      {
       
            var rid = null;
            var rlid = null;

            if( data.regulator_id != undefined )
                rid = data.regulator_id;

             if( data.regulation_id != undefined )
                rlid = data.regulation_id;

           var sql = " insert into alerts_user (user_id, message,"+
                      " geography_id,country_id,state_id, domain_id,"+
                      " regulator_id,regulation_id,status,created_date )"+
                     " values (?,?,"+
                     " ?,?,"+
                     " ?,?,"+
                     " ?,?,0,now())";

                     console.log(sql);
                     console.log("data ::", data);

            var params=[data.userid,alertText, data.geography_id, 
                        data.country_id, data.state_id, 
                        data.domain_id, data.regulator_id, 
                        data.regulation_id];
            console.log("params :::", params);
             AlertsUser.query(sql, params, function(err, result) 
            {
                if (err) {
                  Logger.log('error', 'AlertNotificationController.get', 'The following error occurred:', null, err);
                  return false;
                } 
                else
                {
                  return true;
                }
               
            });
      }
      catch(exception)
      {
        console.log(exception.message);
        return false;
      }
          
     },

     destroyAlertUser : function(req, res){
      _self = this,
      console.log('delete');
        var alertFormData = (req.body) ? req.body : undefined;
        message = alertFormData.message;
        var fullUsers={};
         var usermail = {};



         async.series([

        function(callback) 
        {

          var params=[];

          var sql = " select u.id as userid"+
                    " from user u, user_role ur, role r, permission p, user_permission up "+  
                    " where u.id = ur.user_id and ur.role_id = r.id and r.id = 3 "+
                    " and up.user_id = u.id and up.permission_id = p.id and p.permission = 'full' and u.is_active = true;";

          console.log("***********  sql "+sql);

              User.query(sql, params, function(err, result) 
              {
                  if (err) 
                  {
                    Logger.log('error', 'AlertNotificationController.send', 'The following error occurred:', null, err);
                    callback(err);
                  } 
                  else 
                  {
                      fullUsers =result ;
                      if( fullUsers.length > 0 )
                        {
                           fullUsers.forEach( function(fitem)
                           {  
                            usermail = fitem;
                              fitem.userid = fitem.userid;
                              _self.deleteUserAlerts(fitem, message); 
                           });
                        }
                      callback();
                  }
                }); 
          },

        
       ], function(err) {
            if (err) {
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errdata') 
                  return res.json(500, { errCode: 'errEmail' , errMsg: 'alerts error.' });
                else
                  return res.json(500, { errCode: 500 , errMsg: '' });
            } else {
               // Mailer.sendalertMail(usermail,alertText,path); // path added for test purpose
                Logger.log('debug', 'AlertNotificationController.destroyAlertUser', 'alert data inserted.', null, null);
                res.status(200).json(200);
            }
      });
     },


    deleteUserAlerts: function(data, message,req, res){
          var sql = "DELETE FROM alerts_user WHERE user_id=? and message=?";
          console.log(message);
          console.log(data.userid);
          var params = [data.userid,message];
          console.log("destroy alerts22::params");console.log(params);
          AlertsUser.query(sql, params, function (err, result) {
          if (err) {
              console.log(err);
              Logger.log('error', 'AlertTypeController.destroy', 'The following error occurred:', null, err);
              return false;
          } 
          else{
            return true;

          }
        });
       
    }

}