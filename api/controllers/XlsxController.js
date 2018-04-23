var filepath = __dirname + '/../../assets/documents/publish';
var XLS = require('xlsx');
var fs = require("fs");
var _ = require('lodash');

module.exports = {

    find: function(req, res){
        var file = req.param("path");
        if (!file) {
          // Logger.log('data', req.param("data"));
           var data = req.param("data");
           this.spl_doc(req,res,data);
        }else {
        file.replace(/&amp;/g, "&");
	    file = decodeURIComponent(file);
        var fileTypePattern=/\.[0-9a-z]+$/i;
        var fileType = file.match(fileTypePattern);
        var jsonFile = file.replace(fileType, ".json");
        var jsonFilePath = filepath + jsonFile;
        _self = this;
        fs.readFile(jsonFilePath, function (err, data) {
           if (err) {
                if (err.code === 'ENOENT') { //JSON file does not exist
                    Logger.log('error', 'XlsxController.find', 'The following error occurred (JSON file does not exist):', null, err);
                    try {
                        var workbook = XLS.readFile(filepath + file);
                        var first_sheet_name = workbook.SheetNames[0];
                        _self.createJsonAndWrite(workbook, first_sheet_name, jsonFilePath, req, res);
                    } catch (err) {
                        Logger.log('error', 'XlsxController.createJsonAndWrite', 'The following error occurred (ERROR while writing JSON file):', null, err);
                        if (err.code === 'ENOENT') {
                            return res.json(500, { errCode: 500 , errMsg: 'No document available. Please Contact Administrator.' });
                        } else {
                            return res.json(500, { errCode: 500 , errMsg: 'No document available. Please Contact Administrator.' });
                        }
                    }
                } else {
                    Logger.log('error', 'XlsxController.find', 'The following error occurred (ERROR while reading JSON file):', null, err);
                    return res.json(500, { errCode: 500 , errMsg: '' });
                }
           } else { //JSON file exist
                var xlsjsonStr = data.toString();
                var xlsjson = JSON.parse(xlsjsonStr);
                Logger.log('debug', 'XlsxController.find', 'Read JSON File (NoOfRows: ' + xlsjson.length + ') :: ' + jsonFilePath, null, null);
                res.json(xlsjson);                
           }
        });   
  }              
    },
    
    createJsonAndWrite : function(workbook, sheet, jsonFilePath, req, res) {
        console.log('WORKBOOK: ',workbook);
        var xlsjson = XLS.utils.sheet_to_json(workbook.Sheets[sheet], {defval : ""});
        var xlsjsonTrimed = _.dropRightWhile(xlsjson, function(item) {
            return _.values(item).every(function(columnValue) {
                return columnValue.trim() == '';
            });
        });
        var xlsjsonStr = JSON.stringify(xlsjsonTrimed);
        fs.writeFile(jsonFilePath, xlsjsonStr, function(err) {
            if (err) {
                Logger.log('error', 'XlsxController.createJsonAndWrite', 'The following error occurred (ERROR while writing JSON file):', null, err);
                return res.json(500, { errCode: 500 , errMsg: '' });
            } else {
                Logger.log('debug', 'XlsxController.createJsonAndWrite', 'Write JSON File (NoOfRows: ' + xlsjsonTrimed.length + ') :: ' + jsonFilePath, null, null);
                res.json(xlsjsonTrimed);                
            }
        });
    },

  spl_doc : function ( req, res,data) {
   console.log(data);
   var sql = "SELECT date_format(sd.date , '%Y-%m-%d') as Date, sd.description as Description, sdt.document_type as DocumentType, sd.document_link as Link  from special_document sd, regulation_document_link rdl, special_document_type  sdt where sd.document_type = sdt.id and sd.regulation_document_id = rdl.id and sd.is_published=true and rdl.geography_id = ? and rdl.domain_id = ? and rdl.regulation_id = ? and rdl.document_id = ? and rdl.country_id = ? and rdl.state_id = ? and rdl.regulator_id = ? and rdl.sub_document_id = ? order by sd.date desc"; 
          var params = [data.gid, data.did, data.rlid, data.docid, data.cntid, data.sid, data.rid, data.sdocid];
          User.query(sql, params, function(err, spldoc) {
            if (err) {
              Logger.log('error', 'XlsController.spl_doc', 'The following error occurred:', null, err);
            } else {
                console.log(spldoc);
		res.json(spldoc);
            }

 });

}
}
