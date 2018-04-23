/**
 * DashBoardController.js
 *
 * @description ::
 */
// module.exports = {

// 	findLibrary: function(req, res) {
// 		// var sql = " SELECT d.id, d.name as Domain, IFNULL(g.Regions, 0) as Regions, IFNULL(r.Regulations, 0) as Regulations " +
// 		// 		  " FROM domain as d " +
// 		// 		  " LEFT JOIN (select count(geography_id) as Regions, domain_id from geography_domain_link as gdl GROUP BY gdl.domain_id) as g ON g.domain_id=d.id " +
// 		// 		  " LEFT JOIN (select count(regulation_id) as Regulations, domain_id from domain_regulation_link as drl GROUP BY drl.domain_id) as r ON r.domain_id=d.id ";

//     var geoId = req.param('geoId');
//     console.log('geoId ' + geoId);
//     // var sql = "select d.name as Domain, count(distinct rdl.geography_id) as Regions, count(distinct rdl.regulation_id) as Regulations, d.id as Access from regulation_document_link rdl, domain d where d.id=rdl.domain_id ";
//     // var geoClause = " AND rdl.geography_id=? "; 
//     // var grpByClause = " group by rdl.domain_id ";
//     // var sql = "select d.name as Domain,"+
//     // " count(distinct rdl.regulator_id) as Regulator, count(distinct rdl.regulation_id) as Regulation,"+
//     // " rdl.geography_id as Access "+
//     // "from regulation_document_link rdl, geography g, country c, state s, domain d "+
//     // "where g.id = rdl.geography_id and c.id =rdl. country_id and s.id = rdl.state_id and d.id = rdl.domain_id ";
//     // var geoClause = " AND rdl.geography_id=? "; 
//     // var grpByClause = "group by rdl.geography_id, rdl.domain_id, rdl.country_id, rdl.state_id";
//     var sql = "select d.name as Domain, count(distinct rdl.regulation_id) as Regulations, count( rdl.document_id) as Docs, d.id as Access from regulation_document_link rdl, domain d,regulation_document_file_link rdfl where d.id=rdl.domain_id and rdl.id = rdfl.regulation_document_id and rdfl.is_uploaded = 1 ";
//     var geoClause = " AND rdl.geography_id=? ";
//     var grpByClause = " group by rdl.domain_id ";
//     console.log("TESTING QUERY" + sql);
//     var params = [];
//     if (geoId == 0) {
//       sql = sql + grpByClause;      
//     } else {
//       sql = sql + geoClause + grpByClause;
//       params = [geoId];
//     }    
// 		Regulation.query(sql, params, function(err, result) {
//       if (err) {
//         	Logger.log('error', 'DashBoardController.findLibrary', 'The following error occurred:', null, err);
//           return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Reg Tracker Information.  Please Contact Administrator.' });
//       } else {
//           Logger.log('debug', 'DashBoardController.findLibrary', 'Library List Sent.', result, null);
//           return res.json(200, result);
//       }
//   	});		
// 	},

//   findNewsbyGeo:function(req,res){
//     console.log(req.params);
//     // var sql = "select news.date,geography.name, news.news_content from news inner join geography on news.geo_id  = geography.id where DATE_FORMAT(news.date, '%y-%m-%d') =curdate()";
//     var geo_id = req.param('geoId');
//     if(geo_id == undefined){
//       geo_id = -1;
//     }
//     console.log('geoId ' + geo_id);
//      var sql = "select date_format(n.news_date , '%Y-%m-%d') as date, g.name, n.news_content  as news from news n, geography g ";
//     if(geo_id > 0 || geo_id < 0){
//      sql += "where  n.geo_id  = g.id and g.id = " + geo_id +" order by n.news_date desc limit 10";

//    }else{
//     sql += "where  n.geo_id  = g.id order by n.news_date desc limit 10";
//    }
//    console.log("testing" +sql);

//     News.query(sql, function(err,result){
//       if(err){

//                   Logger.log('error', 'DashBoardController.findNewsbyGeo', 'The following error occurred:', null, err);
//           return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching News Information.  Please Contact Administrator.' });
//       }else{
//         Logger.log('debug', 'DashBoardController.findNewsbyGeo', 'News List sent', result, null);
//         return res.json(200,result);
//       }

