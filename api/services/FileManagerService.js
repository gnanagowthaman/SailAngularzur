var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = {

    readFile: function(req, res, readOptions, callback, done) {
      this._checkUploadFileDirAndCreate(req, res, readOptions, callback, done);  
    },

    returnFileContent: function(req, res, readOptions, done) {
        fs.readFile(readOptions.uploadPath + path.sep + readOptions.fileName, function (err, data) {
            if (err) {
                console.log(err);
                return done(err, null);
            } else {
                return done(null, data);
            }
        });        
    },

    writeFile: function(req, res, writeOptions, callback, done) {
        this._checkUploadFileDirAndCreate(req, res, writeOptions, callback, done);    
    },

    saveFileContentToFile: function(req, res, writeOptions, done) {        
        fs.writeFile(writeOptions.uploadPath + path.sep + writeOptions.fileName, writeOptions.fileContent, function (err) {
          if (err) {
              console.log(err);
              return done(err, null);
          } else {
              return done(null, 'File - ' + writeOptions.fileName + ' Written Successfully.');
          }          
        });
    },

    _checkUploadFileDirAndCreate: function(req, res, options, callback, done) {
        callback = callback || function () {};        
        var uploadPath = options.basePath + path.sep + options.type + path.sep + options.dirName;
        fs.stat(uploadPath, function (err, stats) {            
            if ((err && err.code === 'ENOENT') || !stats.isDirectory()) {
                // if there's no error, it means it's not a directory - remove it
                if (!err) {
                    fs.unlinkSync(uploadPath);
                }
                // create directory
                console.log('New Directory Created.');
                mkdirp(uploadPath, function(err) {
                    if (err) console.log(err);
                    options.uploadPath = uploadPath;
                    callback(req, res, options, done);        
                });
                return;
            }
            console.log('Directory Exists.');
            options.uploadPath = uploadPath;
            callback(req, res, options, done);
        });
    },

    uploadFile: function(req, res, writeOptions, callback, done) {
        this._checkUploadFileDirAndCreate(req, res, writeOptions, callback, done);
    },

 saveFileToDisk: function(req, res, writeOptions, done) {
        var uploadFile = req.file('uploadFile');
        var filesize = req._fileparser.form.bytesExpected;
        res.setTimeout(0);        
        uploadFile.upload({dirname: writeOptions.uploadPath, saveAs: writeOptions.fileName,   maxBytes: Number.MAX_VALUE }, function(err, files) {
            if (err) {
                console.log(err);
                return done(err, null);
            } else {
                // console.log('FILE-META:', files);
                // console.log('FILE-SIZE:', files[0].size);
                // console.log('FILE-SIZE-EXPECTED:', filesize);
                // //Allow the file to write fully
                // var fileSize  = files[0].size;
                // var pauseTime = 1000;
                // if (fileSize < 1000000) {
                //   pauseTime = 1000;
                // } else if (fileSize > 1000000 && fileSize < 2000000) {
                //   pauseTime = 5000;
                // } else if (fileSize > 2000000 && fileSize < 3000000) {
                //   pauseTime = 10000;
                // } else if (fileSize > 3000000 && fileSize < 4000000) {
                //   pauseTime = 15000;
                // } else if (fileSize > 4000000) {
                //   pauseTime = 20000;
                // }
                // setTimeout(function() { 
                //     console.log(writeOptions.fileName + ' File Uploaded Successfully.'); 
                //     return done(null, files);
                // }, pauseTime);

                // return res.json({
                //  message: writeOptions.length + ' file uploaded successfully!',
                //   files: files
                // });
                return done(null, files);

                // var isFileWriting = true;
                // count = 0;
                // console.log('PATH::: ', writeOptions.uploadPath+writeOptions.fileName);
                // while (isFileWriting) {
                //   // var stats = fs.statSync(writeOptions.uploadPath+writeOptions.fileName);
                  
                //   // console.log('STATS-SIZE1: ', stats.size);
                //   // console.log('COUNT: ', ++count);
                //   // console.log('STATS: ', stats);
                //   if (stats.size < fileSize) {
                //       setTimeout(function() {                    
                //         console.log(writeOptions.fileName + ' File uploading ....'); 
                //       }, 2000);                    
                //   } else {
                //     isFileWriting = false;
                    
                //   }
                // }
                // console.log('isFileWriting: ', isFileWriting);
                // return done(null, files);
             // while ( fileSize < filesize ) {
                // console.log('SIZE:', files[0].size);

                // fs.stat(writeOptions.uploadPath, function (err, stats) {            
                //     console.log('STATS-SIZE1:', stats.size);
                //     while (stats.size < fileSize) {
                //       console.log('STATS-SIZE2:', stats.size);
                //       setTimeout(function() {                    
                //         console.log(writeOptions.fileName + ' File uploading ....'); 

                //       }, pauseTime);
                //     }

                // });
        

                // }
                   // return done(null, files);
            }

        });

    },

    // Commented by Niranjan. instead us above function to takecare of large files
    // saveFileToDisk: function(req, res, writeOptions, done) {
    //     var uploadFile = req.file('uploadFile');
    //     uploadFile.upload({dirname: writeOptions.uploadPath, saveAs: writeOptions.fileName}, function(err, files) {
    //         if (err) {
    //             console.log(err);
    //             return done(err, null);
    //         } else{
    //             console.log(files);
    //             //Allow the file to write fully
    //             setTimeout(function() { 
    //                 console.log(writeOptions.fileName + ' File Uploaded Successfully.'); 
    //                 return done(null, files);
    //             }, 1000);                
    //         }            
    //     });            
    // },

    // saveFileToDiskSkipper: function(req, res, writeOptions, done) {
    //   saveFileToDisk: function(req, res, writeOptions, done) {
    //     console.log('saveFileToDisk');
    //     // var fileWriter = fs.createWriteStream(writeOptions.uploadPath + path.sep + writeOptions.fileName);
    //     var blobAdapter = require('skipper-disk')();
    //     var receiving = blobAdapter.receive({dirname: writeOptions.uploadPath, saveAs: writeOptions.fileName, fd: writeOptions.uploadPath+writeOptions.fileName});
    //     var uploadFile = req.file('uploadFile');
    //     uploadFile
    //     .on('error', function(err) {
    //         console.log('ERROR');
    //         console.log(err);
    //         return done(err, null);})
    //     .on('finish', function() {
    //         console.log(writeOptions.fileName + ' Server Received File Steam Successfully.'); 
    //         return done(null, {});})
    //     .pipe(receiving);
    //     // fileWriter.on('finish', function() {console.log('File Written Successfully.')} )         
    // },

    createFileLink: function(writeOptions, imageTempPath) {
       var srcPath = writeOptions.basePath + path.sep + writeOptions.type + path.sep + writeOptions.dirName+ path.sep+writeOptions.fileName;
       var targetPath  = imageTempPath + path.sep + writeOptions.type + path.sep + writeOptions.dirName+ path.sep+writeOptions.fileName;        var uploadPath = imageTempPath + path.sep + writeOptions.type + path.sep + writeOptions.dirName; console.log("srcPath "+srcPath);
       console.log("target Path "+targetPath);        
       this.createDirectory(uploadPath,srcPath,targetPath, function(srcDir,tarDir) {                 
            fs.exists(targetPath,function(exists) {              
                if(!exists)                
                    fs.symlinkSync(srcDir,tarDir);
           });
       });  
    },
     
    createDirectory: function (dirPath,srcPath,targetPath, callback)  {
       fs.stat(dirPath, function (err, stats) {           
           if ((err && err.code === 'ENOENT') || !stats.isDirectory()) {
               // if there's no error, it means it's not a directory - remove it
               if (!err) {
                   fs.unlinkSync(uploadPath);
               }
               // create directory
               console.log('New Directory Created.');
               mkdirp(dirPath, function(err) {
                   if (err) console.log(err);
                   callback(srcPath,targetPath);       
               });
               return;
           }
           console.log('Directory Exists.');
           callback(srcPath,targetPath);       
       });
    },

    deleteFile: function(req, res, deleteOptions, done) {
      var uploadPath = deleteOptions.filePath + deleteOptions.filedeleted;
      console.log("uploadPath",deleteOptions);
      fs.stat(uploadPath, function (err, stats) {            
          if (!err && stats.isFile()) {       
              fs.unlink(uploadPath, function(err) {
                  if (err) {
                    console.log(err);        
                    return done(err, null);
                  } else {
                    return done(null, "document Deleted.");
                  }  
              });
          } else {
            return done(null, "document Doesn't Exist.");  
          }            
      });
   },

    deletejsonFile: function(req, res, deleteOptions, done) {       
      var uploadPath = deleteOptions.filejson;
      fs.stat(uploadPath, function (err, stats) {            
          if (!err && stats.isFile()) {       
              fs.unlink(uploadPath, function(err) {
                  if (err) {
                    console.log(err);        
                    return done(err, null);
                  } else {
                    return done(null, "JSON File Deleted.");
                  }  
              });
          } else {
            return done(null, "JSON File Doesn't Exist.");  
          }            
      });
    },
    deleteuploadedFile: function(req, res, deleteOptions, done) {
      var uploadPath = deleteOptions.basePath + deleteOptions.filepath;
      console.log("deleteuploadedFile",deleteOptions);
      fs.stat(uploadPath, function (err, stats) {            
          if (!err && stats.isFile()) {       
              fs.unlink(uploadPath, function(err) {
                  if (err) {
                    console.log(err);        
                    return done(err, null);
                  } else {
                    return done(null, "document Deleted.");
                  }  
              });
          } else {
            return done(null, "document Doesn't Exist.");  
          }            
      });
      /*fs.unlink( deleteOptions.filePath + deleteOptions.filedeleted, function (err) {
          if (err) {
              console.log(err);
              return done(err, null);
          } else {
              return done(null, 'File  deleted Successfully.');
          }          
      }); */
   },  

   //vinitha

   _checkUploadFileDirAndCreateAlert1: function(req, res, options,fileId, callback, done) {
        callback = callback || function () {};        
        var uploadPath = options.basePath + path.sep + options.type + path.sep + options.dirName;
        fs.stat(uploadPath, function (err, stats) {            
            if ((err && err.code === 'ENOENT') || !stats.isDirectory()) {
                // if there's no error, it means it's not a directory - remove it
                if (!err) {
                    fs.unlinkSync(uploadPath);
                }
                // create directory
                console.log('New Directory Created.');
                mkdirp(uploadPath, function(err) {
                    if (err) console.log(err);
                    options.uploadPath = uploadPath;
                    callback(req, res, options,fileId, done);        
                });
                return;
            }
            console.log('Directory Exists.');
            options.uploadPath = uploadPath;
            callback(req, res, options,fileId, done);
        });
    },

    uploadFileAlert1: function(req, res, writeOptions,fileId, callback, done) {
        this._checkUploadFileDirAndCreateAlert1(req, res, writeOptions,fileId, callback, done);
    },

    saveFileToDiskAlert1: function(req, res, writeOptions, fileId,done) {
        var uploadFile = req.file(fileId);
        uploadFile.upload({dirname: writeOptions.uploadPath, saveAs: writeOptions.fileName}, function(err, files) {
            if (err) {
                console.log(err);
                return done(err, null);
            } else{
                console.log(files);
                //Allow the file to write fully
                setTimeout(function() { 
                    console.log(writeOptions.fileName + ' File Uploaded Successfully.'); 
                    return done(null, files);
                }, 1000);                
            }            
        });            
    },
}
