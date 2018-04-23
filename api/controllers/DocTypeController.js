var path = require('path');
var basePath = __dirname + '/../../assets/documents/publish';
var basePathupload = __dirname + '/../../assets/documents/upload';
module.exports = {

    // find: function(req, res){
     
    //    var sql = " SELECT " + 
    //             " distinct g.id, g.name       " + 
    //             "  FROM geography g, subscription s, subscription_detail sd, user u " + 
    //             " WHERE u.id=s.user_id and s.id=sd.subscription_id and g.id = sd.geography_id and  u.id=?";
    // console.log(req.session.user.id);
    //   var  params = [req.session.user.id];          
    //   console.log(sql);
    //   User.query(sql, params, function(err, users) {
    //         if(err) {
    //           console.log(err);
    //             //return res.json({ err: err }, 500);
    //         } else {
    //             console.log(users);
    //             res.json(users);
    //         }
    //     });

    // },
  find : function(req,res) {
      console.log("doctype");
      var sql = "SELECT * FROM document where status = true and parent_id IS NULL";
      Doctypemodel.query(sql, function(err, geo) {
            if(err) {
              console.log(err);
              return res.json(500, { error: 'File not exist' });
            } else {
              
                console.log(doctype);
                res.json(geo);
            }
        });

  },

  create: function(req, res) {
      console.log('create');
      var doctypeFormData = (req.body) ? req.body : undefined;
      console.log(doctypeFormData);
      var doctype = {};
      var docmenttype ;
        
        async.series([
          function(callback) { 
            Doctype.find({name : doctypeFormData.name, status: true}).exec(function (err ,doctype) {
               if(err){
                Logger.log('error', 'DocTypeController.create', 'The following error occurred(While checking the Document Type):', null, err);
                callback(err);
              }else if ( doctype.length!=0){
                 Logger.log('debug', 'DocTypeController.create', 'STEP-0a:Document Type  Already Exist.', null, null);
                 callback({errMsg : 'Document Type Already Exist' , errCode : 'errDocType'});
              } else callback();
            }); 
          },function(callback) {
              console.log('STEP-1:Insert into doctype table');
              var doctypeData = {
                name    : doctypeFormData.name,
                description : doctypeFormData.description
              };

              Doctype.create(doctypeData).exec(function(err, result) {  
                if(err) {
                  console.log(err);        
                  callback(err);
                } else {
                  console.log(result);              
                  doctype = result;
                  callback();
                }            
              });
            }

        ], function(err) {
            if (err) {
                  console.log(err);
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errDocType') 
                    return res.json(500, { errCode: 'errDocType' , errMsg: 'Document Type Already Exist.' });
                else    return res.json(500, { errCode: 500 , errMsg: 'Document Type Already Exist.' });
              } else {
                console.log("To know REGULATION collection details", doctype);
                Logger.log('debug', 'DocTypeController.create', 'Document Type Created.', null, null);
                      res.status(200).json(200);
              }
          });

    },

  findDoctype: function(req,res) {      
    console.log("geo");
    var sql = "SELECT * FROM document WHERE id = ? and status=true and parent_id IS NULL";
    Doctype.query(sql,[req.params.id], function(err, geo) {
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

  update: function(req, res) 
  {
    //Louis : to avoid to have duplicate entry in the same name
    console.log('update');
     var doctypeFormData = (req.body) ? req.body : undefined;
     console.log(doctypeFormData);
    async.series([
          function(callback) 
          { 
            Doctype.find({name : doctypeFormData.name, status: true}).exec(function (err ,doctype) {
               if(err){
                Logger.log('error', 'DocTypeController.create', 'The following error occurred(While checking the Document Type):', null, err);
                callback(err);
              }else if ( doctype.length > 0 && doctype[0].id != doctypeFormData.id ){
                  console.log(doctype);
                 Logger.log('debug', 'DocTypeController.create', 'STEP-0a:Document Type  Already Exist.', null, null);
                 callback({errMsg : 'Document Type Already Exist' , errCode : 'errDocType'});
              } else callback();
            }); 
          },

          function(callback) 
          {
              console.log('STEP-1:update into document table');
              var sql = "UPDATE document set name =?,description=? where id=?";
              Doctype.query(sql,[doctypeFormData.name,doctypeFormData.description,doctypeFormData.id], function(err, result) {
                  if(err) {
                    console.log(err);
                    return res.json({ err: err }, 500);
                  } else {
                      console.log("Master document");
                      console.log(result);
                       res.json({"status":"success"});
                  }
              });
            }

        ], function(err) {
            if (err) {
                  console.log(err);
                if ( err.hasOwnProperty('errCode') && err.errCode == 'errDocType') 
                    return res.json(500, { errCode: 'errDocType' , errMsg: 'Document Type Already Exist.' });
                else    return res.json(500, { errCode: 500 , errMsg: 'Document Type Already Exist.' });
              } else {
                console.log("To know REGULATION collection details", doctype);
                Logger.log('debug', 'DocTypeController.create', 'Document Type Created.', null, null);
                      res.status(200).json(200);
              }
          });




    console.log('update');
    var doctypeFormData = (req.body) ? req.body : undefined;
    console.log(doctypeFormData);
   
    
  },

  getDocuments: function(req,res){
    console.log("getDocuments");
    var sql = "SELECT * FROM document where status = true AND parent_id is NULL";
        if (req.param('limit') && req.param('limit') != undefined) {
        var limit = req.param('limit');
        sql = sql + " LIMIT " + limit;
        if (req.param('offset') && req.param('offset') != undefined) {
          var offset = req.param('offset');
          sql = sql + " OFFSET " + offset;
        } else {
          sql = sql + " OFFSET 0 ";
        }
       }
       Doctype.query(sql, function(err, documents) {
              if(err) {
                console.log(err);
                return res.json({ err: err }, 500);
              } else {
                  console.log("Master Documents");
                  console.log(documents);
                  res.json(documents);
              }
        });
  }, 

  getAllDocuments: function(req,res){
    console.log("getDocuments");
    var sql = "SELECT * FROM document where status = true";
        if (req.param('limit') && req.param('limit') != undefined) {
        var limit = req.param('limit');
        sql = sql + " LIMIT " + limit;
        if (req.param('offset') && req.param('offset') != undefined) {
          var offset = req.param('offset');
          sql = sql + " OFFSET " + offset;
        } else {
          sql = sql + " OFFSET 0 ";
        }
       }
       Doctype.query(sql, function(err, documents) {
              if(err) {
                console.log(err);
                return res.json({ err: err }, 500);
              } else {
                  console.log("All Documents");
                  console.log(documents);
                  res.json(documents);
              }
        });
  }, 

  getfirstLevelSubDocuments: function(req, res) {
    console.log("getDocuments");
    var sql = "SELECT * FROM document where status = true AND parent_id is not NULL";

       Doctype.query(sql, function(err, documents) {
              if(err) {
                console.log(err);
                return res.json({ err: err }, 500);
              } else {
                  console.log("firstLevel SubDocuments");
                  console.log(documents);
                  res.json(documents);
              }
        });

  },

  getAllSubDocuments: function(req, res) {
    console.log("getDocuments");
    var sql = "SELECT * FROM document where status = true AND parent_id is not NULL";

       Doctype.query(sql, function(err, documents) {
              if(err) {
                console.log(err);
                return res.json({ err: err }, 500);
              } else {
                  console.log("firstLevel SubDocuments");
                  console.log(documents);
                  res.json(documents);
              }
        });

  },
 
  destroy : function(req,res){
      var regdocInClause = '',
          fileInClause   = '',
          fileInClausepath = '',
          deletedFiles   = [];
      var doctypeFormData = (req.body) ? req.body : undefined;
      async.series([
      function(callback) {
        console.log("destroy id :: "); console.log(doctypeFormData.document_id);
          var sql = "UPDATE document set status=false where id=?";
          Document.query(sql,[doctypeFormData.document_id],function (err ,doc) {
            if(err){
                console.log(err);
                callback(err);
            }else{
                console.log('document::'+ doc);
                //res.send('success'); 
                callback();
            }
          });
        },//select in regulation_document_link table
        function(callback) {
            var sql = "select id FROM regulation_document_link WHERE document_id=?";
            var params = [doctypeFormData.document_id];
            console.log("select regulation_document_link::params", params);
            regulation_document_link.query(sql, params, function (err, regdocument) {
              if (err) {
                console.log(err);
                Logger.log('error', 'DocTypeController.destroy', 'The following error occurred:', null, err);
                return res.json({ err: err }, 500);
              } else {
                console.log("regdocument");console.log(regdocument);            
                regdocInClause = '';
                if (regdocument.length > 0) {
                  regdocument.forEach(function(item, index) {
                    if (index == 0) {
                      regdocInClause = item.id;
                    } else {
                      regdocInClause = regdocInClause + ',' + item.id;
                    }
                  });
                  console.log("regdocInClause: ", regdocInClause);
                  callback();             
                } else {
                  callback();
                }  
              }
            });

        },
        //Selecting file_ids from regulation_document_file_link table
        function(callback) {
          if (regdocInClause != '') {
              var sql1 = "SELECT f.id, f.path FROM regulation_document_file_link rdfl, file f " +
                         " WHERE rdfl.file_id=f.id AND rdfl.regulation_document_id IN ( ";
              var sql= sql1 + regdocInClause + ')';
              console.log(sql);
              var params = [];
              console.log("select regulation_document_file_link::params", params);
              regulation_document_file_link.query(sql, params, function (err, files) {
                  if (err) {
                      console.log(err);
                    Logger.log('error', 'DocTypeController.destroy', 'The following error occurred:', null, err);
                      return res.json({ err: err }, 500);
                } else {
                      console.log('files', files);
                      // callback();             
                    if (files.length > 0) {
                      deletedFiles = files;
                       console.log("deletedFiles",deletedFiles);
                      files.forEach(function(item, index) {
                        if (index == 0) {
                          fileInClause = item.id;
                        } else {
                          fileInClause = fileInClause + ',' + item.id;
                        }
                      });
                      console.log("fileInClause: ", fileInClause);
                      callback();             
                    } else {
                      callback();
                    }

                    if (files.length > 0) {
                      deletedFiles = files;
                       console.log("deletedFiles",deletedFiles);
                      files.forEach(function(item, index) {
                        if (index == 0) {
                          fileInClausepath = item.path;
                        } else {
                          fileInClausepath= fileInClause + ',' + item.path;
                        }
                      });
                      console.log("fileInClausepath: ", fileInClausepath);
                      //callback();             
                    } else {
                      //callback();
                    }        
                }
              });
          } else {
            callback();
          }    
        },
        //DELETING in regulation_document_file_link table
        function(callback) {
          if (regdocInClause != '') {
              var sql1 = "DELETE FROM regulation_document_file_link WHERE regulation_document_id IN (";
              var sql= sql1 + regdocInClause + ')';
              var params = [];
              console.log("Deleteing regulation_document_file_link.");
              regulation_document_link.query(sql, params, function (err, result) {
                if (err) {
                  console.log(err);
                  Logger.log('error', 'DocTypeController.destroy', 'The following error occurred:', null, err);
                  return res.json({ err: err }, 500);
                } else{ 
                  callback();             
                }
              });
          } else {
            callback();
          }
        },      

        //DELETING from file table
        function(callback) {
          if (fileInClause != '') {
              var sql1 = "DELETE FROM file WHERE id IN (";
              var sql= sql1 + fileInClause + ')';
              var params = [];
              console.log("deleting file::params");console.log(params);
              regulation_document_link.query(sql, params, function (err, result) {
                if (err) {
                  console.log(err);
                  Logger.log('error', 'DocTypeController.destroy', 'The following error occurred:', null, err);
                  return res.json({ err: err }, 500);
                } else{ 
                  callback();             
                }
              });
          } else {
            callback();
          }
        }, 

        //DELETING in regulation_document_link table
        function(callback) {
            var sql = "DELETE FROM regulation_document_link WHERE document_id=?";
              var params = [doctypeFormData.document_id];
              console.log("deleting regulation_document_link::params");console.log(params);
              regulation_document_link.query(sql, params, function (err, result) {
                  if (err) {
                      console.log(err);
              Logger.log('error', 'DocTypeController.destroy', 'The following error occurred:', null, err);
                      return res.json({ err: err }, 500);
                } else{                    
                      callback();             
                  }
              });

        },
        //DELETING in subscription_detail table
        function(callback) {
            var sql = "DELETE FROM subscription_detail WHERE document_id=?";
              var params = [doctypeFormData.document_id];
              console.log("destroy subscription_detail::params");console.log(params);
              SubscriptionDetail.query(sql, params, function (err, result) {
                  if (err) {
                      console.log(err);
              Logger.log('error', 'DocTypeController.destroy', 'The following error occurred:', null, err);
                      return res.json({ err: err }, 500);
                } else {
                     
                      callback();             
                  }
              });

        },
        
        //deleting file in upload directory
        function(callback) { 
          console.log("fileInClausepath",fileInClausepath);
            if (fileInClausepath != '') {            
              Logger.log('debug', 'DocTypeController.destroy', ' delete the file from upload dir.', null, null);
              var deleteOptions  = {
                filePath  : basePathupload,
                filedeleted:fileInClausepath             
              };
              console.log("deleteOptionsupload",deleteOptions);
              Logger.log('debug', 'DocTypeController.destroy', ' deleteOptions::', deleteOptions, null);
                  FileManagerService.deleteFile(req, res, deleteOptions, function(err, fileContent) {
                    if (err) {
                      Logger.log('error', 'DocTypeController.destroy', 'The following error occurred (ERROR Deleteing file)', null, err);
                      callback(err);
                    } else {
                      Logger.log('debug', 'DocTypeController.destroy', 'deleting file in upload Done.', null, null);
                      //res.status(200).json(200);
                      callback();
                    }
              });
            }else {
              callback();
            }
        },
        //deleting file in publish directory
        function(callback) {
         if (fileInClausepath != '') {        
            Logger.log('debug', 'DocTypeController.destroy', ' delete the file from upload dir.', null, null);
            var deleteOptions  = {
              filePath  : basePath,
              filedeleted:fileInClausepath             
            };
            console.log("deleteOptionspublish",deleteOptions);
            Logger.log('debug', 'DocTypeController.destroy', ' deleteOptions::', deleteOptions, null);
                FileManagerService.deleteFile(req, res, deleteOptions, function(err, fileContent) {
                  if (err) {
                    Logger.log('error', 'DocTypeController.destroy', 'The following error occurred (ERROR Deleteing file) At STEP-3:', null, err);
                    callback(err);
                  } else {
                    Logger.log('debug', 'DocTypeController.destroy', 'deleting file in publish Done.', null, null);
                    callback();
                  }
            });
          }else {
            callback();
          }
        },

        ],function(err) {
          if (err) {
              console.log(err);
              if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while deleting document ' }, 500);
              else
                  return res.json({ err: err }, 500);
          } else {
              console.log('document in All link Deleted.');
              res.status(200).json(200);
               
          }
        });
  },


  documentType: function(req, res){
    var sql = "SELECT id,document_type FROM special_document_type";
      special_document_type.query(sql, function(err, docType) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master doc type");
                console.log(docType);
                res.json(docType);
            }
        });
  },
  
}