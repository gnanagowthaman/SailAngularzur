
var path = require('path');
var basePath = __dirname + '/../../assets/documents';
var basePathupload = __dirname + '/../../assets/documents/upload';
var basePathpublish = __dirname + '/../../assets/documents/publish';
var filepath;
//var filelimit = 6;

module.exports = {

    find: function(req, res) {
      var userConfig = req.session.userConfig;
      if (userConfig.full) {
        Logger.log('debug', 'DocumentController.find', 'FULL Access.', null, null);
        sql = "SELECT distinct g.id as gid, d.id as did, r.id as rid, doc.id as docid, " +
              "c.id as countryId, st.id as stateId, rgr.id as regulatorId, sdoc.id as subdocId, " +
              " g.name as Geography, d.name as Domain, r.name as Regulation, doc.name as Document, " +
              "c.name as Country, st.name as State, rgr.name as Regulator, sdoc.name as SubDocument" +
              " FROM geography g, domain d, regulation r, document doc,country c,state st,regulator rgr, subtype_document sdoc, regulation_document_link rdl " +
              " WHERE g.id=rdl.geography_id AND d.id=rdl.domain_id AND r.id=rdl.regulation_id AND doc.id=rdl.document_id AND " +
              " c.id=rdl.country_id AND st.id=rdl.state_id AND rgr.id=rdl.regulator_id AND sdoc.id=rdl.sub_document_id AND doc.status=true AND sdoc.status=true " +
              " ORDER BY g.name, d.name, r.name, doc.name, c.name, st.name, rgr.name, sdoc.name"; 
              
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
        var params = [];  
        console.log("full access");        
      } else {
        Logger.log('debug', 'DocumentController.find', 'RESTRICTED Access.', null, null);
        sql = " SELECT distinct sd.geography_id as gid, sd.domain_id as did, sd.regulation_id as rid, sd.document_id as docid," +
              " sd.country_id as countryId, sd.state_id as stateId, g.name as Geography, d.name as Domain," +
              "  c.name as Country, st.name as State, r.name as Regulation, dc.name as Document, sdoc.name as subDocument, rgr.name as Regulator " +
              " FROM subscription subs, subscription_detail sd, regulation_document_link sdl, country c , state st, " +
              " geography g, domain d, document dc, regulation r, subtype_document sdoc, regulator rgr ,regulator_regulation_link rrl " +
              " WHERE  sd.regulation_id = sdl.regulation_id AND sd.document_id = sdl.document_id AND sd.domain_id = d.id AND " +
              " sd.document_id = dc.id AND sd.country_id = c.id AND sd.state_id = st.id AND sd.regulation_id = r.id AND " + 
              " sd.document_id = sdl.document_id AND sdl.document_id = sdoc.id AND sd.regulation_id = rrl.regulation_id AND " +
              " rrl.regulator_id = r.id AND sd.subscription_id = subs.id  AND subs.user_id = ? AND dc.status=true AND sdoc.status=true ";
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
        var params = [req.session.user.id];
        console.log("restricted access");
      }
      Regulation.query(sql, params, function(err, result) {
            if (err) {
                Logger.log('error', 'DocumentController.find', 'The following error occurred:', null, err);
                return res.json(500, { errCode: 500 , errMsg: '' });
            } else {
                Logger.log('debug', 'DocumentController.find', 'Allowed Documents Sent', result, null);
                return res.json(200, result);
            }
      });
    }, 
    //This above function is used instead of below one.
    // find: function(req, res) {
    //   var userConfig = req.session.userConfig;
    //   if (userConfig.full) {
    //     Logger.log('debug', 'DocumentController.find', 'FULL Access.', null, null);
    //     sql = " SELECT g.id as gid, d.id as did, r.id as rid, doc.id as docid, g.name as Geography, d.name as Domain, r.name as Regulation, doc.name as Document, f.path as Path " +
    //           " FROM geography g, domain d, regulation r, document doc, regulation_document_link rdl, regulation_document_file_link rdfl, file f " +
    //           " WHERE g.id=rdl.geography_id AND d.id=rdl.domain_id AND r.id=rdl.regulation_id AND doc.id=rdl.document_id " +
    //           " AND rdl.id=rdfl.regulation_document_id AND rdfl.file_id=f.id AND rdfl.is_published=true "; 
    //     var params = [];  
    //     console.log("full access");        
    //   } else {
    //     Logger.log('debug', 'DocumentController.find', 'RESTRICTED Access.', null, null);
    //     sql = " SELECT g.id as gid, d.id as did, r.id as rid, doc.id as docid, g.name as Geography, d.name as Domain, r.name as Regulation, doc.name as Document, f.path as Path, sd.subscription_id as subscription_id" +
    //           " FROM geography g, domain d, regulation r, document doc, regulation_document_link rdl, subscription_detail sd, subscription s, user u, regulation_document_file_link rdfl, file f " +
    //           " WHERE g.id=rdl.geography_id AND d.id=rdl.domain_id AND r.id=rdl.regulation_id AND doc.id=rdl.document_id " +
    //           " AND rdl.geography_id=sd.geography_id AND rdl.domain_id=sd.domain_id AND rdl.regulation_id=sd.regulation_id AND rdl.document_id=sd.document_id " +
    //           " AND sd.subscription_id=s.id AND s.user_id=u.id AND u.id=? " +
    //           " AND rdl.id=rdfl.regulation_document_id AND rdfl.file_id=f.id AND rdfl.is_published=true ";       
    //     var params = [req.session.user.id];
    //     console.log("restricted access");
    //   }
    //   Regulation.query(sql, params, function(err, result) {
    //         if (err) {
    //             Logger.log('error', 'DocumentController.find', 'The following error occurred:', null, err);
    //             return res.json(500, { errCode: 500 , errMsg: 'No document available. Please Contact Administrator' });
    //         } else {
    //             Logger.log('debug', 'DocumentController.find', 'Allowed Documents Sent', result, null);
    //             return res.json(200, result);
    //         }
    //   });
    // },
    
    //To list documents in Document Upload Management Page    
    findByUserAccess: function(req, res) {
      var userConfig = req.session.userConfig;
      var sql = '';
      var params = [];
      if (userConfig.full) {
        console.log('FULL Access');
	      Logger.log('debug', 'DocumentController.findByUserAccess', 'FULL Access.', null, null);
        sql = " SELECT rdl.id as rdlid, g.id as gid, g.name as gname, d.id as did, d.name as dname, r.id as rid, r.name as rname, doc.id as docid, doc.name as docname, " +
              " country.id as coid, country.name as coname, st.id as stid, st.geography_id, st.name as stname, regtr.id as regtrId, regtr.name as regtrName, "  +
              " f.id as fid, f.name as fname, f.level, rdfl.is_uploaded as isuploaded, rdfl.is_published as ispublished, rdfl.tobepublished as tobepublished" +
              " FROM geography g, domain d, regulation r, document doc, country, state st, regulator regtr, regulation_document_link rdl, regulation_document_file_link rdfl, file f, " +
              " (select d.id as sdocid from document d where d.status=true AND d.parent_id is not NULL) as v " +
              " WHERE g.id=rdl.geography_id AND d.id=rdl.domain_id AND r.id=rdl.regulation_id AND doc.id=rdl.document_id AND doc.status=true AND doc.is_special_doc=false " +
              " AND st.id = rdl.state_id AND regtr.id = rdl.regulator_id AND v.sdocid = rdl.sub_document_id " +
              " AND rdl.id=rdfl.regulation_document_id AND rdfl.file_id=f.id AND country.id = rdl.country_id " ;
              // " AND g.status=true AND d.status=true AND country.status=true AND st.status=true AND regtr.status=true AND r.status=true AND doc.status=true ";
        if (req.param('limit') && req.param('limit') != undefined) {
        var limit = req.param('limit');
        sql = sql + "ORDER BY f.id DESC LIMIT " + limit;
        if (req.param('offset') && req.param('offset') != undefined) {
          var offset = req.param('offset');
          sql = sql + " OFFSET " + offset;
        } else {
          sql = sql + " OFFSET 0 ";
        }
       } 

      } else {
        Logger.log('debug', 'DocumentController.findByUserAccess', 'RESTRICTED Access.', null, null);
        // sql = " SELECT rdl.id, g.id as gid, g.name as gname, d.id as did, d.name as dname, r.id as rid, r.name as rname, doc.id as docid, doc.name as docname, " +
        //       " c.id as coid, c.name as cname, st.id as stid, st.name as stname, regtr.id as regtrId, regtr.name as regtrName, sdoc.id as sdocid, sdoc.name as sdocname, " +
        //       " f.id as fid, f.name as fname, f.level, rdfl.is_uploaded as isuploaded, rdfl.is_published as ispublished,  rdfl.tobepublished as tobepublished " +
        //       " FROM geography g, domain d, regulation r, document doc, country c,  state st, regulator regtr, subtype_document sdoc, regulator_regulation_link rrl, regulation_document_link rdl, subscription_detail sd, subscription s, user u, regulation_document_file_link rdfl, file f " +
        //       " WHERE g.id=rdl.geography_id AND d.id=rdl.domain_id AND r.id=rdl.regulation_id AND doc.id=rdl.document_id AND doc.status=true " +
        //       " AND c.id = rdl.country_id AND st.id =rdl.state_id AND regtr.id = rdl.regulator_id AND sdoc.id = rdl.sub_document_id AND sdoc.status=true " +
        //       " AND rdl.geography_id=sd.geography_id AND rdl.domain_id=sd.domain_id AND rdl.regulation_id=sd.regulation_id AND rdl.document_id=sd.document_id " +
        //       " AND rdl.country_id = sd.country_id AND rdl.state_id=sd.state_id AND sd.regulation_id = rrl.regulation_id AND rrl.regulator_id = r.id " +
        //       " AND sd.subscription_id=s.id AND s.user_id=u.id AND u.id=? " +
        //       " AND rdl.id=rdfl.regulation_document_id AND rdfl.file_id=f.id ";

        sql = " SELECT distinct rdl.id, g.id as gid, g.name as gname, d.id as did, d.name as dname, r.id as rid, r.name as rname, doc.id as docid, doc.name as docname, " + 
              " c.id as coid, c.name as cname, st.id as stid, st.name as stname, regtr.id as regtrId, regtr.name as regtrName,  " +
              " f.id as fid, f.name as fname, f.level, rdfl.is_uploaded as isuploaded, rdfl.is_published as ispublished,  rdfl.tobepublished as tobepublished  " +
              " FROM geography g, domain d, regulation r, document doc, country c, state st, regulator regtr, regulator_regulation_link rrl,  " +
              " (select d.id as id, status from document d where d.status=true AND d.parent_id is not NULL) as sdoc, regulation_document_link rdl,  " +
              " subscription_detail sd, subscription s, user u, regulation_document_file_link rdfl, file f  " +
              " WHERE g.id=rdl.geography_id AND d.id=rdl.domain_id AND r.id=rdl.regulation_id AND doc.id=rdl.document_id AND doc.status=true AND doc.is_special_doc=false " +
              " AND c.id = rdl.country_id AND st.id =rdl.state_id AND regtr.id = rdl.regulator_id AND sdoc.id = rdl.sub_document_id AND sdoc.status=true  " +
              " AND rdl.geography_id=sd.geography_id AND rdl.domain_id=sd.domain_id AND rdl.regulation_id=sd.regulation_id AND rdl.document_id=sd.document_id " + 
              " AND rdl.country_id = sd.country_id AND rdl.state_id=sd.state_id AND sd.regulation_id = rrl.regulation_id AND rrl.regulator_id = r.id  " +
              " AND sd.subscription_id=s.id AND s.user_id=u.id AND u.id=?  " +
              " AND rdl.id=rdfl.regulation_document_id AND rdfl.file_id=f.id " +
              " AND g.status=true AND d.status=true AND c.status=true AND st.status=true AND regtr.status=true AND r.status=true AND doc.status=true AND sdoc.status=true ";
        params = [req.session.user.id];          
         if (req.param('limit') && req.param('limit') != undefined) {
            var limit = req.param('limit');
            sql = sql + " ORDER BY f.id DESC LIMIT " + limit;
            console.log("sql",sql);

            if (req.param('offset') && req.param('offset') != undefined) {
              var offset = req.param('offset');
              sql = sql + " OFFSET " + offset;  
            } else {
              sql = sql + " OFFSET 0 ";
            }
        } else {
            if (req.param('fname') && req.param('fname') != undefined) {
                sql = sql + " AND fname LIKE '%" + req.param('fname') + "%'";
            }
            sql = sql + " ORDER BY f.id DESC";
        }     
      }
           
      Regulation.query(sql, params, function(err, result) {
        if(err) {
          Logger.log('error', 'DocumentController.findByUserAccess', 'The following error occurred:', null, err);
          return res.json(500, { errCode: 500 , errMsg: 'No document available. Please Contact Administrator' });
        } else {
          Logger.log('debug', 'DocumentController.findByUserAccess', 'Sent Documents ByUserAccess.', result, null);
          return res.json(200, result);
        }        
      });
    },

    // getAll : function(req,res) {
    //   var  sql = "SELECT distinct d.id as docid, d.name, g.id as gid, r.id as rid, do.id as did  FROM document d, geography g, regulation r, domain do, regulation_document_link l where l.regulation_id = r.id and l.geography_id = g.id and l.document_id = d.id and l.domain_id = do.id";
    //   User.query(sql, function(err, users) {
    //         if(err) {
    //           console.log(err);
    //           return res.json({ err: err }, 500);
    //         } else {
    //             console.log(users);
    //             res.json(users);
    //         }
    //     });

    // }, 

     getAll : function(req,res) {
      var  sql = "SELECT distinct l.id as rdlid, d.id as docid, d.name, g.id as gid, r.id as rlid, do.id as did, l.country_id as cntid, "+
                 "  l.state_id as sid, l.regulator_id as rid, l.sub_document_id as sdocid, d.is_special_doc FROM document d, "+
                  " geography g, regulation r, domain do, regulation_document_link l where l.regulation_id = r.id and "+
                  " l.geography_id = g.id and l.document_id = d.id and l.domain_id = do.id and " +
                  " g.status=true and r.status=true and do.status=true ";

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


    destroy: function(req, res) {
      var fid = req.params.fid;
      var filepath='';
      var fileInClausepath='';

      console.log("fid",fid);
      async.series([
        function(callback) {
          var sql="SELECT path from file where id=?"
          params=fid;
          File.query(sql,params,function (err ,path) {
            if(err){
                console.log(err);
                callback(err);
            }else{ 
              filepath=path;
               console.log('filepath::'+ JSON.stringify(filepath));

              if (filepath.length > 0) {
                  deletedFiles = filepath;
                  console.log("deletedFiles",deletedFiles);
                  filepath.forEach(function(item, index) {
                    if (index == 0) {
                      fileInClausepath = item.path;
                    } /*else {
                      fileInClausepath= fileInClause + ',' + item.path;
                    }*/
                  });
                  console.log("fileInClausepath: ", fileInClausepath);                        
              }               
              callback();
            }
          });
        },
        //deleting file in upload directory
        function(callback) { 
            if (fileInClausepath != '') {            
              Logger.log('debug', 'DocumentController.destroy', ' delete the file from upload dir.', null, null);
              var deleteOptions  = {
                basePath : basePathupload,
                filepath : fileInClausepath
                         
              };
              console.log("deleteOptions",deleteOptions.basePath);
              console.log("deleteOptions1",deleteOptions.filepath);
              Logger.log('debug', 'DocumentController.destroy', ' deleteOptions::', deleteOptions, null);
                  FileManagerService.deleteuploadedFile(req, res, deleteOptions, function(err, fileContent) {
                    if (err) {
                      Logger.log('error', 'DocumentController.destroy', 'The following error occurred (ERROR Deleteing Document)', null, err);
                      callback(err);
                    } else {
                      Logger.log('debug', 'DocumentController.destroy', 'deleting Document in upload Directory Done.', null, null);
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
              Logger.log('debug', 'DocumentController.destroy', ' delete the file from upload dir.', null, null);
              var deleteOptions  = {
                basePath : basePathpublish,
                filepath : fileInClausepath
                         
              };
              console.log("deleteOptions",deleteOptions.basePath);
              console.log("deleteOptions1",deleteOptions.filepath);
              Logger.log('debug', 'DocumentController.destroy', ' deleteOptions::', deleteOptions, null);
                  FileManagerService.deleteuploadedFile(req, res, deleteOptions, function(err, fileContent) {
                    if (err) {
                      Logger.log('error', 'DocumentController.destroy', 'The following error occurred (ERROR Deleteing Document)', null, err);
                      callback(err);
                    } else {
                      Logger.log('debug', 'DocumentController.destroy', 'deleting Document in publish Directory Done.', null, null);
                      //res.status(200).json(200);
                      callback();
                    }
              });
            }else {
              callback();
            }
        },
        function(callback) {
          Logger.log('debug', 'DocumentController.destroy', 'Destroying Document File ID: = ' + fid, null, null);
          File.destroy({id: fid}).exec(function (err, result) {
            if (err) {
              Logger.log('error', 'DocumentController.destroy', 'The following error occurred:', null, err);
              callback(err);
            } else {
              Logger.log('debug', 'DocumentController.destroy', 'File Deleted From File Table:: ', result, null);
              var sql = "DELETE FROM regulation_document_file_link WHERE file_id=?";
              var params = [fid];  
              File.query(sql, params, function (err, result) {
                if (err) {
                  Logger.log('error', 'DocumentController.destroy', 'The following error occurred:', null, err);
                  callback(err);
                } else {
                  Logger.log('debug', 'DocumentController.destroy', 'Document-File Link Deleted From regulation_document_file_link Table:: ', result, null);
                  callback();
                }
              });
            }
          });      
        }
      ],function(err) {
          if (err) {
              console.log(err);
              if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while deleting document ' }, 500);
              else
                  return res.json({ err: err }, 500);
          } else {
              console.log('document Deleted.');
              res.status(200).json(200);
               
          }
        });
  },

    publish: function(req, res) {
      var docFormData = (req.body) ? req.body : undefined;
      var fid = req.params.fid;
      var ispublished= docFormData.ispublished;
      var tobepublished=docFormData.tobepublished;
      Logger.log('debug', 'DocumentController.publish', 'Publishing Document[fid]: ' + fid, docFormData, null);
      fileData = {};
      async.series([
        // Update is_published[true] of regulation_document_file_link table
        function(callback) {
          Logger.log('debug', 'DocumentController.publish', 'STEP-1: Updating regulation_document_file_link table.', null, null);
          var sql = " UPDATE regulation_document_file_link SET is_published=?, published_by=?, published_date=now(), tobepublished=? " +
                    " WHERE file_id=? ";
          var params = [ispublished, req.session.user.id, tobepublished, fid];          
          File.query(sql, params, function(err, result) {
              if (err) {
                Logger.log('error', 'DocumentController.publish', 'The following error occurred At STEP-1:', null, err);
                callback(err);                   
              } else {                
                 callback(); 
              }                    
          });                                                     
        },
        // Find file from file table to get directory path of file
        function(callback) {
          Logger.log('debug', 'DocumentController.publish', 'STEP-2: Finding file path of file_id: ' + fid + ' from file table.', null, null);
          File.find({id: fid}).exec(function(err, result) {
              if (err) {
                Logger.log('error', 'DocumentController.publish', 'The following error occurred At STEP-2:', null, err);
                callback(err);                   
              } else {
                fileData = result;
                var dirName = '';
                var pathArray = fileData[0].path.split(path.sep);
                console.log('pathArray');console.log(pathArray);
                var noOfDirs = pathArray.length - 1; // ignoring file Name
                pathArray.forEach(function(item, idx) {
                  if (idx == 0) {
                    //do nothing, since it is blank space
                  } else if (idx == 1) {
                    dirName = item;  
                  } else if (idx < noOfDirs) {
                    dirName += path.sep + item; 
                  }
                });
                fileData[0].path = dirName;
                Logger.log('debug', 'DocumentController.publish', 'STEP-2: Directory Path::', dirName, null);                                         
                callback(); 
              }                    
          });    
        },
        // Read the file from upload dir & writes it to publish dir.
        function(callback) {          
          Logger.log('debug', 'DocumentController.publish', 'STEP-3: Read the file from upload dir & writes it to publish dir.', null, null);
          var readOptions  = {
            type      : 'upload',
            basePath  : basePath,
            dirName   : fileData[0].path,
            fileName  : fileData[0].name
          };
          Logger.log('debug', 'DocumentController.publish', 'STEP-3: readOptions::', readOptions, null);
          FileManagerService.readFile(req, res, readOptions, FileManagerService.returnFileContent, function(err, fileContent) {
            if (err) {
              Logger.log('error', 'DocumentController.publish', 'The following error occurred (ERROR Reading file) At STEP-3:', null, err);
              callback(err);
            } else {
                Logger.log('debug', 'DocumentController.publish', 'STEP-3: Reading fileContent Done.', null, null);
                var writeOptions = {
                  type      : 'publish',
                  basePath  : basePath,
                  dirName   : fileData[0].path,
                  fileName  : fileData[0].name,
                  fileContent : fileContent
                };
                FileManagerService.writeFile(req, res, writeOptions, FileManagerService.saveFileContentToFile, function(err, success) {
                  if (err) {
                    Logger.log('error', 'DocumentController.publish', 'The following error occurred (ERROR Writing file) At STEP-3:', null, err);
                    callback(err);
                  } else {
                    Logger.log('debug', 'DocumentController.publish', 'STEP-3: Writing fileContent Done.', null, null);
                    callback();
                  }
                });
            }
          });          
        },        

        // Deleting Json file if it exists
        function(callback) { 
          var file = fileData[0].name;              
          var fileTypePattern = /\.[0-9a-z]+$/i;
          var fileType = file.match(fileTypePattern);
          var jsonFile = file.replace(fileType, ".json");
          var jsonFilePath = basePath + path.sep + 'publish' + path.sep + fileData[0].path + path.sep + jsonFile;
          if(jsonFilePath != '') {
            console.log("jsonFilePath",jsonFilePath);
            var deleteOptions  = {
              filejson  : jsonFilePath,           
            };
            console.log("deleteOptions",deleteOptions);
            Logger.log('debug', 'FileUploadController.uploadFile', ' deleteOptions::', deleteOptions, null);
            FileManagerService.deletejsonFile(req, res, deleteOptions, function(err, deleteStatus) {
              if (err) {
                Logger.log('error', 'FileUploadController.uploadFile', 'The following error occurred (ERROR Deleteing json file)', null, err);
                callback(err);
              } else {
                Logger.log('debug', 'FileUploadController.uploadFile', ' While deleting json file: ', deleteStatus, null);
                callback();
              }
            });
          } else {
              callback();
          }
        }        

      ], function(err) {
            if (err) {
                console.log(err);
                return res.json({ err: err }, 500);
            } else {
               Logger.log('debug', 'DocumentController.publish', 'File Published Successfully.[fid]: ' + fid, null, null);
               res.status(200).json(200);
                // This (below) form of response adds this json - {docFormData} to backbone model attributes in front-end backbone.
                // res.status().json(200, {docFormData});
            }
      });

    },

    findOne: function(req, res) {
      var sql = " SELECT f.id, f.name as fname, f.path " +
                "   FROM regulation_document_link rdl, regulation_document_file_link rdfl, file f " +
                "  WHERE rdl.id=rdfl.regulation_document_id " +
                "    AND f.id=rdfl.file_id " +
                "    AND rdfl.is_published=true " +
                "    AND rdl.geography_id=? " +
                "    AND rdl.country_id=? " +
                "    AND rdl.state_id=? " +
                "    AND rdl.domain_id=? " +
                "    AND rdl.regulator_id=? " +
                "    AND rdl.regulation_id=? " +
                "    AND rdl.document_id=? " +
                "    AND rdl.sub_document_id=? ";
      var gid   = req.params.gid,
          cntid   = req.params.cntid,
          sid   = req.params.sid,
          did   = req.params.did,
          rid   = req.params.rid,
          rlid   = req.params.rlid,
          docid = req.params.docid;
          sdocid = req.params.sdocid;
      var params = [gid, cntid, sid, did, rid, rlid, docid, sdocid];

      console.log("fine one ++++++++++++++++++++++", params);

      File.query(sql, params, function(err, result) {
        if (err) {
          console.log(err);
          return res.json({ err: err }, 500);                   
        } else {
          var doc = (result.length == 1) ? result[0] : {};   

          console.log(doc);             
          res.json(doc); 
        }                    
      });
    },

    findSPOne: function(req, res) {
      var sql = " SELECT f.id, f.file_name as fname, f.document_link as path FROM special_document as f WHERE file_id=?"
      var params = [req.params.fid];

      console.log("fine one ++++++++++++++++++++++", params);

      File.query(sql, params, function(err, result) {
        if (err) {
          console.log(err);
          return res.json({ err: err }, 500);                   
        } else {
          var doc = (result.length == 1) ? result[0] : {};   

          console.log(doc);             
          res.json(doc); 
        }                    
      });
    },


    //Use in TreeView FilterType function to check the user has permission to access the chosen doc
    findSubscription: function(req, res) {
      var userConfig = req.session.userConfig;
      if (userConfig.full) {
        Logger.log('debug', 'DocumentController.find', 'FULL Access.', null, null);
        // sql = " SELECT distinct geography_id as gid, domain_id as did, regulation_id as rlid, document_id as docid, " +
        //       "country_id as cntid, state_id as sid, regulator_id rid, sub_document_id as sdocid " +
        //       "   FROM regulation_document_link"; 

        var sql = " SELECT distinct l.geography_id as gid, l.domain_id as did, l.regulation_id as rlid, l.document_id as docid, " + 
                  " l.country_id as cntid, l.state_id as sid, l.regulator_id rid, l.sub_document_id as sdocid  " +
                  " FROM regulation_document_link l, geography g, domain d, country cnt, state st, regulator regtr, regulation r, document doc, document sdoc " +
                  " WHERE g.id=l.geography_id AND d.id=l.domain_id AND r.id=l.regulation_id AND doc.id=l.document_id " +
                  " AND cnt.id=l.country_id AND st.id = l.state_id AND regtr.id = l.regulator_id AND sdoc.id = l.sub_document_id " +
                  " AND g.status=true AND d.status=true AND cnt.status=true AND st.status=true AND regtr.status=true AND r.status=true AND doc.status=true AND sdoc.status=true ";       
        var params = [];  
        console.log("full access");        
      } else {
        Logger.log('debug', 'DocumentController.find', 'RESTRICTED Access.', null, null);
        // sql = " SELECT sd.geography_id as gid, sd.domain_id as did, sd.regulation_id as rid, sd.document_id as docid " +
        //       "   FROM subscription_detail sd, subscription s, user u " +
        //       "  WHERE sd.subscription_id=s.id AND s.user_id=u.id AND u.id=?";

        var sql = " SELECT sd.geography_id as gid, sd.domain_id as did, sd.regulation_id as rid, sd.document_id as docid " +
                  " FROM subscription_detail sd, subscription s, user u, geography g, domain d, country cnt, state st, regulation r, document doc " +
                  " WHERE sd.subscription_id=s.id AND g.id=sd.geography_id AND d.id=sd.domain_id AND r.id=sd.regulation_id AND doc.id=sd.document_id " +
                  " AND cnt.id=sd.country_id AND st.id = sd.state_id " +
                  " AND g.status=true AND d.status=true AND cnt.status=true AND st.status=true AND r.status=true AND doc.status=true " +
                  " AND s.user_id=u.id AND u.id=?"
        var params = [req.session.user.id];
        console.log("restricted access");
      }
      Regulation.query(sql, params, function(err, result) {
            if (err) {
                Logger.log('error', 'DocumentController.find', 'The following error occurred:', null, err);
                return res.json(500, { errCode: 500 , errMsg: 'No document available.Please Contact Administrator' });
            } else {
                Logger.log('debug', 'DocumentController.find', 'Allowed Documents Sent', result, null);
                return res.json(200, result);
            }
      });
    },

    //To list Special Documents in Document Upload Management Page && SP Document Form Page(LifeTrackerManagementPageView)     
    findAllSpecialDocFiles: function(req, res) {
      //To list Special Documents for selected Root SP Doc in SP Document Form Page(LifeTrackerManagementPageView)
      if (req.param('geoId') && req.param('geoId') != undefined &&
          req.param('countryId') && req.param('countryId') != undefined &&
          req.param('stateId') && req.param('stateId') != undefined &&
          req.param('domainId') && req.param('domainId') != undefined &&
          req.param('regulatorId') && req.param('regulatorId') != undefined &&
          req.param('regId') && req.param('regId') != undefined &&
          req.param('regDocId') && req.param('regDocId') != undefined &&
          req.param('subDocId') && req.param('subDocId') != undefined) {
          var regulationDocLinkId = 0;
          var docId = req.param('regDocId');
          var spDocFileList = [];
          async.series([
            //Get id from regulation_document_link for the document uploaded.
            function(callback) {
                Logger.log('debug', 'DocumentController.findAllSpecialDocFiles', 'STEP-1: Get id from regulation_document_link for the document uploaded.', null, null);
                var sql = "SELECT id FROM  regulation_document_link rdl "+
                           " WHERE  rdl.geography_id =? "+
                            " and rdl.country_id =? "+
                            " and rdl.state_id = ? "+
                            " and rdl.domain_id = ? "+
                            " and rdl.regulator_id = ? "+
                            " and rdl.regulation_id = ? "+
                            " and rdl.document_id = ? "+
                            " and rdl.sub_document_id =? ";

                var params = [
                  req.param('geoId'),
                  req.param('countryId'),
                  req.param('stateId'),
                  req.param('domainId'),
                  req.param('regulatorId'),
                  req.param('regId'),
                  req.param('regDocId'),
                  req.param('subDocId'),
                ];  
                console.log(">>>>>>>>> PARAMS "+JSON.stringify(params)) ;
                File.query(sql, params, function(err, result) {
                    if (err) {
                        Logger.log('error', 'DocumentController.findAllSpecialDocFiles', 'The following error occurred At STEP-1:', null, err);
                        callback(err);                   
                    } else {                
                        if (result.length > 0) {
                          console.log(">>>>>>>>> regulationDocLinkId "+JSON.stringify(result)) ;
                          regulationDocLinkId = result[0].id;                          
                          callback();
                        } else { 
                          callback(err);
                        }
                    }                    
                });
            },

            function(callback) {
              Logger.log('debug', 'DocumentController.findAllSpecialDocFiles', 'STEP-2: Get Special doc files list from special_document for the document uploaded.', null, null);
              var sql = " SELECT sp.id as spid, date_format(sp.date , '%Y-%m-%d') as date, sp.description, spt.document_type, spt.id as document_type_id, sp.document_link, sp.type, sp.document_id, sp.regulation_document_id, sp.file_id, sp.file_name, sp.is_published, d.name as docname " +
                        " FROM special_document sp, document d , special_document_type spt " +
                        " WHERE sp.document_id=d.id AND spt.id=sp.document_type AND d.status=true AND sp.regulation_document_id=? AND sp.document_id=? ORDER BY sp.id DESC";
              File.query(sql, [regulationDocLinkId, docId], function(err, result) { 
                if (err) {
                  callback(err);
                  return res.json(500, { err: err });                   
                } else {
                  spDocFileList = result;  
                  console.log('SpecialDocFiles:::', spDocFileList);             
                  callback(); 
                }                    
              });            
            }
          ], function(err) {  
            if (err) {
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while finding AllSpecialDocFiles for chosen Special Doc. Please Contact Administrator.' });
            } else {
                Logger.log('debug', 'DocumentController.findAllSpecialDocFiles', 'Sent Special doc files list Successfully.', null, null);
                res.json(200, spDocFileList);
            }
          });


      } else {//to show in main fileupload page
              var sql = " SELECT sp.id as spid, date_format(sp.date , '%Y-%m-%d') as date, sp.description, spt.document_type, spt.id as document_type_id, sp.document_link, sp.type, sp.document_id, sp.regulation_document_id, sp.file_id, sp.file_name, sp.is_published, d.name as docname " +
                        " FROM special_document sp, document d , special_document_type spt " +
                        " WHERE sp.document_id=d.id AND spt.id=sp.document_type AND d.status=true";   
                         if (req.param('limit') && req.param('limit') != undefined) {
              var limit = req.param('limit');
              sql = sql + " ORDER BY sp.id DESC LIMIT " + limit;
              if (req.param('offset') && req.param('offset') != undefined) {
                var offset = req.param('offset');
                sql = sql + " OFFSET " + offset;
              } else {
                sql = sql + " OFFSET 0 ";
              }
            }         
        File.query(sql, [], function(err, result) {
          if (err) {
            console.log(err);
            return res.json(500, { err: err });                   
          } else {  
            console.log('SpecialDocFiles', result);             
            res.json(200, result); 
          }                    
        });
      }      
    },    

    publishSPDoc: function(req, res) {
      var docFormData = (req.body) ? req.body : undefined;
      var fid = req.params.spid;
      var ispublished = docFormData.ispublished;
      Logger.log('debug', 'DocumentController.publishSPDoc', 'Publishing Document[fid]: ' + fid, docFormData, null);
      fileData = {};
      async.series([
        // Update is_published[true] of special_document table
        function(callback) {
          Logger.log('debug', 'DocumentController.publish', 'STEP-1: Updating special_document table.', null, null);
          var sql = " UPDATE special_document SET is_published=true, published_by=?, published_date=now() " +
                    " WHERE id=? ";
          var params = [req.session.user.id, fid];          
          special_document.query(sql, params, function(err, result) {
              if (err) {
                Logger.log('error', 'DocumentController.publishSPDoc', 'The following error occurred At STEP-1:', null, err);
                callback(err);                   
              } else {
                 console.log();                 
                 callback(); 
              }                    
          });                                                     
        },
        // Find file from special_document table to get directory path of file
        function(callback) {
          Logger.log('debug', 'DocumentController.publishSPDoc', 'STEP-2: Finding file path of file_id: ' + fid + ' from file table.', null, null);
          special_document.find({id: fid}).exec(function(err, result) {
              if (err) {
                Logger.log('error', 'DocumentController.publishSPDoc', 'The following error occurred At STEP-2:', null, err);
                callback(err);                   
              } else {
                fileData = result;
                var dirName = '';
                var pathArray = fileData[0].document_link.split(path.sep);
                console.log('pathArray', pathArray);
                var noOfDirs = pathArray.length - 1; // ignoring file Name
                pathArray.forEach(function(item, idx) {
                  if (idx == 0) {
                    //do nothing, since it is blank space
                  } else if (idx == 1) {
                    dirName = item;  
                  } else if (idx < noOfDirs) {
                    dirName += path.sep + item; 
                  }
                });
                fileData[0].document_link = dirName;
                Logger.log('debug', 'DocumentController.publishSPDoc', 'STEP-2: Directory Path::', dirName, null);                                         
                callback(); 
              }                    
          });    
        },
        // Read the file from upload dir & writes it to publish dir.
        function(callback) {          
          Logger.log('debug', 'DocumentController.publishSPDoc', 'STEP-3: Read the file from upload dir & writes it to publish dir.', null, null);
          var readOptions  = {
            type      : 'upload',
            basePath  : basePath,
            dirName   : fileData[0].document_link,
            fileName  : fileData[0].file_name
          };
          Logger.log('debug', 'DocumentController.publishSPDoc', 'STEP-3: readOptions::', readOptions, null);
          FileManagerService.readFile(req, res, readOptions, FileManagerService.returnFileContent, function(err, fileContent) {
            if (err) {
              Logger.log('error', 'DocumentController.publishSPDoc', 'The following error occurred (ERROR Reading file) At STEP-3:', null, err);
              callback(err);
            } else {
                Logger.log('debug', 'DocumentController.publishSPDoc', 'STEP-3: Reading fileContent Done.', null, null);
                var writeOptions = {
                  type      : 'publish',
                  basePath  : basePath,
                  dirName   : fileData[0].document_link,
                  fileName  : fileData[0].file_name,
                  fileContent : fileContent
                };
                FileManagerService.writeFile(req, res, writeOptions, FileManagerService.saveFileContentToFile, function(err, success) {
                  if (err) {
                    Logger.log('error', 'DocumentController.publishSPDoc', 'The following error occurred (ERROR Writing file) At STEP-3:', null, err);
                    callback(err);
                  } else {
                    Logger.log('debug', 'DocumentController.publishSPDoc', 'STEP-3: Writing fileContent Done.', null, null);
                    callback();
                  }
                });
            }
          });          
        },        

        // Deleting Json file if it exists
        function(callback) { 
          var file = fileData[0].file_name;              
          var fileTypePattern = /\.[0-9a-z]+$/i;
          var fileType = file.match(fileTypePattern);
          var jsonFile = file.replace(fileType, ".json");
          var jsonFilePath = basePath + path.sep + 'publish' + path.sep + fileData[0].document_link + path.sep + jsonFile;
          if(jsonFilePath != '') {
            console.log("jsonFilePath",jsonFilePath);
            var deleteOptions  = {
              filejson  : jsonFilePath,           
            };
            console.log("deleteOptions",deleteOptions);
            Logger.log('debug', 'DocumentController.publish', ' deleteOptions::', deleteOptions, null);
            FileManagerService.deletejsonFile(req, res, deleteOptions, function(err, deleteStatus) {
              if (err) {
                Logger.log('error', 'DocumentController.publishSPDoc', 'The following error occurred (ERROR Deleteing json file)', null, err);
                callback(err);
              } else {
                Logger.log('debug', 'DocumentController.publishSPDoc', ' While deleting json file: ', deleteStatus, null);
                callback();
              }
            });
          } else {
              callback();
          }
        }        

      ], function(err) {
            if (err) {
                console.log(err);
                return res.json({ err: err }, 500);
            } else {
               Logger.log('debug', 'DocumentController.publishSPDoc', 'File Published Successfully.[fid]: ' + fid, null, null);
               res.status(200).json(200);
                // This (below) form of response adds this json - {docFormData} to backbone model attributes in front-end backbone.
                // res.status().json(200, {docFormData});
            }
      });

    }, 

    destroySPDoc: function(req, res) {
      var docFormData = (req.body) ? req.body : undefined;
      var spid = req.params.spid;
      var fid = 0;
      var fileInClausepath='';
      console.log("SPID====== ",spid);
      
      async.series([
        function(callback) {
          var sql="SELECT document_link, file_id from special_document where id=?"
          var params=[spid];
          File.query(sql,params,function (err ,spDoc) {
            if(err){
                console.log(err);
                callback(err);
            }else{ 
              // filepath=path;
               console.log('spDoc::'+ JSON.stringify(spDoc));
              if (spDoc.length > 0) {
                fileInClausepath = spDoc[0].document_link;
                fid = spDoc[0].file_id;
                console.log("FID===== ",fid);  
                console.log("fileInClausepath: ", fileInClausepath);                
              }               
              callback();
            }
          });
        },
        //deleting file in upload directory
        function(callback) { 
            if (fileInClausepath != '') {            
              Logger.log('debug', 'DocumentController.destroySPDoc', ' delete the file from upload dir.', null, null);
              var deleteOptions  = {
                basePath : basePathupload,
                filepath : fileInClausepath
                         
              };
              console.log("deleteOptions",deleteOptions.basePath);
              console.log("deleteOptions1",deleteOptions.filepath);
              Logger.log('debug', 'DocumentController.destroy', ' deleteOptions::', deleteOptions, null);
                  FileManagerService.deleteuploadedFile(req, res, deleteOptions, function(err, fileContent) {
                    if (err) {
                      Logger.log('error', 'DocumentController.destroySPDoc', 'The following error occurred (ERROR Deleteing Document)', null, err);
                      callback(err);
                    } else {
                      Logger.log('debug', 'DocumentController.destroySPDoc', 'deleting Document in upload Directory Done.', null, null);
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
              Logger.log('debug', 'DocumentController.destroySPDoc', ' delete the file from upload dir.', null, null);
              var deleteOptions  = {
                basePath : basePathpublish,
                filepath : fileInClausepath
                         
              };
              console.log("deleteOptions",deleteOptions.basePath);
              console.log("deleteOptions1",deleteOptions.filepath);
              Logger.log('debug', 'DocumentController.destroySPDoc', ' deleteOptions::', deleteOptions, null);
                  FileManagerService.deleteuploadedFile(req, res, deleteOptions, function(err, fileContent) {
                    if (err) {
                      Logger.log('error', 'DocumentController.destroySPDoc', 'The following error occurred (ERROR Deleteing Document)', null, err);
                      callback(err);
                    } else {
                      Logger.log('debug', 'DocumentController.destroySPDoc', 'deleting Document in publish Directory Done.', null, null);
                      //res.status(200).json(200);
                      callback();
                    }
              });
            }else {
              callback();
            }
        },
        //delete entry in special_document
        function(callback) {
          Logger.log('debug', 'DocumentController.destroySPDoc', 'Destroying SPDocument File ID: = ' + spid, null, null);
          special_document.destroy({id: spid}).exec(function (err, result) {
            if (err) {
              Logger.log('error', 'DocumentController.destroySPDoc', 'The following error occurred:', null, err);
              callback(err);
            } else {
              Logger.log('debug', 'DocumentController.destroySPDoc', 'File Deleted From File Table:: ', result, null);
              callback();
            }
          });      
        },
        //delete entry in file & regulation_document_file_link tables
        function(callback) {
          Logger.log('debug', 'DocumentController.destroySPDoc', 'Destroying Document File ID: = ' + fid, null, null);
          File.destroy({id: fid}).exec(function (err, result) {
            if (err) {
              Logger.log('error', 'DocumentController.destroySPDoc', 'The following error occurred:', null, err);
              callback(err);
            } else {
              Logger.log('debug', 'DocumentController.destroySPDoc', 'File Deleted From File Table:: ', result, null);
              var sql = "DELETE FROM regulation_document_file_link WHERE file_id=?";
              var params = [fid];  
              File.query(sql, params, function (err, result) {
                if (err) {
                  Logger.log('error', 'DocumentController.destroySPDoc', 'The following error occurred:', null, err);
                  callback(err);
                } else {
                  Logger.log('debug', 'DocumentController.destroySPDoc', 'Document-File Link Deleted From regulation_document_file_link Table:: ', result, null);
                  callback();
                }
              });
            }
          });      
        }
      ],function(err) {
          if (err) {
              console.log(err);
              if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while deleting document ' }, 500);
              else
                  return res.json(500, { err: err });
          } else {
              console.log('document Deleted.');
              res.status(200).json(200);
               
          }
      });
  },  

  //The below function no longer used ##06-NOV-2017 By Niranjan
  getSpclDocData: function(req, res){
    console.log("specialDoc");
      var sql = "SELECT description,file_name,date,document_type FROM special_document WHERE id = ? and status=true";
      special_document.query(sql,[req.params.spid], function(err, specialDoc) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master specialDoc");
                console.log(specialDoc);
                res.json(specialDoc);
            }
        });
  }
}
