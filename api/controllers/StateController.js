module.exports = {

  find: function(req, res){
     
       var userConfig = req.session.userConfig;
        if (userConfig.full) {
          sql = " SELECT " +
                  " distinct g.name as gname,s.id as id, s.name as name, s.description as description,s.state_code as state_code, c.name as cname" +
                  "  FROM geography g, state s, country c " +
                  "  WHERE s.status = true and s.country_id = c.id and s.geography_id = g.id and g.status = 1 and c.status =1" ; 
            var params = [];          
        } else {
          sql = " SELECT " +
                  " distinct g.name as gname,s.id as id, s.name as name, s.description as description,s.state_code as state_code, c.name as cname" +
                  "  FROM geography g,state s, subscription s, subscription_detail sd, user u, country c " +
                  " WHERE u.id=s.user_id and s.id=sd.subscription_id and s.id = sd.state_id and s.geography_id = g.id and  u.id=? and s.country_id = c.id" +
                    "and g.status =1 and s.status = 1 and c.status = 1 ";       
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
             Logger.log('error', 'StateController.find', 'The following error occurred:', null, err);
      return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching State .Please contact Administrator.' });
                //return res.json({ err: err }, 500);
            } else {
                console.log(users);
          Logger.log('debug', 'StateController.find', 'Sent Allowed Geos.', users, null);
                res.json(users);
            }
        });

    },

// getall:function (req,res) {
//      var sql = "SELECT id,name,description,state_code FROM state where status = true";
//       State.query(sql, function(err, state) {
//             if(err) {
//               console.log(err);
//               return res.json({ err: err }, 500);
//             } else {
//                 console.log("Master State");
//                 console.log(state);
//                 res.json(state);
//             }
//         });
    
//   },

getAll:function (req,res) {
     var sql = "select s.id as sid, s.name as name, s.state_code as scode, s.country_id as cntid, "+
                "s.geography_id as gid from state s, country c where c.id = s.country_id or s.id=18 and s.status = 1 and c.status = 1";
               // "select 18,"-",gid,23 from geography";
    console.log("sql  ::::", sql);
                
      State.query(sql, function(err, state) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master State");
                console.log(state);

                console.log("state checking ++++++++++" + JSON.stringify(state));
                res.json(state);
            }
        });
    
  },

 create: function(req, res) {
    console.log('create');
      var stateFormData = (req.body) ? req.body : undefined;
      console.log(stateFormData);
      var state = {};


      async.series([
        function(callback) { 
          State.find({name : stateFormData.name, state_code:stateFormData.state_code,  geography_id : stateFormData.geography_id, country_id : stateFormData.country_id,  status: true}).exec(function (err ,result) {
             if(err){
              Logger.log('error', 'StateController.create', 'The following error occurred(While checking the State):', null, err);
                callback(err);
            }else if ( result.length>0){
              Logger.log('debug', 'StateController.create', 'STEP-0a:State Already Exist.', null, null);
              callback({errMsg : 'State Already Exist' , errCode : 'errstate'});
            } else callback();
          });     
      },

        function(callback) { 
          State.find({state_code:stateFormData.state_code, geography_id : stateFormData.geography_id, country_id : stateFormData.country_id,  status: true}).exec(function (err ,result) {
             if(err){
              Logger.log('error', 'StateController.create', 'The following error occurred(While checking the State):', null, err);
                callback(err);
            }else if ( result.length>0){
              Logger.log('debug', 'StateController.create', 'STEP-0a:State Already Exist.', null, null);
              callback({errMsg : 'State code Already Exist' , errCode : 'errCode'});
            } else callback();
          });     
      },

         function(callback) {
        console.log('STEP-1:Insert into State table');
        var stateData = {
          name    : stateFormData.name,
          description : stateFormData.description,
          state_code   :stateFormData.state_code,
          country_id   : stateFormData.country_id,
          geography_id  :  stateFormData.geography_id
        };
        State.create(stateData).exec(function(err, result) {  
          if(err) {
            console.log(err);
            callback(err);
          } else {
            console.log(result);              
            state = result;
            callback();
          }            
        });
       }],function(err) {
          if (err) {
              console.log(err);

            if ( err.hasOwnProperty('errCode') && err.hasOwnProperty('errMsg')) 
                return res.json(500, { errCode: err.errCode , errMsg: err.errMsg });
            else    return res.json(500, { errCode: 500 , errMsg: 'State Already Exist.' });
          } else {
              console.log("To know State collection details", state);
              Logger.log('debug', 'StateController.create', 'State Created.', null, null);
              res.status(200).json(200);
            }
        });

    
  },


