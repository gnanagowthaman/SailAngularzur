module.exports = {


  create: function(req, res) {
          var subDocFormData = (req.body) ? req.body : undefined;

          console.log("Create sub document" +subDocFormData);
          console.log(JSON.stringify(subDocFormData));
          var subtype_document = {};
          console.log('STEP-1:Insert into SubType_Document Table');
          
        async.series([
          function(callback) {
            SubDocType.find({name : subDocFormData.name, parent_id :subDocFormData.doc_id,  status: true}).exec(function (err ,subData) {
                   if(err){
                      Logger.log('error', 'SubDocumentController.create', 'The following error occurred(While checking the create Sub Document):', null, err);
                    callback(err);
                  }else if ( subData.length>0){
                 Logger.log('debug', 'SubDocumentController.create', 'STEP-0a:Regulation Already Exist.', null, null);
                callback({errMsg : 'Sub Document Already Exist' , errCode : 'errSubDocument'});
              } else callback();
          });
        },
        function(callback){
          var subdocData = {
            name       : subDocFormData.name,
            description : subDocFormData.description,
            parent_id      : subDocFormData.doc_id
           
          };
          console.log(subdocData);

          SubDocType.create(subdocData).exec(function(err, result) {
            if(err) {
              Logger.log('debug', 'SubDocumentController.create', 'STEP-1:SubType_Document Table Insert error.', null, null);             
              callback(err);
            } else {
              console.log(result);
              subtype_document =result;
              callback();
            }
          });
        }
      ], function(err) {
        if (err) {
              console.log(err);
            if ( err.hasOwnProperty('errCode') && err.errCode == 'errSubDocument') 
                return res.json(500, { errCode: 'errSubDocument' , errMsg: 'SubDocument Already Exist.' });
            else    return res.json(500, { errCode: 500 , errMsg: 'Sub Document Already Exist.' });
          } else {
            console.log("To know sub document collection details", subtype_document);
            Logger.log('debug', 'SubDocumentController.create', 'Sub Document Created.', null, null);
                  res.status(200).json(200);
      }
    });
  },

  getAllSubDoc: function(req,res) {
     //Louis = Modified to show the document name in sub document management page

    var sql = "SELECT a.id as id, a.name as name , a.parent_id as parent_id, a.description as description, d.name as docname,  "+
              " a.created_by as created_by, a.modified_by as modified_by, a.created_date as created_date, "+
              " a.modified_date as modified_date "+
              " FROM document a, document d WHERE a.parent_id = d.id AND a.status=true AND d.status=true";


     if (req.param('limit') && req.param('limit') != undefined) {
        var limit = req.param('limit');
        sql = sql + " ORDER BY id LIMIT " + limit;
        if (req.param('offset') && req.param('offset') != undefined) {
          var offset = req.param('offset');
          sql = sql + " OFFSET " + offset;
        } else {
          sql = sql + " OFFSET 0 ";
        }
      }    
      SubDocType.query(sql, function(err, subdoc) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master sub document");
                console.log(subdoc);
                res.json(subdoc);
            }
        });
  }, 

  findBySubDoc: function(req, res){
      console.log('sub document :: id :: ' + req.params.id);
      var sql = "select * from document where id = ? and status=1";
      SubDocType.query(sql,[req.params.id],function(err, subdoc) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);

          } else {
               res.json(subdoc);
          }
      });
    },

  update: function(req, res) {  
      var subDocFormData = (req.body) ? req.body : undefined;
      console.log("sub Doc Form Data  :: " + JSON.stringify(subDocFormData));
      var subtype_document = {};
      async.series([

        function(callback) {
          SubDocType.find({name : subDocFormData.name, parent_id :subDocFormData.doc_id,  status: true}).exec(function (err ,subData) {
                   if(err){
                      Logger.log('error', 'SubDocumentController.create', 'The following error occurred(While checking the create Sub Document):', null, err);
                    callback(err);
                  }else if ( subData.length>0)
                  {
                    console.log(JSON.stringify(subData));
                     if( subData[0].id != subDocFormData.id)
                     {
                       Logger.log('debug', 'SubDocumentController.create', 'STEP-0a:Sub Document Already Exist.', null, null);
                       callback({errMsg : 'Sub Document Already Exist' , errCode : 'errSubDocument'});
                     }
                     else
                     {
                       callback();
                   }
                      
                 } else callback();
          });
        },      

        function(callback) {
          console.log('STEP-1:Update SubType Document table');
          sql = "UPDATE document SET  name=?, description=?, parent_id=?, modified_by=?, modified_date=now() WHERE id=? ";
          var params = [
            subDocFormData.name,
            subDocFormData.description,
            subDocFormData.doc_id,
            req.session.user.id,
            subDocFormData.id
          ];
          console.log("sub document form data :: " + params);
          SubDocType.query(sql, params, function(err, result) {
            if(err) {
              console.log(err);
              callback(err);
            } else {
              console.log(result);
              subtype_document =result;
              callback();
            }
          });
        },
       ], function(err) {
            if (err) {
              console.log(err);
            if ( err.hasOwnProperty('errCode') && err.errCode == 'errSubDocument') 
                return res.json(500, { errCode: 'errSubDocument' , errMsg: 'Sub Document Already Exist.' });
            else    return res.json(500, { errCode: 500 , errMsg: 'SubDocument Already Exist.' });
          } else {
            console.log("To know sub document collection details", subtype_document);
            Logger.log('debug', 'SubDocumentController.create', 'Sub Document Created.', null, null);
            res.status(200).json(200);
      }
      });

    },
   
  destroy : function(req,res){
        var subDocFormData = (req.body) ? req.body : undefined;
        console.log("subDocFormData");console.log(subDocFormData);    

        // var sql = "DELETE FROM document WHERE id=?";
        var sql = "UPDATE document SET status=false WHERE id=?";        
        var params = [subDocFormData.id];
        console.log("destroy sub document::params");console.log(params);
        SubDocType.query(sql, params, function (err, result) {
        if (err) {
                    console.log(err);
            Logger.log('error', 'SubDocumentController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } 
        else{                  
              return res.json(200, result);                               
            }
         });
  },

  subDocument: function(req,res){
    var sql = "SELECT * FROM document where status = true";
     SubDocType.query(sql, function(err, subdoc) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("subdoc ::::::");
                console.log(subdoc);
                res.json(subdoc);
            }
        });
  },

 getAll : function(req,res) {
      var  sql = "SELECT distinct sd.id as sdocid, sd.name, d.id as docid, g.id as gid, c.id as cntid, s.id as sid, "+
                  " rl.id as rlid, r.id as rid, do.id as did  "+
                  " FROM document d, document sd,  geography g, country c, state s, regulation rl, "+
                   " regulator r, domain do, regulation_document_link l "+
                  " where l.regulation_id = rl.id and l.geography_id = g.id and l.document_id = d.id "+
                  " and l.domain_id = do.id and l.country_id = c.id and l.state_id = s.id and  "+
                  " l.sub_document_id = sd.id and l.regulator_id = r.id and d.status=1 and sd.status=1 and g.status =1 and c.status=1 and s.status=1 and rl.status=1 and do.status=1";

      User.query(sql, function(err, users) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log(users);
                res.json(users);
            }
        });

    },

     findSubscription: function(req, res) {
      var userConfig = req.session.userConfig;
      if (userConfig.full) {
        Logger.log('debug', 'SubDocumentController.findSubscription', 'FULL Access.', null, null);
        sql = " SELECT distinct geography_id as gid, domain_id as did, regulation_id as rlid, document_id as docid, " +
              "country_id as cntid, state_id as sid, regulator_id rid, sub_document_id as sdocid " +
              "   FROM regulation_document_link"; 
        var params = [];  
        console.log("full access");        
      } else {
        Logger.log('debug', 'SubDocumentController.findSubscription', 'RESTRICTED Access.', null, null);
        sql = " SELECT sd.geography_id as gid,sd.country_id as cntid, sd.state_id as sid , sd.domain_id as did,"+
        " sd.regulation_id as rlid, sd.document_id as docid, rl.regulator_id as rid, rdl.sub_document_id as sdocid"+
        " FROM subscription_detail sd, subscription s, user u, regulator_regulation_link rl, regulation_document_link rdl" +
        " WHERE sd.subscription_id=s.id AND s.user_id=u.id AND rl.regulation_id = sd.regulation_id and u.id=?";

        var params = [req.session.user.id];
        console.log("restricted access");
      }
      Regulation.query(sql, params, function(err, result) {
            if (err) {
                Logger.log('error', 'SubDocumentController.findSubscription', 'The following error occurred:', null, err);
                return res.json(500, { errCode: 500 , errMsg: 'No document available.Please Contact Administrator' });
            } else {
                Logger.log('debug', 'SubDocumentController.findSubscription', 'Allowed Documents Sent', result, null);
                console.log("result",JSON.stringify(result));
                return res.json(200, result);
            }
      });
    }     
}
