 module.exports = {

   find: function(req, res){
     
       var userConfig = req.session.userConfig;

            var sql = " select "+
                " c.id as id,c.name as name,c.description as description, c.country_code, g.name as geoname, c.geo_id as gid "+
              " from country c,geography g" +
              " where c.geo_id=g.id and c.status = 1 and g.status = 1" ;
            var params = []; 
        if (!userConfig.full) {

          sql = " select "+
                "distinct c.id as id,c.name as name,c.description as description, c.country_code, g.name as geoname,  c.geo_id as gid  " +
              " from country c,geography g, subscription s, subscription_detail sd, user u  " +
               " WHERE  u.id=s.user_id and s.id=sd.subscription_id and "+
               "  c.geo_id=g.id and g.id = sd.geography_id and u.id=? and c.status = 1 and g.status = 1 " ;       
           params = [req.session.user.id];
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
             Logger.log('error', 'CountryController.find', 'The following error occurred:', null, err);
      return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Country .Please contact Administrator.' });
                //return res.json({ err: err }, 500);
            } else {
                console.log(users);
          Logger.log('debug', 'CountryController.find', 'Sent Allowed Geos.', users, null);
                res.json(users);
            }
        });

    },
  //to get country
  getall:function (req,res) {
    var userConfig = req.session.userConfig;

          var sql = " select "+
                " c.id as id,c.name as name,c.description as description,g.name as geoname, c.geo_id as gid "+
              " from country c,geography g" +
              " where c.geo_id=g.id and c.status = 1 and g.status = 1";
            var params = []; 

        if (!userConfig.full) {
         
       

          console.log("country checking ++++++++++++++++++==============");
          sql = " select "+
                "c.id as id,c.name as name,c.description as description,g.name as geoname,  c.geo_id as gid " +
              " from country c,geography g, subscription s, subscription_detail sd, user u " +
               " WHERE  u.id=s.user_id and s.id=sd.subscription_id and c.id = sd.country_id and"+
               "  c.geo_id=g.id and u.id=? and c.status = 1 and g.status = 1";       
              params = [req.session.user.id];
        } 
     //var sql = "SELECT id,name,description,geo_id as gid,status  FROM country where status = true";
      Country.query(sql, params, function(err, country) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Country");
                console.log(country);
                res.json(country);
            }
        });
    
  },
  // to create country
  create: function(req, res) {
    console.log('create');
      var countryFormData = (req.body) ? req.body : undefined;
      console.log(countryFormData);
      var country = {};

      //Louis modified to check the existence of country

      async.series([

        function(callback) { 
          Country.find({name : countryFormData.name, country_code:countryFormData.country_code, geo_id : countryFormData.geography_id, status: true}).exec(function (err ,country) {

            console.log(" country find "+JSON.stringify(country));
             if(err){
              Logger.log('error', 'CountryController.create', 'The following error occurred(While checking the Country):', null, err);
                callback(err);
            }else if ( country.length>0){
              Logger.log('debug', 'CountryController.create', 'STEP-0a:Country Already Exist.', null, null);
              callback({errMsg : 'Country Already Exist' , errCode : 'errcountry'});
            } else callback();
          });     
      },

      function(callback) { 
          Country.find({country_code:countryFormData.country_code, geo_id : countryFormData.geography_id, status: true}).exec(function (err ,country) {
             if(err){
              Logger.log('error', 'CountryController.create', 'The following error occurred(While checking the Country):', null, err);
                callback(err);
            }else if ( country.length>0){
              Logger.log('debug', 'CountryController.create', 'STEP-0a:Country Already Exist.', null, null);
              callback({errMsg : 'Country code Already Exist' , errCode : 'errCode'});
            } else callback();
          });     
      },



    function(callback) {
        console.log('STEP-1:Insert into Country table');
        var countryData = {
          name    : countryFormData.name,
          description : countryFormData.description,
          country_code: countryFormData.country_code,
          geo_id      : countryFormData.geography_id
        };

        Country.create(countryData).exec(function(err, result) {  

          if(err) {
            console.log(err);
            callback(err);
          } else {
            console.log(result);              
            country = result;
            callback();
          }            
        });
       }],function(err) {
          if (err) {
              console.log(err);

            if ( err.hasOwnProperty('errCode') && err.hasOwnProperty('errMsg') ) 
                return res.json(500, { errCode: err.errCode , errMsg: err.errMsg });
            else    return res.json(500, { errCode: 500 , errMsg: 'Country Already Exist.' });
          } else {
              console.log("To know Country collection details", country);
              Logger.log('debug', 'CountryController.create', 'Country Created.', null, null);
              res.status(200).json(200);
            }
        });

    
  },


  findAll: function(req,res){
     var sql = "SELECT * FROM country where status = true";
     Country.query(sql, function(err, country) {
      if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {

                console.log("Country ::::::");

                console.log("Master Country");

                console.log(country);
                res.json(country);
            }
        });

  },