//===================================================================================vinitha code balaji using 
	findALL: function(req,res){
		 var sql = "SELECT * FROM state where status = true";
		 State.query(sql, function(err, state) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("State ::::::");
                console.log(state);
                res.json(state);
            }
        });
	},
//=================================================================================vinitha code 

findstate: function(req,res) {
      
      console.log("get State by id----> "+req.params.id);

      var sql = "SELECT  s.id, s.name,s.description,s.state_code, g.id as gid, g.name as gname, c.id as country_id FROM state s," +
                " country c, geography  g where s.status = true and  "+
                " s.country_id = c.id and s.geography_id = g.id and s.id =? and s.status = 1 and g.status = 1";

      State.query(sql,[req.params.id], function(err, state) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {

                console.log("State ::::::");

                console.log("Master State");

                console.log(state);
                res.json(state);
            }
        });

   
  },

  findExists: function(stateFormData) {
      
      console.log("get State by id----> "+req.params.id);

      var sql = "SELECT  s.id, s.name,s.description,s.state_code, g.id as gid, c.id as country_id FROM state s," +
                " country c, geography  g where s.status = true and  "+
                " s.country_id = c.id and c.geo_id = g.id and s.id =? and s.status = 1 and g.status = 1";

      State.query(sql,[req.params.id], function(err, state) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {

                console.log("State ::::::");

                console.log("Master State");

                console.log(state);
                res.json(state);
            }
        });

   
  },

   update: function(req, res) {
      var states;
      var stateFormData = (req.body) ? req.body : undefined;
      console.log("state form data :: " + stateFormData);
      async.series([
        function(callback) { 
        
        var sql = "SELECT  id, name FROM state " +
                " where status = true and  "+
                " geography_id = ?  and country_id = ? and id !=? and state_code=?";

      State.query(sql,[stateFormData.country_id,stateFormData.geography_id, stateFormData.id, stateFormData.state_code ], function(err, result) {
            if(err) {
              console.log(err);
              callback(err);
            } 
            else if( result.length > 0 )
            {
               if( result[0].name == stateFormData.name)
               {
                 callback({errMsg : 'State code Already Exist' , errCode : 'errBoth'});
               }
               else
               {
                callback({errMsg : 'State code Already Exist' , errCode : 'errCode'});
              }
            }
            else 
            {

                callback();
            }
        });

       },
        


        //Update user table
        function(callback) {
          console.log('STEP-1:Update state table');
          sql = "UPDATE state SET name=?, description=?,state_code=?,  geography_id=?, country_id=?, modified_by=?, modified_date=now() WHERE id=? ";
          var params = [
            stateFormData.name,
            stateFormData.description,
            stateFormData.state_code,
            stateFormData.geography_id,
            stateFormData.country_id,
            req.session.user.id,
            stateFormData.id
          ];
          State.query(sql, params, function(err, result) {
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

               if( err.hasOwnProperty('errCode') && err.hasOwnProperty('errMsg')) 
                  return res.json(500, { errCode: err.errCode , errMsg: err.errMsg });
            else if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while updating the domain' }, 500);
              else    return res.json({ err: err }, 500);
              } else {
                console.log('New state Updated.');
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
        var stateFormData = (req.body) ? req.body : undefined;
        console.log("stateFormData");console.log(stateFormData);    
        var stateFormData = (req.body) ? req.body : undefined;
        var sql = "DELETE FROM state WHERE id=?";
        var params = [stateFormData.state_id];
        console.log("destroy state::params");console.log(params);
        State.query(sql, params, function (err, result) {
        if (err) {
                    console.log(err);
            Logger.log('error', 'StateController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } 
        else{
                    //res.send('success'); 
              return res.json(200, result);
                                
            }
         });
    },



    findregBystateId :function(req,res){
     console.log("regbystateid");
      console.log('state :: id :: ' + req.params.id);
        var sql = "select * from state where  id=? and status = true ";

    State.query(sql,[req.params.id],function(err, state) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(state);
          }
      });
    },


    //vinitha for alert getting states
  stateAlert: function(req,res){
     var sql = "SELECT id,name,description FROM state where status = true";
     State.query(sql, function(err, state) {

            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("State ::::::");
                console.log(state);
                res.json(state);
            }
        });

  }




}
