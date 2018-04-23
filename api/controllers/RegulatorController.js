module.exports = {

    find: function(req, res){
     
       var userConfig = req.session.userConfig;
      	if (userConfig.full) {
       		sql = " SELECT " +
                  " distinct g.id as id, g.name as name, g.description as description " +
                  "  FROM regulator g " +
                  "  WHERE g.status = true" ; 
            var params = [];         	
      	} else {
       		sql = " SELECT " +
                  " distinct g.id as id, g.name as name, g.description as description " +
                  "  FROM regulator g, subscription s, subscription_detail sd, user u " +
                  " WHERE u.id=s.user_id and s.id=sd.subscription_id and  u.id=? and g.status = true";    		
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
             Logger.log('error', 'RegulatorController.find', 'The following error occurred:', null, err);
			return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Regulator .Please contact Administrator.' });
                //return res.json({ err: err }, 500);
            } else {
                console.log(users);
    			Logger.log('debug', 'RegulatorController.find', 'Sent Allowed Geos.', users, null);
                res.json(users);
            }
        });

    },
    getAll : function(req,res) {
      var sql = "SELECT * FROM Regulator where status = true";
      User.query(sql, function(err, users) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Regulator");
                console.log(users);
                res.json(users);
            }
        });

    }, 
    create: function(req, res) {
      console.log('create');
      var regulatorFormData = (req.body) ? req.body : undefined;
      console.log(regulatorFormData);
      var regulator = {};
      var regulatorgraphies ;
      var accessRegulator ;
      var userConfig = req.session.userConfig;
      var regulatorgraphiesaccess;
      var useraccess ;
      
      async.series([
        function(callback) { 
          Regulator.find({name : regulatorFormData.name, status: true}).exec(function (err ,regulator) {
             if(err){
              Logger.log('error', 'RegulatorController.create', 'The following error occurred(While checking the Regulator):', null, err);
                callback(err);
            }else if ( regulator.length>0){
              Logger.log('debug', 'RegulatorController.create', 'STEP-0a:Regulator Already Exist.', null, null);
              callback({errMsg : 'Regulator Already Exist' , errCode : 'errregulator'});
            } else callback();
          });     
      },
      function(callback) {
        console.log('STEP-1:Insert into Regulator table');
        var regulatorData = {
          name    : regulatorFormData.name,
          description : regulatorFormData.description
        };

        Regulator.create(regulatorData).exec(function(err, result) {  
          if(err) {
            console.log(err);
            callback(err);
          } else {
            console.log(result);              
           return res.json(200, result);
          }            
        });

       }],function(err) {
          if (err) {
              console.log(err);
            if ( err.hasOwnProperty('errCode') && err.errCode == 'errregulator') 
                return res.json(500, { errCode: 'errregulator' , errMsg: 'Regulator Already Exist.' });
            else    return res.json(500, { errCode: 500 , errMsg: 'Regulator Already Exist.' });
          } else {
              console.log("To know Regulator collection details", regulator);
              Logger.log('debug', 'RegulatorController.create', 'Regulator Created.', null, null);
              res.status(200).json(200);
            }
        });

    },

  findRegulator: function(req,res) {
      console.log("regulator");
      var sql = "SELECT * FROM regulator WHERE id = ? and status=true";
      Regulator.query(sql,[req.params.id], function(err, regulator) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Regulator");
                console.log(regulator);
                res.json(regulator);
            }
        });

  },

  update: function(req, res) {
      var regulatorgraphies;
      var regulatorFormData = (req.body) ? req.body : undefined;
      console.log("regulator form data :: " + regulatorFormData);
      async.series([
    
     //Louis: modified to check the existence of regulator
     function(callback) { 
          Regulator.find({name : regulatorFormData.name, status: true}).exec(function (err ,regulator) {
             if(err){
              Logger.log('error', 'RegulatorController.update', 'The following error occurred(While checking the Regulator):', null, err);
                callback(err);
            }else if (regulator.length>0 && regulator[0].id != regulatorFormData.id){
              Logger.log('debug', 'RegulatorController.update', 'STEP-0a:Regulator Already Exist.', null, null);
              callback({errMsg : 'Regulator  Already Exist' , errCode : 'errregulator'});
            } else callback();
          }); 
           
      },


        //Update user table
        function(callback) {
          console.log('STEP-1:Update regulator table');
          sql = "UPDATE regulator SET name=?, description=?, modified_by=?, modified_date=now() WHERE id=? ";
          var params = [
            regulatorFormData.name,
            regulatorFormData.description,
            req.session.user.id,
            regulatorFormData.id
          ];
          Regulator.query(sql, params, function(err, result) {
            if(err) {
              console.log(err);
              callback(err);
            } else {
              console.log(result);
               return res.json(200, result);
            }
          });

        }], function(err) {
            if (err) {
                console.log(err);
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errregulator') 
                return res.json(500, { errCode: 'errregulator' , errMsg: 'Regulator Already Exist.' });
            else if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while updating the domain' }, 500);
              else    return res.json({ err: err }, 500);
              } else {
                console.log('New regulator Updated.');
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
        var regulatorFormData = (req.body) ? req.body : undefined;
        console.log("regulatorFormData");console.log(regulatorFormData);    
        var regulatorFormData = (req.body) ? req.body : undefined;
        var sql = "DELETE FROM regulator WHERE id=?";
        var params = [regulatorFormData.regulator_id];
        console.log("destroy regulator::params");console.log(params);
        Regulator.query(sql, params, function (err, result) {
        if (err) {
                    console.log(err);
            Logger.log('error', 'RegulatorController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } 
        else{
                    //res.send('success'); 
              return res.json(200, result);
                                
            }
         });
    },
  
  findregByregulatorId :function(req,res){
     console.log("regbyregulatorid");
      console.log('regulator :: id :: ' + req.params.id);
    var sql = "select * from regulator where id=? and status=true";

    Regulator.query(sql,[req.params.id],function(err, regulator) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(regulator);
          }
      });
    },

  findRegulator: function(req, res){
    console.log("findregulator");
    console.log('regulator :: id :: ' + req.params.id);
    var sql = "select * from regulator where status = true and id = ? ";
    Regulator.query(sql,[req.params.id],function(err,regulator) {
      if(err) {
        console.log(err);
        return res.json({ err: err }, 500);
      } else {
          res.json(regulator);
        }
      });
    },

     //to get regulator
  getall:function (req,res) {
     var sql = "SELECT id,name,description FROM regulator where status = true";
      Regulator.query(sql, function(err, regulator) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master regulator");
                console.log(regulator);
                res.json(regulator);
            }
        });
    
  },

  getAllRegulator : function(req,res) {
     // var sql = "SELECT * FROM Regulator where status = true";

      var sql = "SELECT distinct r.id as rid, r.name, g.name as geo, g.id as gid, rdl.country_id as cntid, rdl.state_id as sid,"+
                " rdl.domain_id as did FROM regulator r, geography g, "+
                " regulation_document_link rdl where r.id = rdl.regulator_id and rdl.geography_id = g.id and r.status=1 and g.status=1";


      User.query(sql, function(err, users) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Regulator");
                console.log(users);
                res.json(users);
            }
        });

    }, 

}
 		