//     });

//   }
  

// };
/**
 * DashBoardController.js
 *
 * @description ::
 */
module.exports = {

	findLibrary: function(req, res) {
		// var sql = " SELECT d.id, d.name as Domain, IFNULL(g.Regions, 0) as Regions, IFNULL(r.Regulations, 0) as Regulations " +
		// 		  " FROM domain as d " +
		// 		  " LEFT JOIN (select count(geography_id) as Regions, domain_id from geography_domain_link as gdl GROUP BY gdl.domain_id) as g ON g.domain_id=d.id " +
		// 		  " LEFT JOIN (select count(regulation_id) as Regulations, domain_id from domain_regulation_link as drl GROUP BY drl.domain_id) as r ON r.domain_id=d.id ";

    var geoId = req.param('geoId');
    console.log('geoId ' + geoId);
    // var sql = "select d.name as Domain, count(distinct rdl.geography_id) as Regions, count(distinct rdl.regulation_id) as Regulations, d.id as Access from regulation_document_link rdl, domain d where d.id=rdl.domain_id ";
    // var geoClause = " AND rdl.geography_id=? "; 
    // var grpByClause = " group by rdl.domain_id ";
    // var sql = "select d.name as Domain,"+
    // " count(distinct rdl.regulator_id) as Regulator, count(distinct rdl.regulation_id) as Regulation,"+
    // " rdl.geography_id as Access "+
    // "from regulation_document_link rdl, geography g, country c, state s, domain d "+
    // "where g.id = rdl.geography_id and c.id =rdl. country_id and s.id = rdl.state_id and d.id = rdl.domain_id ";
    // var geoClause = " AND rdl.geography_id=? "; 
    // var grpByClause = "group by rdl.geography_id, rdl.domain_id, rdl.country_id, rdl.state_id";
    var sql = "select d.name as Domain, count(distinct rdl.regulation_id) as Regulations, count( rdl.document_id) as Docs, d.id as Access from regulation_document_link rdl, domain d,regulation_document_file_link rdfl where d.id=rdl.domain_id and rdl.id = rdfl.regulation_document_id and rdfl.is_uploaded = 1 ";
    var geoClause = " AND rdl.geography_id=? ";
    var grpByClause = " group by rdl.domain_id ";
    console.log("TESTING QUERY" + sql);
    var params = [];
    if (geoId == 0) {
      sql = sql + grpByClause;      
    } else {
      sql = sql + geoClause + grpByClause;
      params = [geoId];
    }    
		Regulation.query(sql, params, function(err, result) {
      if (err) {
        	Logger.log('error', 'DashBoardController.findLibrary', 'The following error occurred:', null, err);
          return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Reg Tracker Information.  Please Contact Administrator.' });
      } else {
          Logger.log('debug', 'DashBoardController.findLibrary', 'Library List Sent.', result, null);
          return res.json(200, result);
      }
  	});		
	},

  findNewsbyGeo:function(req,res){
    console.log(req.params);
    // var sql = "select news.date,geography.name, news.news_content from news inner join geography on news.geo_id  = geography.id where DATE_FORMAT(news.date, '%y-%m-%d') =curdate()";
    var geo_id = req.param('geoId');
    if(geo_id == undefined){
      geo_id = -1;
    }
    console.log('geoId ' + geo_id);
     var sql = "select date_format(n.news_date , '%Y-%m-%d') as date, g.name, n.news_content  as news from news n, geography g ";
    if(geo_id > 0 || geo_id < 0){
     sql += "where  n.geo_id  = g.id and g.id = " + geo_id +" order by n.news_date desc limit 10";

   }else{
    sql += "where  n.geo_id  = g.id order by n.news_date desc limit 10";
   }
   console.log("testing" +sql);

    News.query(sql, function(err,result){
      if(err){

                  Logger.log('error', 'DashBoardController.findNewsbyGeo', 'The following error occurred:', null, err);
          return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching News Information.  Please Contact Administrator.' });
      }else{
        Logger.log('debug', 'DashBoardController.findNewsbyGeo', 'News List sent', result, null);
        return res.json(200,result);
      }

    });

  }
  

};