findcountry: function(req,res) {
      console.log("country");
      var sql = "SELECT * FROM country WHERE id = ? and status=true";
      Country.query(sql,[req.params.id], function(err, country) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {

                res.json(country);
            }
        });

   
  },


    //========================================

/*update: function(req, res) {
      var countries;
      var countryFormData = (req.body) ? req.body : undefined;
      console.log("country form data :: " + countryFormData);
      async.series([
      //================================================================
                  function(callback) { 

          var sql = "select * from country where  id!=? and name=?";
          var params = [req.params.id,countryFormData.name];

           console.log("find "+params);

    Country.query(sql,params,function(err, country) {
           if(err){
              Logger.log('error', 'CountryController.update', 'The following error occurred(While checking the Country):', null, err);
                callback(err);
            }else if (country.length>0){
              Logger.log('debug', 'CountryController.update', 'STEP-0a:Country Already Exist.', null, null);
              callback({errMsg : 'Country  Already Exist' , errCode : 'errcountry'});
            } else callback();
          }); 
      
          //=======================================================    
      },*/
       update: function(req, res) {
      var countries;
      var countryFormData = (req.body) ? req.body : undefined;
      console.log("country form data :: " + countryFormData);
      async.series([

        //Louis : modified to check the existence of other record with same country
         function(callback) 
         { 

           var sql = "SELECT  id, name FROM country " +
                " where status = true and  "+
                " geo_id = ? and id !=? and country_code=?";

            Country.query(sql,[countryFormData.geography_id, countryFormData.id, countryFormData.country_code.toUpperCase() ], function(err, result) 
            {
                if(err) 
                {
                 Logger.log('error', 'CountryController.update', 'The following error occurred(While checking the Country):', null, err);
          
                  callback(err);
                } 
                else if( result.length > 0 )
                {
                   Logger.log('debug', 'CountryController.update', 'STEP-0a: Country Already Exist.', null, null);

                   if( result[0].name == countryFormData.name)
                   {
                     callback({errMsg : 'Country code Already Exist' , errCode : 'errBoth'});
                   }
                   else
                   {
                    callback({errMsg : 'Country code Already Exist' , errCode : 'errCode'});
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
          console.log('STEP-1:Update country table');
          sql = "UPDATE country SET name=?, description=?, country_code=?, geo_id=?, modified_by=?, modified_date=now() WHERE id=? ";
          var params = [
            countryFormData.name,
            countryFormData.description,
            countryFormData.country_code.toUpperCase(),
            countryFormData.geography_id,
            req.session.user.id,
            countryFormData.id
          ];
          Country.query(sql, params, function(err, result) {
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
                if ( err.hasOwnProperty('errCode') && err.hasOwnProperty('errMsg') ) 
                return res.json(500, { errCode: err.errCode , errMsg: err.errMsg });
            else if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while updating the domain' }, 500);
              else    return res.json({ err: err }, 500);
              } else {
                console.log('New country Updated.');
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
        var countryFormData = (req.body) ? req.body : undefined;
        console.log("countryFormData");console.log(countryFormData);    
        var countryFormData = (req.body) ? req.body : undefined;
        var sql = "DELETE FROM country WHERE id=?";
        var params = [countryFormData.country_id];
        console.log("destroy country::params");console.log(params);
        Country.query(sql, params, function (err, result) {
        if (err) {
                    console.log(err);
            Logger.log('error', 'CountryController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } 
        else{
                    //res.send('success'); 
              return res.json(200, result);
                                
            }
         });
    },



    findregBycountryId :function(req,res){
     console.log("regbycountryid");
      console.log('country :: id :: ' + req.params.id);
        var sql = "select * from country where  id=? and status = true ";

    Country.query(sql,[req.params.id],function(err, country) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(country);
          }
      });
    },

  getallcountries:function (req,res) {

     var userConfig = req.session.userConfig;     
     var params = [];  
           if (userConfig.full) {
          sql = " select "+
                " c.id as id,c.name as name,c.description as description,g.name as geoname, c.geo_id as gid "+
              " from country c,geography g" +
              " where c.geo_id=g.id  or c.id=23 and c.status = 1 and g.status = 1 ";
              //UNION SELECT 23,"-",g.name as geoname,g.id as gid from geography";
                    
          console.log("sql in country::::::", sql);
        } else {
          sql = " select "+
                "c.id as id,c.name as name,c.description as description,g.name as geoname,  c.geo_id as gid " +
              " from country c,geography g, subscription s, subscription_detail sd, user u " +
               " WHERE  u.id=s.user_id and s.id=sd.subscription_id and c.id = sd.country_id and"+
               "  c.geo_id=g.id and u.id=? and c.status = 1 and g.status = 1";       
           params = [req.session.user.id];
        } 


     //var sql = "SELECT id,name,description,geo_id as gid,status  FROM country where status = true";
      Country.query(sql,params, function(err, country) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Country");
                res.json(country);
            }
        });    
  
},

/*
  findcountry: function(req,res){
     var sql = "SELECT * FROM country where status = true";
     Country.query(sql, function(err, country) {

            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Country ::::::");
                console.log(country);
                res.json(country);
            }
        });

	}*/
}

