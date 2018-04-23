var fs = require('fs');
var path = require('path');
var basePath = __dirname + '/../../assets/documents';
var profileImagePath = __dirname +'/../../assets/images';
var imageTempPath = __dirname + '/../../.tmp/public/images';
var basePathupload = __dirname + '/../../assets/documents/upload';
var basePathpublish = __dirname + '/../../assets/documents/publish';
module.exports = {

    uploadFile: function(req, res) {
        fileData = {};
        regulationDocLinkId = 0;
        // country, state and subdocument ids
       var dcntid = req.body.countryId;
       var dstid = req.body.stateId;
       var dsdid = req.body.subdocId;
//       var dlevel = req.body.level;
        if ( ! dcntid && dcntid == null )
            dcntid =""+ 23;
        if ( ! dstid && dstid == null )
            dstid = ""+18;
        if ( ! dsdid && dsdid == null )
            dsdid = ""+10;
 //       if ( ! dlevel && dlevel == null )
 //           dlevel = ""+1;
        var uploadedFiles = {};
        async.series([

            //Check file is uploaded already (if an entry exist in regulation_document_file_link table) or not
            function(callback) {
                Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-2: Checking File Already Uploaded & set mode create/update.', null, null);
               
             
                          var sql = "SELECT id FROM  regulation_document_link rdl "+
                                     " WHERE  rdl.geography_id =? "+
                                      " and rdl.country_id =? "+
                                      " and rdl.state_id = ? "+
                                      " and rdl.domain_id = ? "+
                                      " and rdl.regulator_id = ? "+
                                      " and rdl.regulation_id = ? "+
                                      " and rdl.document_id = ? "+
                                      " and rdl.sub_document_id =? ";

                var params = [req.body.geoId,dcntid,
                                dstid,req.body.domainId,req.body.reglatorId,req.body.regulationId,
                                req.body.regDocId,dsdid];  
                    console.log(">>>>>>>>> data "+JSON.stringify(params)) ;

                File.query(sql, params, function(err, result) {
                    if (err) {
                        Logger.log('error', 'FileUploadController.uploadFile', 'The following error occurred (While Checking File Already Uploaded) At STEP-2:', null, err);
                        callback(err);                   
                    } else {                
                        if (result.length > 0) { //mode is update
                            console.log(">>>>>>>>> data1"+JSON.stringify(result)) ;
                           regulationDocLinkId = result[0].id;
                            
                            callback();
                        } else { 
                                callback(err);
                        }
                    }                    
                });
            },

            //Check file is uploaded already (if an entry exist in regulation_document_file_link table) or not
            function(callback) {
                Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-2: Checking File Already Uploaded & set mode create/update.', null, null);
               
              /* var sql = "SELECT file_id FROM regulation_document_file_link " +
                          " WHERE regulation_document_id=? AND level=? ";     */      

                  var sql = "SELECT file_id , regulation_document_id FROM regulation_document_file_link rdfl "+
                                     " WHERE   "+
                                     "  rdfl.regulation_document_id = ? "; 
                                      

                var params = [regulationDocLinkId];   

                File.query(sql, params, function(err, result) {
                    if (err) {
                        Logger.log('error', 'FileUploadController.uploadFile', 'The following error occurred (While Checking File Already Uploaded) At STEP-2:', null, err);
                        callback(err);                   
                    } else {                
                        if (result.length > 0) { //mode is update
                            fileData.fileId = result[0].file_id;
                            fileData.fileLink = result[0].regulation_document_id;
                            fileData.mode = 'update';
                            callback();
                        } else { // mode is insert
                            fileData.mode = 'insert';
                            callback();
                        }
                    }                    
                });
            },
            //Insert/Update file table & regulation_document_file_link table
            function(callback) {                
                Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-3: Inserting OR Updating into file & regulation_document_file_link Tables [fileData]:: ', fileData, null);
                if (new String(fileData.mode).valueOf() == new String('update').valueOf()) {
                    Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-3: Updating!!!', null, null);
                    var sql = " UPDATE file SET name=?, path=?, type=?  " +
                              " WHERE id=? ";
                    var pathWithName = req.body.path + path.sep + req.body.fileName;          
                    var params = [req.body.fileName, pathWithName, req.body.fileType,  fileData.fileId]; 
                    console.log("in step 3 ::::",params)         
                    File.query(sql, params, function(err, result) {
                        if (err) {
                          Logger.log('error', 'FileUploadController.uploadFile', 'The following error occurred (While Updating File Table) At STEP-3:', null, err);
                          callback(err);                   
                        } else {                
                            var sql = " UPDATE regulation_document_file_link SET  uploaded_by=?, uploaded_date=now(),tobepublished=false " +
                                      " WHERE regulation_document_id=? ";
                            var params = [ req.session.user.id, fileData.fileLink];  
                            console.log("paramms 2::", params);        
                            File.query(sql, params, function(err, result) {
                                if (err) {
                                    Logger.log('error', 'FileUploadController.uploadFile', 'The following error occurred (While Updating regulation_document_file_link Table) At STEP-3:', null, err);
                                    callback(err);                   
                                } else {                
                                    callback(); 
                                }                    
                            });                                                      
                        }                    
                    });
                } else { //insert    

                   
                    Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-3: Inserting!!!', null, null);
                    var createValues = 
                        { name  : req.body.fileName,
                          path  : req.body.path + path.sep + req.body.fileName,
                          type  : req.body.fileType
                         // level : dlevel ,
                        };
                    console.log("createValues :::::" , createValues);
                    File.create(createValues).exec(function(err, file) {  
                        if (err) {
                            Logger.log('error', 'FileUploadController.uploadFile', 'The following error occurred (While Inserting Into File Table) At STEP-3:', null, err);
                            callback(err);
                        } else {
                            Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-3: File inserted into file Table [file]:: ', file, null);
                            var sql = " INSERT INTO regulation_document_file_link " +
                                      " (regulation_document_id, file_id,  is_uploaded, is_published, " + 
                                      " uploaded_by, published_by, uploaded_date, published_date, tobepublished) " +
                                      " VALUES (?, ?,  true, false, ?, null, now(), null,false) ";
                            var params = [regulationDocLinkId, file.id,  req.session.user.id];  
                            console.log("paramss",params);       
                            File.query(sql, params, function(err, result) {
                                if (err) {
                                    Logger.log('error', 'FileUploadController.uploadFile', 'The following error occurred (While Inserting Into regulation_document_file_link Table) At STEP-3:', null, err);
                                    callback(err);
                                } else {
                                    Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-3: A Record inserted into regulation_document_file_link Table. ', null, null);
                                    callback();
                                }
                            });          
                        }
                        
                    });    

                }

            },

            //save uploaded file to disk
            function(callback) {                
                var writeOptions = {
                    type      : 'upload',
                    basePath  : basePath,
                    dirName   : req.body.path,
                    fileName  : req.body.fileName
                };

                console.log("upload checking _++++++++++++++++++++++++++++++" + writeOptions);
                Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-4: Uploading File: ' + req.body.fileName, writeOptions, null);
                FileManagerService.uploadFile(req, res, writeOptions, FileManagerService.saveFileToDisk, function(err, files) {
                    if (err) {
                        Logger.log('error', 'FileUploadController.uploadFile', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                    
                    } else {
                        Logger.log('debug', 'FileUploadController.uploadFile', 'STEP-4: Writing fileContent Done.', null, null);
                        var stats = fs.statSync(writeOptions.uploadPath);
                        console.log('STATS: ', stats);
                        uploadedFiles = files;
                        callback();                
                    }    
                }); 
            }
            
            // //Insert an Alert
            // function(callback){
            //     var messageformData = (req.body) ? req.body : undefined;
            //     console.log(messageformData);
            //     console.log('STEP-1:Insert into table alert table');
            //     var params = [messageformData.message, req.body.domainName, 
            //                  req.body.geoName, req.body.regName, req.body.docName, 
            //                  req.body.countryName, req.body.stateName, 
            //                  req.body.regulatorName, req.body.subDocName,
            //                  regulationDocLinkId, parseInt(req.body.geoId, 10),
            //                  parseInt(req.body.geoId, 10),
            //                  parseInt(dcntid, 10),
            //                  parseInt(dstid, 10),
            //                  parseInt(req.body.domainId, 10),
            //                  parseInt(req.body.reglatorId, 10),
            //                  parseInt(req.body.regulationId, 10),
            //                  parseInt(dsdid, 10),
            //                  parseInt(dsdid, 10)];  

            //     console.log("params");console.log(params);
            //     var sql = "INSERT into table_alert (message,domain,geography,regulation,doctype,country,state, "+
            //                " regulator,subdocument,regdocid, geography_id, country_id, state_id, domain_id,"+
            //                " regulator_id, regulation_id, doctype_id, subdoctype_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            //     alert_model.query(sql,params,function(err, result) {  
            //     if(err) {
            //       console.log(err);
            //       callback(err);
            //     } else {
            //       console.log(result);                               
            //       callback();
            //     }            
            //   });

            // }

        ], function(err) {
            if (err) {
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while uploading File. Please Contact Administrator.' });
            } else {
                Logger.log('debug', 'FileUploadController.uploadFile', 'File[' + req.body.fileName + '] Uploaded Successfully.', null, null);
                // res.status(200).json(200);
                return res.json({
                 message: req.body.fileName + ' file uploaded successfully!',
                  files: uploadedFiles
                });                
            }
      });
       
    },

    uploadProfileImage:function(req, res){                    
        var writeOptions = {
            type      : 'profile',
            basePath  : profileImagePath,
            dirName   : 'photo',
            fileName  : req.body.fileName
        };               
        Logger.log('debug', 'FileUploadController.uploadProfileImage', 'STEP-1: Uploading File: ' + req.body.fileName, writeOptions, null);
            FileManagerService.uploadFile(req, res, writeOptions, FileManagerService.saveFileToDisk, function(err, files) {
                if (err) {
                    Logger.log('error', 'FileUploadController.uploadProfileImage', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                                        
                } else {
                    Logger.log('debug', 'FileUploadController.uploadProfileImage', 'STEP-1: Writing fileContent Done.', null, null);
                     var imagePath =  path.sep + 'images' +
                           path.sep + req.body.type +
                           path.sep + 'photo' +
                           path.sep + req.body.fileName
                           console.log(imagePath);
                           res.json({ status: 200, imagePath: imagePath });                    
                    var profile_image_link = imagePath;
                    req.session.user.profile_image_link = profile_image_link;
                    console.log("image link ---->"+req.session.user.profile_image_link);                        
                    req.session.save(function(err) { 
                        if(err) 
                            console.log(err);
                    });
                    FileManagerService.createFileLink(writeOptions,imageTempPath);
                    var params = [profile_image_link,req.session.user.id];                    
                    var sql = "UPDATE user SET profile_image_link=? WHERE id=? ";                         
                    User.query(sql, params, function(err, result) {
                            if (err) {
                                Logger.log('error', 'FileUploadController.uploadProfileImage', 'The following error occurred:', null, err);
                                                  
                            } else {                
                            Logger.log('debug', 'UserController.update', 'STEP-1:Updated User::', result, null);

                            console.log(result);
                            }                    
                        });         
                }    
            });         

    },

       uploadSpecialFile: function(req, res) {
        var fileData = {};
        var regulationDocLinkId = 0;
        var spDocFile = {};
        var dcntid = req.body.countryId;
        var dstid = req.body.stateId;
        var dsdid = req.body.subdocId;
  //       var dlevel = req.body.level;
          if ( ! dcntid && dcntid == null )
              dcntid =""+ 23;
          if ( ! dstid && dstid == null )
              dstid = ""+18;
          if ( ! dsdid && dsdid == null )
              dsdid = ""+10;
        async.series([

            //Get id from regulation_document_link for the document uploaded.
            function(callback) {
                Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-2: Checking File Already Uploaded & set mode create/update.', null, null);
               
             
                          var sql = "SELECT id FROM  regulation_document_link rdl "+
                                     " WHERE  rdl.geography_id =? "+
                                      " and rdl.country_id =? "+
                                      " and rdl.state_id = ? "+
                                      " and rdl.domain_id = ? "+
                                      " and rdl.regulator_id = ? "+
                                      " and rdl.regulation_id = ? "+
                                      " and rdl.document_id = ? "+
                                      " and rdl.sub_document_id =? ";

                var params = [req.body.geoId,dcntid,
                                dstid,req.body.domainId,req.body.reglatorId,req.body.regulationId,
                                req.body.regDocId,dsdid];  
                    console.log(">>>>>>>>> data "+JSON.stringify(params)) ;

                File.query(sql, params, function(err, result) {
                    if (err) {
                        Logger.log('error', 'FileUploadController.uploadSpecialFile', 'The following error occurred (While Checking File Already Uploaded) At STEP-2:', null, err);
                        callback(err);                   
                    } else {                
                        if (result.length > 0) { //mode is update
                            console.log(">>>>>>>>> data1"+JSON.stringify(result)) ;
                           regulationDocLinkId = result[0].id;
                            
                            callback();
                        } else { 
                                callback(err);
                        }
                    }                    
                });
            },

            //Bellow function not required for special document By Niranjan

            //Check file is uploaded already (if an entry exist in regulation_document_file_link table) or not
            // function(callback) {
            //     Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-2: Checking File Already Uploaded & set mode create/update.', null, null);
               
            //   /* var sql = "SELECT file_id FROM regulation_document_file_link " +
            //               " WHERE regulation_document_id=? AND level=? ";     */      

            //       var sql = "SELECT file_id , regulation_document_id FROM regulation_document_file_link rdfl "+
            //                          " WHERE   "+
            //                          "  rdfl.regulation_document_id = ? "; 
                                      

            //     var params = [regulationDocLinkId];   

            //     File.query(sql, params, function(err, result) {
            //         if (err) {
            //             Logger.log('error', 'FileUploadController.uploadSpecialFile', 'The following error occurred (While Checking File Already Uploaded) At STEP-2:', null, err);
            //             callback(err);                   
            //         } else {                
            //             if (result.length > 0) { //mode is update
            //                 fileData.fileId = result[0].file_id;
            //                 fileData.fileLink = result[0].regulation_document_id;
            //                 fileData.mode = 'update';
            //                 callback();
            //             } else { // mode is insert
            //                 fileData.mode = 'insert';
            //                 callback();
            //             }
            //         }                    
            //     });
            // },
            //Insert/Update file table & regulation_document_file_link table
            function(callback) {                
                Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-3: Inserting OR Updating into file & regulation_document_file_link Tables [fileData]:: ', fileData, null);
                // if (new String(fileData.mode).valueOf() == new String('update').valueOf()) {
                //     Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-3: Updating!!!', null, null);
                //     var sql = " UPDATE file SET name=?, path=?, type=?  " +
                //               " WHERE id=? ";
                //     var pathWithName = req.body.path + path.sep + req.body.fileName;          
                //     var params = [req.body.fileName, pathWithName, req.body.fileType,  fileData.fileId]; 
                //     console.log("in step 3 ::::",params)         
                //     File.query(sql, params, function(err, result) {
                //         if (err) {
                //           Logger.log('error', 'FileUploadController.uploadSpecialFile', 'The following error occurred (While Updating File Table) At STEP-3:', null, err);
                //           callback(err);                   
                //         } else {                
                //             var sql = " UPDATE regulation_document_file_link SET uploaded_by=?, uploaded_date=now(),tobepublished=false " +
                //                       " WHERE regulation_document_id=? ";
                //             var params = [ req.session.user.id, fileData.fileLink];  
                //             console.log("paramms 2::", params);        
                //             File.query(sql, params, function(err, result) {
                //                 if (err) {
                //                     Logger.log('error', 'FileUploadController.uploadSpecialFile', 'The following error occurred (While Updating regulation_document_file_link Table) At STEP-3:', null, err);
                //                     callback(err);                   
                //                 } else {                
                //                     callback(); 
                //                 }                    
                //             });                                                      
                //         }                    
                //     });
                // } else { //insert    

                   
                    Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-3: Inserting!!!', null, null);
                    var createValues = 
                        { name  : req.body.fileName,
                          path  : req.body.path + path.sep + req.body.fileName,
                          type  : req.body.fileType
                      //    level : dlevel ,
                        };
                    console.log("createValues :::::" , createValues);
                    File.create(createValues).exec(function(err, file) {  
                        if (err) {
                            Logger.log('error', 'FileUploadController.uploadSpecialFile', 'The following error occurred (While Inserting Into File Table) At STEP-3:', null, err);
                            callback(err);
                        } else {
                            Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-3: File inserted into file Table [file]:: ', file, null);
                            var sql = " INSERT INTO regulation_document_file_link " +
                                      " (regulation_document_id, file_id,  is_uploaded, is_published, " + 
                                      " uploaded_by, published_by, uploaded_date, published_date, tobepublished) " +
                                      " VALUES (?, ?,  true, false, ?, null, now(), null,false) ";
                            var params = [regulationDocLinkId, file.id,  req.session.user.id];
                            fileData.fileId = file.id;  
                            console.log("paramss",params);       
                            File.query(sql, params, function(err, result) {
                                if (err) {
                                    Logger.log('error', 'FileUploadController.uploadSpecialFile', 'The following error occurred (While Inserting Into regulation_document_file_link Table) At STEP-3:', null, err);
                                    callback(err);
                                } else {
                                    Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-3: A Record inserted into regulation_document_file_link Table. ', null, null);
                                    callback();
                                }
                            });          
                        }
                        
                    });    

                // }

            },

            //Insert in to special_document
            function(callback){
                var messageformData = (req.body) ? req.body : undefined;
                console.log(messageformData);
                console.log('STEP-1:Insert into special_document table');
                var pathWithName = req.body.path + path.sep + req.body.fileName;     
                console.log(pathWithName);     
              //  var params = [req.body.fileName, pathWithName, req.body.fileType, req.body.level, fileData.fileId]; 
                // var params = [  messageformData.date, 
                //                 req.body.description, 
                //                 req.body.spclDocId, 
                //                 pathWithName,
                //                 req.body.fileType,
                //                 req.body.regDocId,                                                                  
                //                 regulationDocLinkId,
                //                 fileData.fileId,
                //                 true,
                //                 req.session.user.id,
                //                 req.session.user.id,
                //              ];  

                // console.log("params", params);
                // var sql = " INSERT into special_document " + 
                //           " (date, description, document_type, document_link, type, document_id, regulation_document_id, file_id, is_uploaded, uploaded_by, created_by, uploaded_date, created_date) "+
                //           " VALUES(?,?,?,?,?,?,?,?,?,?,?,now(),now()) ";

                var createValues = 
                    { date  : messageformData.date,
                      description  : req.body.description,
                      document_type  : req.body.spclDocId,
                      document_link : pathWithName, 
                      type: req.body.fileType,
                      document_id: req.body.regDocId, 
                      regulation_document_id: regulationDocLinkId, 
                      file_id: fileData.fileId,
                      file_name: req.body.fileName, 
                      is_uploaded: true,
                      is_published: false, 
                      uploaded_by: req.session.user.id, 
                      created_by: req.session.user.id
                    }; 
                console.log("createValues", createValues);                                             
                // special_document.query(sql,params,function(err, result) {
                special_document.create(createValues).exec(function(err, result) {   
                    if(err) {
                      console.log(err);
                      callback(err);
                    } else {
                      console.log(result);
                      spDocFile.spid = result.id;
                      spDocFile.date = messageformData.date;// result.date; commented by Niranjan for formatting
                      spDocFile.description = result.description;
                      spDocFile.document_type = parseInt(result.document_type,10);
                      spDocFile.document_link = result.document_link;
                      spDocFile.type = result.type;
                      spDocFile.document_id = parseInt(result.document_id,10);
                      spDocFile.regulation_document_id = parseInt(result.regulation_document_id,10);
                      spDocFile.file_id = parseInt(result.file_id,10);
                      spDocFile.file_name = result.file_name;
                      spDocFile.is_uploaded = result.is_uploaded;
                      spDocFile.is_published = result.is_published;
                      callback();
                    }            
                });

            },
            //save uploaded file to disk
            function(callback) {                
                var writeOptions = {
                    type      : 'upload',
                    basePath  : basePath,
                    dirName   : req.body.path,
                    fileName  : req.body.fileName
                };

                console.log("upload checking _++++++++++++++++++++++++++++++" + writeOptions);
                Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-1: Uploading File: ' + req.body.fileName, writeOptions, null);
                FileManagerService.uploadFile(req, res, writeOptions, FileManagerService.saveFileToDisk, function(err, files) {
                    if (err) {
                        Logger.log('error', 'FileUploadController.uploadSpecialFile', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                    
                    } else {
                        Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'STEP-1: Writing fileContent Done.', null, null);
                        callback();                
                    }    
                }); 
            },
            //Insert an Alert
            function(callback){
                var messageformData = (req.body) ? req.body : undefined;
                console.log(messageformData);
                console.log('STEP-1:Insert into table alert table');
                var params = [messageformData.message, req.body.domainName, 
                             req.body.geoName, req.body.regName, req.body.docName, 
                             req.body.countryName, req.body.stateName, 
                             req.body.regulatorName, req.body.subDocName,
                             regulationDocLinkId, parseInt(req.body.geoId, 10),
                             parseInt(req.body.geoId, 10),
                             parseInt(dcntid, 10),
                             parseInt(dstid, 10),
                             parseInt(req.body.domainId, 10),
                             parseInt(req.body.reglatorId, 10),
                             parseInt(req.body.regulationId, 10),
                             parseInt(dsdid, 10),
                             parseInt(dsdid, 10)];  

                console.log("params");console.log(params);
                var sql = "INSERT into table_alert (message,domain,geography,regulation,doctype,country,state, "+
                           " regulator,subdocument,regdocid, geography_id, country_id, state_id, domain_id,"+
                           " regulator_id, regulation_id, doctype_id, subdoctype_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                alert_model.query(sql,params,function(err, result) {  
                if(err) {
                  console.log(err);
                  callback(err);
                } else {
                  console.log(result);                               
                  callback();
                }            
              });

            }                        

        ], function(err) {
            if (err) {
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while uploading File. Please Contact Administrator.' });
            } else {
                Logger.log('debug', 'FileUploadController.uploadSpecialFile', 'File[' + req.body.fileName + '] Uploaded Successfully.', spDocFile, null);
                res.json(200, spDocFile);
            }
      });
       
    },

    uploadSpecialFileEdit: function(req, res) {
      console.log("FORM_DATA: ", req.body);
        var regDocLink = {};
        var spclDocId = req.body.spclDocId;
        var description = req.body.description;
        var date1 = req.body.date;
        var spid = req.body.spid;
        var rdlid = req.body.rdlid;
        var fileName = req.body.fileName;
        var oldFileName = req.body.oldFileName;
        var fileType = req.body.fileType;
        var path = req.body.path;
        var file_id = req.body.file_id;

        async.series([

            //deleting file in upload directory
            function(callback) { 
                if (fileName != undefined && fileName != "") {            
                  Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', ' delete the OLD-FILE ['+ oldFileName +'] from upload dir.', null, null);
                  var deleteOptions  = {
                    basePath : basePathupload,
                    filepath : path+oldFileName
                             
                  };
                  console.log("deleteOptions",deleteOptions.basePath);
                  console.log("deleteOptions1",deleteOptions.filepath);
                  Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', ' deleteOptions::', deleteOptions, null);
                      FileManagerService.deleteuploadedFile(req, res, deleteOptions, function(err, fileContent) {
                        if (err) {
                          Logger.log('error', 'FileUploadController.uploadSpecialFileEdit', 'The following error occurred (ERROR Deleteing Document)', null, err);
                          callback(err);
                        } else {
                          Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', 'deleting Document in upload Directory Done.', null, null);
                          //res.status(200).json(200);
                          callback();
                        }
                  });
                } else {
                  callback();
                }
            },
            //deleting file in publish directory
            function(callback) { 
                if (fileName != undefined && fileName != "") {            
                  Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', ' delete the OLD-FILE ['+ oldFileName +'] from publish dir.', null, null);
                  var deleteOptions  = {
                    basePath : basePathpublish,
                    filepath : path+oldFileName
                             
                  };
                  console.log("deleteOptions",deleteOptions.basePath);
                  console.log("deleteOptions1",deleteOptions.filepath);
                  Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', ' deleteOptions::', deleteOptions, null);
                      FileManagerService.deleteuploadedFile(req, res, deleteOptions, function(err, fileContent) {
                        if (err) {
                          Logger.log('error', 'FileUploadController.uploadSpecialFileEdit', 'The following error occurred (ERROR Deleteing Document)', null, err);
                          callback(err);
                        } else {
                          Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', 'deleting Document in publish Directory Done.', null, null);
                          //res.status(200).json(200);
                          callback();
                        }
                  });
                } else {
                  callback();
                }
            },
            //update special_document table
            function(callback){            
                console.log('STEP-1:update special_document table');
                var sql = '';
                var params = [];
                if (fileName == undefined) {
                  sql = " update special_document set date=?, description=?, document_type=?, uploaded_by=?, created_by=?, modified_date=now() where id=? ";
                  params = [  date1, 
                              description, 
                              spclDocId, 
                              req.session.user.id,
                              req.session.user.id,
                              spid
                           ];
                } else {
                  sql = " update special_document set date=?, description=?, document_type=?, document_link=?, type=?, file_name=?, is_uploaded=?, is_published=?, uploaded_by=?, created_by=?, modified_date=now() where id=? ";
                  params = [  date1, 
                              description, 
                              spclDocId,
                              path+fileName,
                              fileType,
                              fileName,
                              true,
                              false,
                              req.session.user.id,
                              req.session.user.id,
                              spid
                           ];
                }              
                console.log("params", params);
                special_document.query(sql, params, function(err, result) {
                  if(err) {
                    console.log(err);
                    callback(err);
                  }else {
                    console.log(result);
                    callback();
                  }
                });
            },
              //update file table
            function(callback){            
                console.log('STEP-1:update file table');
                var sql = '';
                var params = [];
                  sql = " update file set name=?, path=?, type=? where id=? ";
                  params = [ 
                              fileName, 
                              path+fileName,            
                              fileType,
                              file_id
                             
                           ];
                            
                console.log("params", params);
                File.query(sql, params, function(err, result) {
                  if(err) {
                    console.log(err);
                    callback(err);
                  }else {
                    console.log(result);
                    callback();
                  }
                });
            },

             //update rdfl table
            function(callback){            
                console.log('STEP-1:update rdfl table');
                var sql = '';
                var params = [];
                  sql = " update regulation_document_file_link set is_published=false, is_uploaded=true where file_id=? and regulation_document_id=?";
                  params = [ 
                              
                              file_id,
                              rdlid
                             
                           ];
                            
                console.log("params", params);
                regulation_document_file_link.query(sql, params, function(err, result) {
                  if(err) {
                    console.log(err);
                    callback(err);
                  }else {
                    console.log(result);
                    callback();
                  }
                });
            },

            //save uploaded new file to disk
            function(callback) {
              if (fileName != undefined && fileName != "") {                
                var writeOptions = {
                    type      : 'upload',
                    basePath  : basePath,
                    dirName   : path,
                    fileName  : fileName
                };

                console.log("upload checking _++++++++++++++++++++++++++++++" + writeOptions);
                Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', 'STEP-2: Uploading File: ' + req.body.fileName, writeOptions, null);
                FileManagerService.uploadFile(req, res, writeOptions, FileManagerService.saveFileToDisk, function(err, files) {
                    if (err) {
                        Logger.log('error', 'FileUploadController.uploadSpecialFileEdit', 'The following error occurred (ERROR Writing file) At STEP-1:', null, err);
                        callback(err);                    
                    } else {
                        Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', 'STEP-1: Writing fileContent Done.', null, null);
                        callback();                
                    }    
                });
              } else {
                callback();
              } 
            },
            //Get all masters id & name for the document uploaded. These will be used to insert alert 
            function(callback) {
              Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', 'STEP-3: Get master data.', null, null);
              var sql = " SELECT l.geography_id as gid, l.domain_id as did, l.regulation_id as rlid, l.document_id as docid, " + 
                       " l.country_id as cntid, l.state_id as sid, l.regulator_id rid, l.sub_document_id as sdocid, " +
                       " g.name as gname, cnt.name as cntname, st.name as stname, d.name as dname, regtr.name as rgtrname, r.name as rname, doc.name as docname, sdoc.name as sdocname  " +
                       " FROM regulation_document_link l, geography g, domain d, country cnt, state st, regulator regtr, regulation r, document doc, document sdoc  " +
                       " WHERE g.id=l.geography_id AND d.id=l.domain_id AND r.id=l.regulation_id AND doc.id=l.document_id  " +
                       " AND cnt.id=l.country_id AND st.id = l.state_id AND regtr.id = l.regulator_id AND sdoc.id = l.sub_document_id  " +
                       " AND g.status=true AND d.status=true AND cnt.status=true AND st.status=true   " +
                       " AND regtr.status=true AND r.status=true AND doc.status=true AND sdoc.status=true AND l.id=? ";

              var params = [rdlid];  
              File.query(sql, params, function(err, result) {
                  if (err) {
                      Logger.log('error', 'FileUploadController.uploadSpecialFile', 'The following error occurred (While Checking File Already Uploaded) At STEP-2:', null, err);
                      callback(err);                   
                  } else {                
                      if (result.length > 0) {
                        console.log(">>>>>>>>> data1"+JSON.stringify(result)) ;
                        regDocLink = result[0];  
                        callback();
                      } else { 
                        callback(err);
                      }
                  }                    
              });
            },

            //Insert an Alert
            function(callback){
                var messageformData = (req.body) ? req.body : undefined;
                console.log(messageformData);
                console.log('STEP-4:Insert into table alert table');
                var params = ['LifeTracker Document Updated.', regDocLink.dname, 
                             regDocLink.gname, regDocLink.rname, regDocLink.docname, 
                             regDocLink.cntname, regDocLink.stname, 
                             regDocLink.rgtrname, regDocLink.sdocname,
                             rdlid, regDocLink.gid,                            
                             regDocLink.cntid,
                             regDocLink.sid,
                             regDocLink.did,
                             regDocLink.rid,
                             regDocLink.rlid,
                             regDocLink.docid,
                             regDocLink.sdocid];  

                console.log("params");console.log(params);
                var sql = "INSERT into table_alert (message,domain,geography,regulation,doctype,country,state, "+
                           " regulator,subdocument,regdocid, geography_id, country_id, state_id, domain_id,"+
                           " regulator_id, regulation_id, doctype_id, subdoctype_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                alert_model.query(sql,params,function(err, result) {  
                if(err) {
                  console.log(err);
                  callback(err);
                } else {
                  console.log(result);                               
                  callback();
                }            
              });

            }

        ], function(err) {
            if (err) {
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while Updating Tracker Document. Please Contact Administrator.' });
            } else {
                Logger.log('debug', 'FileUploadController.uploadSpecialFileEdit', 'File[' + req.body.fileName + '] Uploaded Successfully.', null, null);
                res.json(200, {});
            }
      });
       
    },


}    
