module.exports = {

    find: function(req, res){
      var id = 0;
      var permsql = "SELECT u.id  FROM user u, user_permission p Where  u.id = p.user_id and p.permission_id = 8 AND u.id = ?";
      var params = [req.session.user.id];
      User.query(permsql,params, function(err, users) {
            if(err) {
              console.log(err);
              return res.json({ err: "Domain not found" }, 500);
            } else {
                console.log(users);
                id = (users.length == 0) ? 0 : users[0].id; //users[0].id;
                console.log("full user id " + id);
            }
      var sql;
      console.log( id == 0);
      if ( id == 0) {

        sql = " SELECT " + 
                  " distinct  r.id as rid, r.name as rname, d.id as did, d.name as dname   " + 
                  "  FROM  regulation r, domain d,  domain_regulation_link dl, subscription s, subscription_detail sd, user u " + 
                  " WHERE r.status = 1 and d.status = 1 and u.id=s.user_id and s.id=sd.subscription_id and d.id = sd.domain_id and d.status=true  and  u.id=? and d.id = dl.domain_id and dl.regulation_id = r.id";
        console.log(req.session.user.id);
        params = [req.session.user.id];          
        console.log(sql);
        User.query(sql, params, function(err, users) {
              if(err) {
                console.log(err);
                return res.json({ err: err }, 500);
              } else {
                  console.log("Restricted rights Domain");
                  Logger.log('debug', 'DomainController.find', 'RESTRICTED Access.', null, null);
                  console.log(users);
                  res.json(users);
              }
        });
      } else {
         sql = " SELECT " + 
                  " distinct  r.id as rid, r.name as rname, d.id as did, d.name as dname   " + 
                  "  FROM  regulation r, domain d,  domain_regulation_link dl " + 
                  " WHERE r.status = 1 and d.status = 1 and d.status=true and d.id = dl.domain_id and dl.regulation_id = r.id";
        console.log(req.session.user.id);
        console.log(sql);
        User.query(sql,  function(err, users) {
              if(err) {
                console.log(err);
                return res.json({ err: err }, 500);
              } else {
                  console.log("Full rights Domain");
                  console.log(users);
                  res.json(users);
              }
          });

        }
      });
    },
    findDomain: function(req, res){
      console.log('domain :: id :: ' + req.params.id);
      var sql = "select * from domain where status = true and id = ? ";
      Domain.query(sql,[req.params.id],function(err, domain) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);

          } else {
               res.json(domain);
          }
      });
    },
    findGeoByDomainId : function(req,res){
      console.log('domain :: id :: ' + req.params.id);
      var sql = "select g.* from domain d,geography g,geography_domain_link gdl where d.status = true and g.status=true and d.id = gdl.domain_id and g.id = gdl.geography_id and d.id=? ";
      Geography.query(sql,[req.params.id],function(err, geo) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(geo);
          }
      });
    },
    getAll : function(req,res) {
      var sql = "SELECT * FROM domain where status=true";
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
      User.query(sql, function(err, users) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Domain");
                console.log(users);
                res.json(users);
            }
        });

      },
    // getAllnew: function(req,res) {
    //   var sql = "SELECT * FROM domain where status=true ";
    //   Domain.query(sql, function(err, domain) {
    //         if(err) {
    //           console.log(err);
    //           return res.json({ err: err }, 500);
    //         } else {
    //             console.log("Master Domain");
    //             console.log(domain);
    //             res.json(domain);
    //         }
    //     });

    //   },
    create: function(req, res) {
      var domainFormData = (req.body) ? req.body : undefined;
      console.log(domainFormData);
      var domain = {};
      var geographies ;

      async.series([
        function(callback) {
          Domain.find({name : domainFormData.name, status: true}).exec(function (err ,domain) {
             if(err){
              Logger.log('error', 'DomainController.create', 'The following error occurred(While checking the Domain):', null, err);
              callback(err);
            }else if ( domain.length>0){                
              Logger.log('debug', 'DomainController.create', 'STEP-0a:Domain Already Exist.', null, null);
              callback({errMsg : 'Domain Already Exist' , errCode : 'errDomain'});
            } else callback();
          });
        },
        function(callback) {
          console.log('STEP-1:Insert into domain table');
          var domainData = {
            name    : domainFormData.name,
            description : domainFormData.description
        };

        Domain.create(domainData).exec(function(err, result) {
          if(err) {
            Logger.log('debug', 'DomainController.create', 'STEP-1:Domain Table Insert error.', null, null);
            callback(err);
          } else {
            console.log(result);
            domain = result;
            callback();
          }
        });

      }, 

      function(callback){
        console.log('STEP-2:Insert into geography domain table');
        async.forEachOf(domainFormData.geos, function(item, key, callback) {
          var sql = "INSERT INTO geography_domain_link (domain_id, geography_id) VALUES (?,?)";
          var params = [domain.id, item];
          Geography_Domain.query(sql, params, function(err, result) {
            if(err) {
              Logger.log('debug', 'DomainController.create', 'STEP-3:geography domain table.', null, null);
              callback(err);
            } else {
              callback();
            }
          });
        }, callback);
      },
    ], 
    function(err) {
      if (err) {
        console.log(err);
        if ( err.hasOwnProperty('errCode') && err.errCode == 'errDomain') 
          return res.json(500, { errCode: 'errDomain' , errMsg: 'Domain Already Exist.' });
        else    return res.json(500, { errCode: 500 , errMsg: 'Domain Already Exist' });
      } else {
          console.log("To know Domain collection details", domain);
          Logger.log('debug', 'DomainController.create', 'Domain Created.', null, null);
          res.status(200).json(200);
        }
    });

    },

    //by vinitha for domain edit form

    update: function(req, res) {
      var geographies;
      var domainFormData = (req.body) ? req.body : undefined;
      var geography_id = parseInt(domainFormData.geography_id, 10),
      country_id    = parseInt(domainFormData.country_id, 10), 
      state_id= parseInt(domainFormData.state_id, 10);
      console.log("::::::::::::" + geography_id);
      console.log("::::::::::::" + country_id);
      console.log("domain form data :: " + JSON.stringify(domainFormData));
      async.series([
         
         //Louis, modified to test the existence of domain
         function(callback) {
          Domain.find({name : domainFormData.name, status: true}).exec(function (err ,domain) {
             if(err){
              Logger.log('error', 'DomainController.update', 'The following error occurred(While checking the Domain):', null, err);
              callback(err);
            }else if ( domain.length>0 && domain[0].id != domainFormData.id){                
              Logger.log('debug', 'DomainController.update', 'STEP-0a:Domain Already Exist.', null, null);
              callback({errMsg : 'Domain Already Exist' , errCode : 'errDomain'});
            } else callback();
          });
        },

        //Update user table
        function(callback) {
          console.log('STEP-1:Update domain table');
          sql = "UPDATE domain SET name=?, description=?, modified_by=?, modified_date=now() WHERE id=? ";
          var params = [
            domainFormData.name,
            domainFormData.description,
            req.session.user.id,
            domainFormData.id
          ];
          Domain.query(sql, params, function(err, result) {
            if(err) {
              console.log(err);
              callback(err);
            } else {
              console.log("result::::::::" + JSON.stringify(result));
              callback();
            }
          });
        },

        function(callback) {
          Geography_Domain.find({geography_id,domain_id:domainFormData.id,country_id,state_id}).exec(function (err ,domData) {
            if(err){
                Logger.log('error', 'DomainController.update', 'The following error occurred(While checking the domain):', null, err);
                callback(err);
            }else if ( domData.length>0){
              Logger.log('debug', 'DomainController.update', 'STEP-0a:this path Already Exist.', null, null);
              //Louis, error to show the selected geo, country, state is alredy exist
               callback({errMsg : 'Domain Already Exist' , errCode : 'mapExist'});
              //callback();
            } else callback();
          });
        },
        //Insert into geography domain
        function(callback){
          console.log('STEP-3:Insert into geography domain table');
         // async.forEachOf(domainFormData.geos, function(item, key, callback) {
            console.log("domain form data :: " + JSON.stringify(domainFormData));
            var sql = "INSERT INTO geography_domain_link (domain_id, geography_id,country_id,state_id) VALUES (?,?,?,?)";
            var params = [domainFormData.id, domainFormData.geography_id,domainFormData.country_id,domainFormData.state_id];
            Geography_Domain.query(sql, params, function(err, result) {
              if(err) {
                console.log(err);
                callback(err);
              } else {
                callback();
              }
            });
          // }, callback);

          },

          function(callback){
            console.log("getting name :::::");
           var sql=" SELECT g.id as geography_id,d.id as domain_id,d.name as domain_name, " + 
                  "  g.name as geography_name, c.name as country_name,c.id as country_id,s.name as state_name,s.id as state_id " + 
                  "  FROM domain d,geography g, state s, country c, geography_domain_link gdl " +
                  " WHERE g.id = gdl.geography_id AND d.id = gdl.domain_id AND c.id = gdl.country_id AND s.id = gdl.state_id " +
                  "  AND g.id = ? AND d.id = ? AND c.id = ? AND s.id = ?" ;
          var params = [domainFormData.geography_id,domainFormData.id,domainFormData.country_id,domainFormData.state_id];
          console.log(JSON.stringify(params));
            Domain.query(sql, params, function(err, dom) {
            if(err) {
              console.log(err);
              callback(err);
            } else {
                domDetail = dom;
                callback();
            }
        });
          },
          ], function(err) {
            if (err) {
                console.log(err);
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errDomain') 
                return res.json(500, { errCode: 'errDomain' , errMsg: 'Domain Already Exist.' });
            else if ( err.hasOwnProperty('errCode') && err.hasOwnProperty('errMsg') ) 
            {
                return res.json(500, { errCode: err.errCode , errMsg: err.errMsg });
            }
            else if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while updating the domain' }, 500);
              else    return res.json({ err: err }, 500);
              } else {
                console.log('New domain Updated.');
               // res.json({"status":"success"});
                res.json(domDetail);
            }
      });

    },
  destroy : function(req,res){
    var domainFormData = (req.body) ? req.body : undefined;
    console.log("domainFormData");console.log(domainFormData);
    async.series([
      function(callback) {
        console.log("destroy id :: "); console.log(domainFormData.domain_id);
        var sql = "UPDATE domain set status=false where id=?";
        Domain.query(sql,[domainFormData.domain_id],function (err ,domain) {
          if(err){
              console.log(err);
              callback(err);
          }else{
              console.log('regulation::'+ domain);
              callback();
              

          }
        });
      },//DELETING in geography_domain_link table
      function(callback) {
        var domainFormData = (req.body) ? req.body : undefined;
          var sql = "DELETE FROM geography_domain_link WHERE domain_id=?";
            var params = [domainFormData.domain_id];
            console.log("destroy geography_domain_link::params");console.log(params);
            Geography_Domain.query(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
            Logger.log('error', 'DomainController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } else{
                    //res.send('success'); 
                    callback();             
                }
            });

      },//DELETING in domain_regulation_link table
      function(callback) {
        var domainFormData = (req.body) ? req.body : undefined;
          var sql = "DELETE FROM domain_regulation_link WHERE domain_id=?";
            var params = [domainFormData.domain_id];
            console.log("destroy domain_regulation_link::params");console.log(params);
            domain_regulation_link.query(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
            Logger.log('error', 'DomainController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } else{
                    //res.send('success'); 
                    callback();             
                }
            });

      },//DELETING in regulation_document_link table
      function(callback) {
        var domainFormData = (req.body) ? req.body : undefined;
          var sql = "DELETE FROM regulation_document_link WHERE domain_id=?";
            var params = [domainFormData.domain_id];
            console.log("destroy regulation_document_link::params");console.log(params);
            regulation_document_link.query(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
            Logger.log('error', 'DomainController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } else{
                    //res.send('success'); 
                    callback();             
                }
            });

      },
      //DELETING in subscription_detail table
      function(callback) {
        var domainFormData = (req.body) ? req.body : undefined;
          var sql = "DELETE FROM subscription_detail WHERE domain_id=?";
            var params = [domainFormData.domain_id];
            console.log("destroy subscription_detail::params");console.log(params);
            SubscriptionDetail.query(sql, params, function (err, result) {
                if (err) {
                    console.log(err);
            Logger.log('error', 'DomainController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } else{
                    res.send('success'); 
                    callback();             
                }
            });

      }], 
      function(err) {
        if (err) {
          console.log(err);
          if ( err.hasOwnProperty('ecode'))
              return res.send({ err: 'Exception caught while delating regulation ' }, 500);
          else
              return res.json({ err: err }, 500);
      } else {
            console.log('Domain in All link Deleted.');
            //res.json(regDocDetail);
      }
    });

  },
  editDomain:function(req,res){
      console.log('domain1 :: id :: ' + req.param('id'));
    var sql=" SELECT g.id as geography_id,d.id as domain_id,d.name as domain_name, " + 
              "  g.name as geography_name, c.name as country_name,c.id as country_id,s.name as state_name,s.id as state_id " + 
              "  FROM domain d,geography g, state s, country c, geography_domain_link gdl " +
              " WHERE d.status = 1 and g.status = 1 and c.status = 1 and  g.id = gdl.geography_id AND d.id = gdl.domain_id AND c.id = gdl.country_id AND s.id = gdl.state_id AND gdl.domain_id=?" ;
        //var sql = "select geography_id,domain_id,document_id from regulation_document_link where  regulation_id=?";
      Geography_Domain.query(sql,[req.param('id')],function(err, domain) {
        if(err) {
          console.log(err);
        } else {
            console.log(domain);
            res.json(domain);

        }
    });
  },

  deletedomain : function(req,res){
        var postData = (req.body) ? req.body : undefined;
        console.log(":::::::" +JSON.stringify(postData));
        var criteria = [postData.geography_id, postData.domain_id,postData.country_id,postData.state_id ];
      console.log(JSON.stringify(criteria));
      var sql = "DELETE FROM geography_domain_link WHERE geography_id=? AND domain_id=? AND country_id=? AND state_id=?";
      Geography_Domain.query(sql, criteria, function (err, result) {
          if (err) {
              console.log(err);
              return res.json({ err: err }, 500);
          } else{
              res.send('success');
          }
      });   
  },

  getAllnew: function(req,res) {
      var sql = "SELECT d.id as did, d.name,dl.geography_id as gid, dl.domain_id as did, dl.country_id as cntid, "+
                " dl.state_id as sid FROM domain d, geography_domain_link dl where dl.domain_id = d.id and d.status=true ";

      
      Domain.query(sql, function(err, domain) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master Domain");
                console.log(domain);
                res.json(domain);
            }
        });

      },
}

