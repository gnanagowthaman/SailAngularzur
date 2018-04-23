const elasticsearch = require('elasticsearch');
var fs = require("fs");
var es_port = process.env.ES_PORT || 9200;  
var es_host = process.env.ES_HOST || '127.0.0.1';
var filepath = __dirname + '/../../assets/documents/upload';

module.exports = {
	search: function(req, res) {
		var searchKey = req.param('searchKey');
		console.log("for checking the searchkey", searchKey);
		var esClient = new elasticsearch.Client({
			host: es_host + ':' + es_port,
	//		log: 'error'
log: 'trace'
		});
		// var body = {
		// 	size: 20,
		//     from: 0,
		// 	query: {
		// 	  match: {
		// 	    _name: {
		// 	      query: searchKey,
		// 	      type: 'phrase'
		// 	    }
		// 	  }
		// 	}			
		// };
		console.log("For checking the", searchKey);
		esClient
			.search({index: 'document', q: searchKey})
			.then(results => {
				console.log(results);
			    // console.log(`found ${results.hits.total} items in ${results.took}ms`);
			    Logger.log('debug', 'SearchController.search', 'Elastic Search found ${results.hits.total} items in ${results.took}ms', null, null);
			    var searchResult = [];
			    results.hits.hits.forEach(
			      (hit, index) => {
			      	var docData = {};			      	
			      	var name = hit._source.name;
			      	var keyValuePairs = hit._source.name.split(':');
			      	keyValuePairs.forEach(function(keyValue) {
			      		var kv = keyValue.split('=');								
								docData[kv[0]] = kv[1];								
			      	});
			      	docData.content = hit._source.attachment.content.substring(0, 300);
			      	docData.title = hit._source.title;
			      	docData.fileName = hit._source.author;
			      	console.log("docData :: ", docData);
			      	searchResult.push(docData);
			      	Logger.log('debug', 'SearchController.search', 'Elastic Search Hits:: ', hit, null);
			  	  }
			    )
			    Logger.log('debug', 'SearchController.search', 'Elastic Search Result:: ', searchResult, null);
			    res.json(200, searchResult);  
			})
			.catch(function (err) {
				Logger.log('error', 'SearchController.search', 'The following error occurred (ERROR while search from ES):', null, err);
        		return res.json(500, { errCode: 500 , errMsg: 'Error occurred while searching the Information. Please Contact Administrator.' });				
			});
	},



Advancesearch: function(req,res){
		    var  Keyword = req.param('data');
			var Adlocation=req.param('name');
			  //  searchResult = [];
			var esClient = new elasticsearch.Client({
			host: es_host + ':' + es_port,
			log: 'trace'
	         	});
	        	console.log("for checking the keyword and adlocaiton", Keyword, Adlocation, "For adlocaiton length", Adlocation.length);

                        //Query iteration
                        if(Adlocation.length > 1){
                             for (g=0; g<Adlocation.length; g++){
                              console.log("check the g", g);
                              var geo = Adlocation[g].gname;
                              var country = Adlocation[g].cname;
                              var state = Adlocation[g].stname;
                              var domain = Adlocation[g].dname;

                              console.log("check the query location", geo);
                              console.log("check the query location", country);
                              console.log("check the query location", state);
                              console.log("check the query location", domain);

                              var location1= geo+country+state+domain;
                              console.log("check the query location", location1);
                              var location=location1.replace(/\s+/g, "");
                              console.log("check the query location", location);
                              
                     esClient.search({
			    index: 'document',
			    type:location, 
                q:Keyword
                   
			}) 
			.then(results => {
			 //   console.log("for check the results", results);
			   // console.log(`found ${results.hits.total} items in ${results.took}ms`);
			   // Logger.log('debug', 'SearchController.search', 'Elastic Search found ${results.hits.total} items in ${results.took}ms', null, null);
			    searchResult = [];
			    results.hits.hits.forEach(
			      (hit, index) => {
			      	var docData = {};			      	
			      	var name = hit._source.name;
			      	var keyValuePairs = hit._source.name.split(':');
			      	keyValuePairs.forEach(function(keyValue) {
			      		var kv = keyValue.split('=');								
								docData[kv[0]] = kv[1];								
			      	});
			      	docData.content = hit._source.attachment.content.substring(0, 300);
			        docData.title = hit._source.title;
			      	docData.fileName = hit._source.author;
			      	searchResult.push(docData);
			      	console.log("check the rlt", searchResult)
			     // 	Logger.log('debug', 'SearchController.search', 'Elastic Search Hits:: ', hit, null);
			  	  }
			    )
			    //Logger.log('debug', 'SearchController.search', 'Elastic Search Result:: ', searchResult, null);
       //                       console.log("for checking the Adlocation.length",Adlocation.length, g);
       //                       if(Adlocation.length == g){
                                
       //                     console.log("Final results",Adlocation, "Second results");
       //                     res.json(200, searchResult);

       //                         }
			    // // res.json(200, searchResult);
			    console.log("check into for loop")  
			})
			.catch(function (err) {
				console.log("check into the error1 section");
				Logger.log('error', 'SearchController.search', 'The following error occurred (ERROR while search from ES):', null, err);
        		return res.json(500, { errCode: 500 , errMsg: 'Error occurred while searching the Information. Please Contact Administrator.' });				
			}); 
                          
                          
                           }
                           console.log("Final results", searchResult, "Second results");
                          res.json(200, searchResult);

 
                         } else{
                       
                         A1=Adlocation[0];                       
                         location2=A1.gname+A1.cname+A1.stname+A1.dname;
                         var location=location2.replace(/\s+/g, "");
                         console.log("check the outerloop in location", location);

                                              esClient.search({
                         			    index: 'document',
                         			    type:location, 
                                         q:Keyword
                                            
                         			}) 
                         			.then(results => {
                         			 //   console.log("for check the results", results);
                         			   // console.log(`found ${results.hits.total} items in ${results.took}ms`);
                         			   // Logger.log('debug', 'SearchController.search', 'Elastic Search found ${results.hits.total} items in ${results.took}ms', null, null);
                         			    var searchResult = [];
                         			    results.hits.hits.forEach(
                         			      (hit, index) => {
                         			      	var docData = {};			      	
                         			      	var name = hit._source.name;
                         			      	var keyValuePairs = hit._source.name.split(':');
                         			      	keyValuePairs.forEach(function(keyValue) {
                         			      		var kv = keyValue.split('=');								
                         								docData[kv[0]] = kv[1];								
                         			      	});
                         			      	docData.content = hit._source.attachment.content.substring(0, 300);
                         			      	docData.title = hit._source.title;
			      							docData.fileName = hit._source.author;
                         			      	searchResult.push(docData);
                         			     // 	Logger.log('debug', 'SearchController.search', 'Elastic Search Hits:: ', hit, null);
                         			  	  }
                         			    )
                         			   // Logger.log('debug', 'SearchController.search', 'Elastic Search Result:: ', searchResult, null);
                         			    res.json(200, searchResult);  
                         			})
                         			.catch(function (err) {
                         				console.log("check into the error2 section");
                         				Logger.log('error', 'SearchController.search', 'The following error occurred (ERROR while search from ES):', null, err);
                                 		return res.json(500, { errCode: 500 , errMsg: 'Error occurred while searching the Information. Please Contact Administrator.' });				
                         			});
      }

    
                   
	}

   

}
