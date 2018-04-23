/**
 * AlertController.js
 *
 */
module.exports = {

  find: function(req, res) {
    var geoId = req.param('geoId');
    console.log('geoId ' + geoId);
   

    var sql="SELECT ta.message, ta.geography, ta.country, ta.state, ta.domain, ta.regulator, ta.regulation, ta.doctype as document, ta.subdocument," +  
          "rdl.geography_id as access, rdl.country_id as cntid, rdl.state_id as sid, rdl.domain_id as did, rdl.regulator_id as rid,  rdl.regulation_id as rlid,"+
          " rdl.document_id as docid, rdl.sub_document_id as sdocid, c.country_code as ccode,s.state_code as scode,s.name as sname " +
          "FROM table_alert ta, regulation_document_link rdl, country c,state s " +
          "WHERE ta.regdocid = rdl.id and c.name = ta.country and s.name = ta.state";
        var geoClause = " AND ta.geography_id=? "; 
    var orderByClause = " ORDER BY ta.created_date desc ";
    var params = [];
    if (geoId == 0) {
      sql = sql + orderByClause;      
    } else {
      sql = sql + geoClause + orderByClause;
      params = [geoId];
    }
    alert_model.query(sql, params, function(err, result) {
          if (err) {
              Logger.log('error', 'AlertController.find', 'The following error occurred:', null, err);
              return res.json(500, { errCode: 500 , errMsg: 'Error occurred while getting message.' });
          } else {
              Logger.log('debug', 'AlertController.find', 'Alert List Sent.', result, null);
              return res.json(200, result);
          }
    });   
  }

};