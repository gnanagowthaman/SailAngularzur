module.exports = {

    find: function(req, res) {
  		var userConfig = req.session.userConfig;
      	if (userConfig.full) {
       		sql = " SELECT " +
                  " distinct g.id as gid, g.name as gname, r.id as id, r.name as name,r.description as description " +
                  " FROM geography g, regulation r, geography_regulation_link grl " +
                  " WHERE g.id = grl.geography_id and grl.regulation_id = r.id and g.status=1 and r.status=1 "; 
            var params = [];         	
      	} else {
       		sql = " SELECT " +
                  " distinct g.id as gid, g.name as gname, r.id as id, r.name as name,r.description as description   " +
                  " FROM geography g, regulation r, subscription s, subscription_detail sd, user u " +
                  " WHERE u.id=s.user_id and s.id=sd.subscription_id and g.id = sd.geography_id and  u.id=? and sd.regulation_id = r.id and g.status=1 and r.status=1 ";  		
      		var params = [req.session.user.id];
      	}	
      	
  		Regulation.query(sql, params, function(err, result) {
            if (err) {
              	Logger.log('error', 'RegulationController.find', 'The following error occurred:', null, err);
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Regulation .Please contact Administrator.' });
            } else {
                Logger.log('debug', 'RegulationController.find', 'Allowed Regulations Sent', result, null);
                return res.json(200, result);
            }
    	});      	
    },

    // In User/Admin Create FormPage, to show regulation checkboxes
    findByGeo4Create: function(req, res) {
    	var regulationMap = {};
    	var geographyArray = [];
    	async.series([
    		//Get loggedIn user's subscription_details
    		function(callback) {
		    	var sql = "SELECT distinct geography_id, regulation_id FROM subscription s, subscription_detail sd " +
		    			  " WHERE s.id=sd.subscription_id AND s.user_id=? ";
		    	var params = [req.session.user.id];
				Regulation.query(sql, params, function(err, result) {
		            if (err) {		           
		              Logger.log('error', 'RegulationController.findByGeo4Create', 'The following error occurred:', null, err);
		              callback(err);		              
		            } else {		     
		            	Logger.log('debug', 'RegulationController.findByGeo4Create', 'Allowed Regulations From Subscription', result, null);
		            	if (result.length > 0) {
		            		regulationMap['size'] = result.length;
		            		result.forEach(function(item) {
		            			regulationMap[item.geography_id + '' + item.regulation_id] = item.regulation_id;
		            		});		            		            		
		            		callback();		            		
		            	} else {
		            		regulationMap['size'] = 0;		            		
		            		callback();
		            	}
		            }
		        });
    		},
    		//Get all regulations in the system & enable/disable based on the subscription
    		function(callback) {
				var sql = "SELECT g.id as geography_id, g.name as geography_name, r.id as regulation_id, r.name as regulation_name " +
						  "  FROM geography g, geography_regulation_link gr, regulation r " +
						  " WHERE g.id=gr.geography_id AND r.id=gr.regulation_id AND g.status=1 AND r.status=1 order by geography_id, regulation_id";
				var params = [];

				Regulation.query(sql, params, function(err, result) {
		            if(err) {
		              Logger.log('error', 'RegulationController.findByGeo4Create', 'The following error occurred:', null, err);
		              callback(err);		           
		            } else {			            
			            //result is flattern set. Need to group the regulation by geography.
			            if (result.length > 0) {
			                var geographies = [];
			                var regulations = [];
			                var geography_id = -1;
			                var geography_position = 0;
			                result.forEach(function(item, index) {
			                	if (item.geography_id != geography_id) { //new geography & add first regulation to it
			                		var geography = {
			                			geography_id   : item.geography_id,
			                			geography_name : item.geography_name,
			                			regulations : []
			                		};	          
			                		geographies[geography_position] = geography;
			                		var regulation = {
			                			regulation_id   : item.regulation_id,
			                			regulation_name : item.regulation_name,
			                			geography_id    : item.geography_id,
			                			checkbox_id   	: item.geography_id + '' + item.regulation_id,
			                			is_selected		: false			                			
			                		};
			                		//enable allowed regulations
			                		if (regulationMap.size == 0) {
			                			regulation.is_disabled = false;
			                		} else {
			                			var regId = regulationMap[item.geography_id + '' + item.regulation_id];
			                			if (regId > 0) {
			                				regulation.is_disabled = false;
			                			} else {
			                				regulation.is_disabled = true;
			                			}
			                		}	                			
			                		geographies[geography_position].regulations.push(regulation);
			                		geography_id = item.geography_id;
			                	} else { //same geography & add consecutive regulations to it.
			                		var regulation = {
			                			regulation_id   : item.regulation_id,
			                			regulation_name : item.regulation_name,
			                			geography_id    : item.geography_id,
			                			checkbox_id   	: item.geography_id + '' + item.regulation_id,
			                			is_selected		: false
			                		};
			                		//enable allowed regulations	   
			                		if (regulationMap.size == 0) {
			                			regulation.is_disabled = false;
			                		} else {
			                			var regId = regulationMap[item.geography_id + '' + item.regulation_id];
			                			if (regId > 0) {
			                				regulation.is_disabled = false;
			                			} else {
			                				regulation.is_disabled = true;
			                			}
			                		}				                		             			
			                		geographies[geography_position].regulations.push(regulation);
			                		//reset the current geography array element position
			                		if ((index+1) < result.length && item.geography_id != result[index+1].geography_id) {
			                			geography_position++;
			                		}

			                	}
			                    
			                });
			                geographyArray = geographies;			                
			                callback();
		                } else {
							callback();	
		                }
		            }
				});
    		}

    	], function(err) {
            if (err) {       
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while creating Regulation.Please contact Administrator.' });
            } else {
                Logger.log('debug', 'RegulationController.findByGeo4Create', 'Allowed Regulations Sent.', geographyArray, null);
                return res.json(200, geographyArray);
            }
      });
    },
    // In User/Admin Edit FormPage, to show regulation checkboxes
    findByGeo4Edit: function(req, res) {
    	var regulationMapOfLogInUser = {};
    	var regulationMapOfEditUser = {};
    	var geographyArray = [];
    	var userId = req.params.id;
    	var isZurik = req.session.userConfig.isZurik;
    	async.series([
    		//Get loggedIn user's subscription_details
    		function(callback) {
		    	var sql = "SELECT distinct geography_id, regulation_id FROM subscription s, subscription_detail sd " +
		    			  " WHERE s.id=sd.subscription_id AND s.user_id=? ";
		    	var params = [req.session.user.id];
				Regulation.query(sql, params, function(err, result) {
		            if (err) {
		              Logger.log('error', 'RegulationController.findByGeo4Edit', 'The following error occurred:', null, err);
		              callback(err);		           
		            } else {
		            	Logger.log('debug', 'RegulationController.findByGeo4Create', 'Allowed Regulations From Subscription Of LoggedIn User.', result, null);
		            	if (result.length > 0) {
		            		regulationMapOfLogInUser['size'] = result.length;
		            		result.forEach(function(item) {
		            			regulationMapOfLogInUser[item.geography_id + '' + item.regulation_id] = item.regulation_id;
		            		});		            		
		            		callback();		            		
		            	} else {
		            		regulationMapOfLogInUser['size'] = 0;
		            		callback();
		            	}
		            }
		        });
    		},
    		//Get edited user's subscription_details
    		function(callback) {
		    	var sql = "SELECT distinct geography_id, regulation_id FROM subscription s, subscription_detail sd " +
		    			  " WHERE s.id=sd.subscription_id AND s.user_id=? ";
		    	var params = [userId];
				Regulation.query(sql, params, function(err, result) {
		            if (err) {
		              Logger.log('error', 'RegulationController.findByGeo4Edit', 'The following error occurred:', null, err);
		              callback(err);		              
		            } else {
		            	Logger.log('debug', 'RegulationController.findByGeo4Create', 'Allowed Regulations From Subscription Of Edited User', result, null);
		            	if (result.length > 0) {
		            		regulationMapOfEditUser['size'] = result.length;
		            		result.forEach(function(item) {
		            			regulationMapOfEditUser[item.geography_id + '' + item.regulation_id] = item.regulation_id;
		            		});		            		
		            		callback();		            		
		            	} else {
		            		regulationMapOfEditUser['size'] = 0;
		            		callback();
		            	}
		            }
		        });
    		},
    		//Get all regulations in the system & enable/disable based on the subscription of loggedIn user
    		//and select/deselect based on the subscription of edited user
    		function(callback) {
				var sql = "SELECT g.id as geography_id, g.name as geography_name, r.id as regulation_id, r.name as regulation_name " +
						  "  FROM geography g, geography_regulation_link gr, regulation r " +
						  " WHERE g.id=gr.geography_id AND r.id=gr.regulation_id AND g.status=1 AND r.status=1 order by geography_id, regulation_id";
				var params = [];

				Regulation.query(sql, params, function(err, result) {
		            if (err) {
		              Logger.log('error', 'RegulationController.findByGeo4Edit', 'The following error occurred:', null, err);
		              callback(err);		           
		            } else {			         
			            //result is flattern set. Need to group the regulation by geography.
			            if (result.length > 0) {
			                var geographies = [];
			                var regulations = [];
			                var geography_id = -1;
			                var geography_position = 0;
			                result.forEach(function(item, index) {
			                	if (item.geography_id != geography_id) { //new geography & add first regulation to it
			                		var geography = {
			                			geography_id   : item.geography_id,
			                			geography_name : item.geography_name,
			                			regulations : []
			                		};	          
			                		geographies[geography_position] = geography;
			                		var regulation = {
			                			regulation_id   : item.regulation_id,
			                			regulation_name : item.regulation_name,
			                			geography_id    : item.geography_id,
			                			checkbox_id   	: item.geography_id + '' + item.regulation_id,
			                			is_selected		: false			                			
			                		};
			                		//enable allowed regulations based on loggedIn user,
			                		//because he is the operating user.
			                		if (regulationMapOfLogInUser.size == 0) {//loggedIn user has Full access
			                			regulation.is_disabled = false;
			                	
			                		} else {//loggedIn user has Restricted access
			                			var regId = regulationMapOfLogInUser[item.geography_id + '' + item.regulation_id];
			                			if (regId > 0) {
			                				regulation.is_disabled = false;
			                			} else {
			                				regulation.is_disabled = true;			                				
			                			}
			                		}
			                		//Set allowed regulations based on user to be edited
			                		if (regulationMapOfEditUser.size == 0) {//edited user has Full access
			                			regulation.is_selected = true;
			                	
			                		} else {//edited user has Restricted access
			                			var regId = regulationMapOfEditUser[item.geography_id + '' + item.regulation_id];
			                			if (regId > 0) {
			                				regulation.is_selected = true;
			                			} else {
			                				regulation.is_selected = false;			                				
			                			}
			                		}			                			                			
			                		geographies[geography_position].regulations.push(regulation);
			                		geography_id = item.geography_id;
			                	} else { //same geography & add consecutive regulations to it.
			                		var regulation = {
			                			regulation_id   : item.regulation_id,
			                			regulation_name : item.regulation_name,
			                			geography_id    : item.geography_id,
			                			checkbox_id   	: item.geography_id + '' + item.regulation_id,
			                			is_selected		: false
			                		};
			                		//enable allowed regulations based on loggedIn user,
			                		//because he is the operating user.
			                		if (regulationMapOfLogInUser.size == 0) {//loggedIn user has Full access
			                			regulation.is_disabled = false;
			                	
			                		} else {//loggedIn user has Restricted access
			                			var regId = regulationMapOfLogInUser[item.geography_id + '' + item.regulation_id];
			                			if (regId > 0) {
			                				regulation.is_disabled = false;
			                			} else {
			                				regulation.is_disabled = true;			                				
			                			}
			                		}
			                		//Set allowed regulations based on user to be edited
			                		if (regulationMapOfEditUser.size == 0) {//edited user has Full access
			                			regulation.is_selected = true;
			                	
			                		} else {//edited user has Restricted access
			                			var regId = regulationMapOfEditUser[item.geography_id + '' + item.regulation_id];
			                			if (regId > 0) {
			                				regulation.is_selected = true;
			                			} else {
			                				regulation.is_selected = false;			                				
			                			}
			                		}				                		             			
			                		geographies[geography_position].regulations.push(regulation);
			                		//reset the current geography array element position
			                		if ((index+1) < result.length && item.geography_id != result[index+1].geography_id) {
			                			geography_position++;
			                		}

			                	}
			                    
			                });
			                geographyArray = geographies;			                
			                callback();
		                } else {
							callback();	
		                }
		            }
				});
    		}

    	], function(err) {
            if (err) { 
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while updating Regulation.Please contact Administrator.' });
            } else {
                Logger.log('debug', 'RegulationController.findByGeo4Edit', 'Allowed Regulations 966Sent.', geographyArray, null);
                return res.json(200, geographyArray);
            }
      });
    }, 

    //In Document Management Page, to populate geo, domain, regulation, document dropdownlist
    findRegulationData : function(req, res) {
    	var userConfig = req.session.userConfig;
    	var regulationData = {};
    	var geoList = {};
    	async.series([
    		//find geo from geogeography master table
    		function(callback) {
    			var params = [];
	          var sql = "SELECT id, name FROM geography where status=true";

             if (!userConfig.full) {
             	 sql = "SELECT distinct g.id as geography_id, g.name FROM subscription s, subscription_detail sd, geography g " + 
    						   " WHERE s.user_id=? and s.id=sd.subscription_id and sd.geography_id = g.id AND g.status=1 ";
                 params = [req.session.user.id];	
             }

             console.log("testing 1======================", params);
			
			console.log(" geography list "+sql);

	          
	          User.query(sql, params, function(err, result) {  
	              if (err) {
	                Logger.log('error', 'RegulationController.findRegulationData', 'STEP-0: geography :The following error occurred:', null, err);
	                callback(err);
	              } else {                              	             
	                regulationData.geoCollection = result; 	               
	                callback();
	              }            
	          });             
	        },    		
    		
    		//find countries
    		function(callback) {
    		     var params = [];
				var sql ="SELECT  c.id as country_id,c.name as cname,g.id as geography_id "+
                " FROM country c,geography g where g.status=true and g.id = c.geo_id and c.status=true";

               
    			if (!userConfig.full) {
    				sql = "SELECT distinct c.id as country_id, c.name as cname, g.id as geography_id "+
    				       " FROM subscription s, subscription_detail sd, geography g, country c " + 
    					   " WHERE s.user_id=? and s.id = sd.subscription_id and sd.geography_id = g.id and sd.country_id = c.id and g.status=true and c.status=true ";
    			    params = [req.session.user.id];		   

    			}



    			console.log(" geography list "+sql);
						  
				Regulation.query(sql, params, function(err, result) {
		            if (err) {
		              Logger.log('error', 'RegulationController.findRegulationData', 'step 1 countries :The following error occurred:', null, err);
		              callback(err);		           
		            } else {			    
			            if (result.length > 0) {
			            	regulationData.countryCollection = result;
			            	callback();
			            } else {
			            	regulationData.countryCollection = [];
			            	callback();
			            }
					}
				});		    				

    		},
    		//find state
    		function(callback) {
    			/*var sql = "SELECT gd.state_id, gd.country_id, s.name as sname " + 
    					  "  FROM state s, geography_domain_link gd WHERE s.status=true and s.id=gd.state_id ";*/
                var params = [];
				var sql =" SELECT  g.name as gname,g.id as geography_id,s.id as state_id,s.name as sname, s.country_id as country_id "+
				         " FROM geography g, country c,state s"+
          				 " where s.status = true and g.status=true and c.status=true and c.id = s.country_id and s.geography_id = g.id" ;


    			if (!userConfig.full) {
    				sql = "SELECT distinct g.name as gname,g.id as geography_id,st.id as state_id,st.name as sname, st.country_id as country_id  "+
    				       " FROM geography g,subscription s, subscription_detail sd, country c ,state st" + 
    					   " WHERE s.id=sd.subscription_id AND s.user_id=? and  "+
    					   " sd.country_id = c.id and sd.state_id = st.id and c.status=true and g.status=true and g.id=st.geography_id and c.status=true and st.status=true";
    			    params = [req.session.user.id];	
    			
    			}

    			console.log(" geography list "+sql);
						  
				Regulation.query(sql, params, function(err, result) {
		            if (err) {
		              Logger.log('error', 'RegulationController.findRegulationData', 'step 2 state :The following error occurred:', null, err);
		              callback(err);		           
		            } else {			    
			            if (result.length > 0) {
			            	regulationData.stateCollection = result;
			            	callback();
			            } else {
			            	regulationData.stateCollection = [];
			            	callback();
			            }
					}
				});		    				

    		},
    		// find domains
    		function(callback) {

    			//Louis - added to use in file upload
                  var params = [];
    			 var sql = "SELECT  d.id as did ,d.name, d.description,"+
				    " gd.geography_id as gid, gd.country_id as cntid, gd.state_id as sid, gd.domain_id as did"+
					" FROM domain d, geography_domain_link gd  "+
					" where d.status = true "+
					" and  d.id = gd.domain_id";

    			/*var sql = "SELECT gd.state_id, gd.domain_id, d.name as dname " + 
    					  "  FROM domain d, geography_domain_link gd WHERE d.status=true and d.id=gd.domain_id "; */

    		 
    			if (!userConfig.full) {
    			  sql = "SELECT distinct d.id as did ,d.name, d.description, "+
			       " sd.geography_id as gid, sd.country_id as cntid, sd.state_id as sid "+
					" FROM domain d, subscription s, subscription_detail sd, user u "+
					" WHERE u.id=s.user_id and s.id=sd.subscription_id and d.id = sd.domain_id and  u.id=? and d.status=true";   
					params = [req.session.user.id];
    			}
				  
				Regulation.query(sql, params, function(err, result) {
		            if (err) {
		              Logger.log('error', 'RegulationController.findRegulationData', 'step 3 domain:The following error occurred:', null, err);
		              callback(err);		           
		            } else {			    
			            if (result.length > 0) {
			            	regulationData.domainCollection = result;
			            	callback();
			            } else {
			            	regulationData.domainCollection = [];
			            	callback();
			            }
					}
				});		    				

    		},
    		 /*function(callback){

    		 	// var sql = "SELECT s.id as sid,s.name as sname, s.country_id as scid FROM country c,state s"+
        		//  " where s.status = true and c.id = s.country_id";

    			var sql = "SELECT rdl.geography_id, rdl.domain_id, rdl.state_id,s.name as sname FROM regulation_document_link rdl,state s " +
    			          "WHERE s.id = rdl.state_id ";

    			     var params = [];
    			     Regulation.query(sql,params,function(err,result){
    			     	 if (err) {
			              Logger.log('error', 'RegulationController.findRegulationData', 'The following error occurred:', null, err);
			              callback(err);		           
			            }
			            else{
			            	regulationData.stateCollection = result;
			            	callback();
			            }
    			     });    
    		},*/

    		//find domains
    		
    		/*function(callback){

    		var sql = "SELECT rdl.geography_id, rdl.domain_id, rdl.country_id,c.name as cname FROM regulation_document_link rdl ,country c " +
    			          "WHERE c.id = rdl.country_id ";
    			// var sql = "SELECT c.id, g.id as gid,c.name as cname FROM country c, geography g " +
    			//           "WHERE g.status =true AND g.id = c.geo_id ";

    			     var params = [];
    			     Regulation.query(sql,params,function(err,result){
    			     	 if (err) {
			              Logger.log('error', 'RegulationController.findRegulationData', 'The following error occurred:', null, err);
			              callback(err);		           
			            }
			            else{
			            	regulationData.countryCollection = result;
			            	callback();
			            }
    			     });    

    		},*/
            // find regulator
    		function(callback){

    			/*var sql = "SELECT r.id, r.name as rname, rdl.geography_id, rdl.  FROM regulation_document_link rdl,regulator r " +
    			          "WHERE r.id = rdl.regulator_id "; */


    			    //Alter for loading the regulator 
					var sql = "select distinct rdl.regulator_id as rid, rdl.geography_id as gid, rdl.country_id as cntid, rdl.state_id as sid, "+" rdl.domain_id as did, r.name as rname"+ " from regulation_document_link rdl, regulator r "+ " where r.id = rdl.regulator_id and r.status = true";

					var params = [];
	    			if (!userConfig.full) 
	    			{

							sql = "select distinct rdl.regulator_id as rid, rdl.geography_id as gid, rdl.country_id as cntid, rdl.state_id as sid, "+
							      " rdl.domain_id as did, r.name as rname "+
							    " from regulation_document_link rdl, regulator r, user u, subscription_detail sd, subscription s "+
							    " where r.id = rdl.regulator_id and r.status = true "+
							    " and u.id = s.user_id and  s.id = sd.subscription_id "+
							    " and sd.regulation_id = rdl.regulation_id and u.id = ? ";

							 params = [req.session.user.id];
		    		}

    			     Regulation.query(sql,params,function(err,result){
    			     	 if (err) {
			              Logger.log('error', 'RegulationController.findRegulationData', 'step 4:regulatorThe following error occurred:', null, err);
			              callback(err);		           
			            }
			            else{
			            	regulationData.regulatorCollection = result;
			            	callback();
			            }
    			     });    
    		},
    		//find Regulations
    		function(callback) {
    			
    			/*var sql = "SELECT distinct rdl.geography_id, rdl.domain_id, rdl.regulation_id, r.name as rname " + 
    					  "  FROM regulation r, regulation_document_link rdl WHERE r.status=true and r.id=rdl.regulation_id "; */

    					/*  var sql = "SELECT distinct rdl.geography_id, rdl.country_id, rdl.state_id, rdl.domain_id, "+
    					            " rdl.regulation_id, r.name as rname, rrl.regulator_id  "+
									" FROM regulation r, regulation_document_link rdl, regulator_regulation_link rrl "+
									" WHERE r.status=true and r.id=rdl.regulation_id  "+
 									" and rdl.regulation_id = rrl.regulation_id";*/


 				var sql = "SELECT DISTINCT r.id as rlid, r.name as rname, rdl.geography_id as gid, rdl.country_id as cntid, "+
						" rdl.state_id as sid, rdl.domain_id  as did, rdl.regulator_id as rid  "+
						" FROM regulation_document_link rdl,regulation r "+
						" WHERE r.id = rdl.regulation_id and r.status = true " ;

    			if (userConfig.full) {
					var params = [];		  
					Regulation.query(sql, params, function(err, result) {
			            if (err) {
			              Logger.log('error', 'RegulationController.findRegulationData', 'step 5:regulations:The following error occurred:', null, err);
			              callback(err);		           
			            } else {			    
				            if (result.length > 0) {
				            	regulationData.regCollection = result;
				            	callback();
				            } else {
				            	regulationData.regCollection = [];
				            	callback();
				            }
						}
					});	
    			} else { //restricted

    				//Louid - for file upload
    				/*var sqld = "SELECT distinct sd.geography_id, sd.domain_id, sd.regulation_id "+
    				            " FROM subscription s, subscription_detail sd " + 
    						   " WHERE s.id=sd.subscription_id AND s.user_id=?";*/


    			      var sqld ="select distinct rdl.regulation_id as rlid, rdl.geography_id as gid, rdl.country_id as cntid, "+
    			      			" rdl.state_id as sid, rdl.domain_id as did, r.name as rname "+
				       			" from regulation_document_link rdl, regulation r, user u, subscription_detail sd, subscription s "+
				       			" where r.id = rdl.regulation_id and r.status = true "+
				        		" and u.id = s.user_id and  s.id = sd.subscription_id "+
				    			" and sd.regulation_id = rdl.regulation_id and u.id = ?" ;


    				var params = [req.session.user.id];
					Regulation.query(sqld, params, function(err, result) {
			            if (err) {
			              Logger.log('error', 'RegulationController.findRegulationData', 'The following error occurred:', null, err);
			              callback(err);		           
			            } else {			    
				            if (result.length > 0) {
			    				var domainInClause = "";
			    				var regInClause = "";
			    				result.forEach(function(item, index) {

			    					console.log("result============================" , result);
			    					if (index == 0) {
			    						domainInClause = item.did;
			    						regInClause = item.rlid;	
			    					} else {
			    						domainInClause = domainInClause + "," + item.did;
			    						regInClause = regInClause + "," + item.rlid;
			    					}
			    				});
			    				sql = sql + " AND rdl.domain_id IN (" + domainInClause + ") " +
			    							" AND r.id IN (" + regInClause + ")";				            				    				
								var params = [];		  
								Regulation.query(sql, params, function(err, regs) {
						            if (err) {
						              Logger.log('error', 'RegulationController.findRegulationData', 'step 5:regulations:The following error occurred:', null, err);
						              callback(err);		           
						            } else {			    
							            if (regs.length > 0) {
							            	regulationData.regCollection = regs;
							            	callback();
							            } else {
							            	regulationData.regCollection = [];
							            	callback();
							            }
									}
								});				    								            	
				            } else {
				            	regulationData.regCollection = [];
				            	callback();
				            }
						}
					});	    				
    			}    			
    		
    		},
    		//find Documents
    		function(callback) {

    			//Louis - for file uplad
    			/*
    			var sql = "SELECT distinct geography_id , domain_id , regulator_id, regulation_id , document_id as id, d.name as docname " + 
    					  "  FROM regulation_document_link rd, document d WHERE d.status=true and d.id=rd.document_id ";
    					  */

    		    var sql = " SELECT distinct geography_id as gid, country_id as cntid, state_id as sid, "+
							" domain_id as did , regulator_id as rid, regulation_id as rlid , "+
							" document_id as docid, d.name as docname,d.is_special_doc as is_special_doc "+ 
							"  FROM regulation_document_link rd, document d WHERE d.status=true and d.id=rd.document_id ";

				var params = [];	



				Regulation.query(sql, params, function(err, result) {
		            if(err) {
		              Logger.log('error', 'RegulationController.findRegulationData', 'The following error occurred:', null, err);
		              callback(err);		           
		            } else {			    
			            if (result.length > 0) {
			            	regulationData.documentCollection = result;
			            	callback();
			            } else {
			            	regulationData.documentCollection = [];
			            	callback();
			            }
					}
				});	    			
    		},
            // find sub documents
    		function(callback){

    			//Louis - for upload

    			/*var sql = "SELECT sdoc.id as subDocId,geography_id,domain_id,regulation_id,document_id,country_id,state_id,regulator_id, sdoc.name as subDocName FROM regulation_document_link rdl,subtype_document sdoc " +
    			          "WHERE sdoc.id = rdl.sub_document_id ";
    			          */

					 var sql = " SELECT distinct rd.geography_id as gid, rd.country_id as cntid, rd.state_id as sid, "+
					  " rd.domain_id as did , rd.regulator_id as rid, rd.regulation_id as rlid , "+
					  " rd.document_id as docid,rd.sub_document_id as sdocid, sd.name as subdocname,sd.is_special_doc as is_special_doc "+
					   " FROM regulation_document_link rd, document d, document sd"+
					  "  WHERE sd.status=true and d.id=rd.document_id and "+
					   " rd.sub_document_id = sd.id";

    			     var params = [];
    			     Regulation.query(sql,params,function(err,result){
    			     	 if (err) {
			              Logger.log('error', 'RegulationController.findRegulationData', 'The following error occurred:', null, err);
			              callback(err);		           
			            }
			            else{
			            	regulationData.subDocumentCollection = result;
			            	callback();
			            }
    			     });    
    		},

    	], function(err) {
            if (err) {              
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching regulation while uploading file.Please contact Administrator.' });
            } else {               
                Logger.log('debug', 'RegulationController.findRegulationData', 'RegulationData Sent.', regulationData, null);
                return res.json(200, regulationData);
            }
      });
    },

   	getAll : function(req,res) {
      	var sql = "SELECT distinct rl.id as rlid, rl.name, g.name as geo, g.id as gid, rdl.country_id as cntid, rdl.state_id as sid,"+ 
				   " rdl.domain_id as did, r.id as rid, rl.regulation_status as rstatus  FROM regulator r, regulation rl, geography g,  "+
					" regulation_document_link rdl where r.id = rdl.regulator_id and rdl.geography_id = g.id and "+
					"rl.id = rdl.regulation_id and r.status=true and rl.status=true and g.status=true ";
      	var params = [];
      	Regulation.query(sql, params, function(err, result) {
            if (err) {
              	Logger.log('error', 'RegulationController.getAll', 'The following error occurred:', null, err);
            	return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Regulation.' });
            } else {
                Logger.log('debug', 'RegulationController.getAll', 'Sent All Regulations.', result, null);
                return res.json(200, result);
            }
        });
    },

	getRegulations : function(req,res){
	//  var sql = "SELECT  id,name, description FROM regulation where status = true ";
		var userConfig = req.session.userConfig;
		console.log(userConfig);
      	if (userConfig.full) {
       		sql = " SELECT " +
                  " distinct r.id as id, r.name as name,r.description as description,r.regulation_status as regulation_status " +
                  "  FROM regulation r" + 
                  " WHERE r.status = true" ; 
            var params = [];         	
      	} else {
       		sql = " SELECT " +
                  " distinct g.id as gid, g.name as gname, r.id as id, r.name as name,r.description as description,r.regulation_status as regulation_status   " +
                  "  FROM geography g, regulation r, subscription s, subscription_detail sd, user u " +
                  " WHERE u.id=s.user_id and s.id=sd.subscription_id and g.id = sd.geography_id and  u.id=? and sd.regulation_id = r.id and g.status=true and r.status=true ";    		
      		var params = [req.session.user.id];
      	}
		if (req.param('limit') && req.param('limit') != undefined) {
		    var limit = req.param('limit');
		    sql = sql + " ORDER BY id LIMIT " + limit;
		    if (req.param('offset') && req.param('offset') != undefined) {
		      var offset = req.param('offset');
		      sql = sql + " OFFSET " + offset;
		    } else {
		      sql = sql + " OFFSET 0 ";
		    }
		  } else {
		    if (req.param('name') && req.param('name') != undefined) {
		        sql = sql + " AND name LIKE '%" + req.param('name') + "%'";
		    }
		    sql = sql + " ORDER BY id ";
      }       	
	  Regulation.query(sql, params, function(err, result) {
            if (err) {
              	Logger.log('error', 'RegulationController.find', 'The following error occurred:', null, err);
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Regulation .Please contact Administrator.' });
            } else {
                Logger.log('debug', 'RegulationController.find', 'Allowed Regulations Sent', result, null);
                return res.json(200, result);
            }
    	});
	},

	getDomains : function(req,res){
		//Louis , this is used in Regulation management, no where else. modified for the need
		 //var sql = "SELECT  d.id, FROM domain where status = true ";

		 var sql = "SELECT  d.id as did ,d.name, d.description,"+
				    " gd.geography_id, gd.country_id, gd.state_id, gd.domain_id "+
					" FROM domain d, geography_domain_link gd  "+
					" where d.status = true "+
					" and  d.id = gd.domain_id";

		/*if (!userConfig.full) {
      		sql = "SELECT distinct d.id as did ,d.name, d.description, "+
			       " sd.geography_id, sd.country_id, sd.state_id "+
					" FROM domain d, subscription s, subscription_detail sd, user u "+
					" WHERE u.id=s.user_id and s.id=sd.subscription_id and d.id = sd.domain_id and  u.id=?";    		
      		var params = [req.session.user.id];
      	}	*/

	  //var sql = "SELECT  * FROM domain where status = true ";
	  Domain.query(sql, function(err, domain) {
	        if(err) {
	          console.log(err);
	        } else {
	            console.log("All Domain");
	            console.log(domain);
	            res.json(domain);
	        }
	    });
	},
	getGeographys : function(req,res){
		var userConfig = req.session.userConfig;
      	if (userConfig.full) {
       		sql = " SELECT " +
                  " distinct g.id as id, g.name as name, g.description as description " +
                  "  FROM geography g " +
                  "  WHERE g.status = true" ; 
            var params = [];         	
      	} else {
       		sql = " SELECT " +
                  " distinct g.id as id, g.name as name, g.description as description " +
                  "  FROM geography g, subscription s, subscription_detail sd, user u " +
                  " WHERE u.id=s.user_id and s.id=sd.subscription_id and g.id = sd.geography_id and  u.id=? and g.status=true ";    		
      		var params = [req.session.user.id];
      	}	
      	User.query(sql, params, function(err, users) {
            if(err) {
             Logger.log('error', 'RegulationController.find', 'The following error occurred:', null, err);
			return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching Geography .Please contact Administrator.' });
                //return res.json({ err: err }, 500);
            } else {
                console.log(users);
    			Logger.log('debug', 'RegulationController.find', 'Sent Allowed Geos.', users, null);
                res.json(users);
            }
        });
	  // var sql = "SELECT  * FROM geography where status = true ";
	  // Geography.query(sql, function(err, geography) {
	  //       if(err) {
	  //         console.log(err);
	  //       } else {
	  //           console.log("All Geography");
	  //           console.log(geography);
	  //           res.json(geography);
	  //       }
	  //   });
	},

	createRegulation : function(req,res){
	  var regFormData = (req.body) ? req.body : undefined;
	  console.log(regFormData);
	  var regulation = {};

	  async.series([
	        function(callback) {
	              Regulation.find({name : regFormData.name, status: true}).exec(function (err ,regData) {
	                 if(err){
	                    Logger.log('error', 'RegulationController.createRegulation', 'The following error occurred(While checking the Regulation):', null, err);
	              		callback(err);
	                }else if ( regData.length>0){
	               Logger.log('debug', 'RegulationController.createRegulation', 'STEP-0a:Regulation Already Exist.', null, null);
	              callback({errMsg : 'Regulation Already Exist' , errCode : 'errRegulation'});
	            } else callback();
	        });
	    	},function(callback) {
	            console.log('STEP-1:Insert into regulation table');
	            var regData = {
		            name    : regFormData.name,
		            description : regFormData.description,
		            regulator : regFormData.regulator,
		            regulation_status : regFormData.Regstatus,
	            };
	            console.log("regData");console.log(regData);

	            Regulation.create(regData).exec(function(err, result) {
	              if(err) {
		            console.log(err);
		            callback(err);
	              } else {
	                  console.log(result);
	                  regulation = result;
	                  callback();
	                }
	          });

	    }



	  /*//INSERTING INTO REGULATION DOCUMENT LINK TABLE 
	function(callback){
	      console.log('rg _ id :: ' + regulation.id );
	      //var regFormdata;
	      var sql = "INSERT INTO regulation_document_link (geography_id,domain_id,regulation_id, document_id) VALUES (?,?,?,?)";
	      var params = [regFormData.geography_id,regFormData.domain_id,regulation.id,regFormData.document_id];//regulation.id, item];
	      regulation_document_link.query(sql, params, function(err, result) {
	        if(err) {
	          console.log(err);
	          callback(err);
	        } else {

	        	 callback();
	        }
	      });
	      
	},
	//INSERTING INTO REGULATION GEOGRAPHY TABLE
	function(callback){
	      console.log('rg _ id :: ' + regulation.id );
	      //var regFormdata;
	      var sql = "INSERT INTO geography_regulation_link (geography_id,regulation_id) VALUES (?,?)";
	      var params = [regFormData.geography_id,regulation.id];//regulation.id, item];
	      Geography_Regulation_link.query(sql, params, function(err, result) {
	        if(err) {
	          console.log(err);
	          callback(err);
	        } else {

	        	 callback();
	        }
	      });
	      
	},// INSERTING INTO REGULATION DOMAIN TABLE
	function(callback){
	      console.log('rg _ id :: ' + regulation.id );
	      //var regFormdata;
	      var sql = "INSERT INTO domain_regulation_link (domain_id,regulation_id) VALUES (?,?)";
	      var params = [regFormData.domain_id,regulation.id];//regulation.id, item];
	      domain_regulation_link.query(sql, params, function(err, result) {
	        if(err) {
	          console.log(err);
	          callback(err);
	        } else {

	        	 callback();
	        }
	      });
	  }
	*/

		], function(err) {
	    	if (err) {
	        		console.log(err);
	        	if ( err.hasOwnProperty('errCode') && err.errCode == 'errRegulation') 
	          		return res.json(500, { errCode: 'errRegulation' , errMsg: 'Regulation Already Exist.' });
	      		else    return res.json(500, { errCode: 500 , errMsg: 'Regulation Already Exist.' });
	      	} else {
	        	console.log("To know REGULATION collection details", regulation);
	        	Logger.log('debug', 'RegulationController.createRegulation', 'Regulation Created.', null, null);
	                res.status(200).json(200);
	    }
		});

	},

	updateRegulation : function(req,res){
		var regFormData = (req.body) ? req.body : undefined;
		console.log('regFormData::: ', regFormData);
		var regulation = {};
		var regdoc = [];
		var regDocDetail = [];
		var geography_id = parseInt(regFormData.geography_id, 10),
	    domain_id    = parseInt(regFormData.domain_id, 10), 
	    regulation_id= parseInt(regFormData.id, 10), 
	    document_id  = parseInt(regFormData.document_id, 10),
	    country_id = parseInt(regFormData.country_id, 10),
		state_id = parseInt(regFormData.state_id, 10),
		regulator_id = parseInt(regFormData.regulator_id, 10),
	    sub_document_id = parseInt(regFormData.sub_document_id, 10);
	    regulationStatus = parseInt(regFormData.Regstatus, 10);


	async.series([
		// UPDATING REGULATION TABLE
		function(callback) {
		  console.log("step-1 updating regulation");
		  var sql = "UPDATE regulation set name=?,description=?, regulation_status=? where id=?";
		  Regulation.query(sql,[regFormData.name,regFormData.description, regulationStatus, regFormData.id],function (err ,regulation) {
		     if(err){
		        console.log(err);
		        callback(err)
		    }else{
		      console.log(regulation);
		      callback();
		    }
		  })
		},

	function(callback) {
		  console.log("step-2 updating regulator_regulation_link table");

		var sql1 = " SELECT regulator_id FROM regulator_regulation_link " +
        		   "  WHERE regulation_id=? and regulator_id = ?" ;

        var params = [regulation_id,regFormData.regulator_id];
        console.log('params');console.log(params);
        regulator_regulation_link.query(sql1, params, function(err, data) {
			if (err) {
            	console.log(err);
            	callback(err);
          	} else if (data.length == 0){
      		    var sql = "INSERT INTO regulator_regulation_link (regulation_id, regulator_id) values(?,?)";
      			var params = [regulation_id,regFormData.regulator_id];
      			console.log('params'+params);
				regulator_regulation_link.query(sql, params, function(err, result) {
		          if(err) {
		            console.log(err);
		            callback(err);
		          } else {
		          	console.log("err1");
		            callback();
		          }
		        });
          	} else {
          		callback();	
          	}

        });	

      },



		//inserting GEOGRAPHY REGULATION TABLE
	function(callback) {
        console.log('STEP-3: UPDATING into regulation-GEOGRAPHY mapping');

        var sql1 = " SELECT regulation_id FROM geography_regulation_link " +
        		   " WHERE geography_id=? AND regulation_id=? AND country_id=? AND state_id=?";
        		   
        var params = [geography_id,regulation_id,country_id,state_id];
        //var params = [regFormData.geography_id,regFormData.id];
        console.log('params');console.log(params);
        Geography_Regulation_link.query(sql1, params, function(err, data) {
			if (err) {
            	console.log(err);
            	callback(err);
          	} else if (data.length == 0){
          			var sql = "INSERT INTO geography_regulation_link (geography_id, regulation_id, country_id, state_id) values(?,?,?,?)";
          			var params = [geography_id,regulation_id,country_id,state_id];
          			//var params = [regFormData.geography_id, regFormData.id];
          			console.log('params'+params);
					Geography_Regulation_link.query(sql, params, function(err, result) {
			          if(err) {
			            console.log(err);
			            callback(err);
			          } else {
			            callback();
			          }
			        });
          		} else {
          			console.log("err");
          			callback();	
          		}

        });	
	},//inserting domain REGULATION TABLE
    function(callback) {
        console.log('STEP-4: UPDATING into regulation-domain mapping');
        var sql1 = " SELECT regulation_id FROM domain_regulation_link " +
        		   " WHERE domain_id=? " +
        		   " AND regulation_id=? " ;
        var params = [domain_id,regulation_id];
        console.log('params1');console.log(params);
        domain_regulation_link.query(sql1, params, function(err, data) {
			if (err) {
            	console.log(err);
            	callback(err);
          	} else if (data.length == 0){
          		console.log("condition 1");
      		    var sql = "INSERT INTO domain_regulation_link (domain_id, regulation_id) values(?,?)";
      			var params = [domain_id, regulation_id];
      			console.log('params2'+params);
				domain_regulation_link.query(sql, params, function(err, result) {
		          if(err) {
		            console.log(err);
		            callback(err);
		          } else {
		          	console.log("err1");
		            callback();
		          }
		        });
          	} else {
          		callback();	
          	}

        });	
    }, 

    function(callback) {
          regulation_document_link.find({geography_id,domain_id,regulation_id,document_id,country_id,state_id,regulator_id,sub_document_id,regulationStatus}).exec(function (err ,regData) {
            if(err){
                Logger.log('error', 'RegulationController.updateRegulation', 'The following error occurred(While checking the Regulation):', null, err);
          		callback(err);
            }else if ( regData.length>0){
           		Logger.log('debug', 'RegulationController.updateRegulation', 'STEP-0a:this path Already Exist.', null, null);
          		callback();
        		//res.json(regDocDetail);
        	} else callback();
    	});
	},

		    //UPDATING regulation_document_link TBLE
	function(callback) {
        console.log('STEP-2: UPDATING into regulation-document mapping');

        var sql1 = " SELECT regulation_id FROM regulation_document_link " +
        		   "  WHERE geography_id=? " +
        		   "    AND domain_id=? " +
        		   "    AND regulation_id=? " +
        		   "    AND document_id=? AND country_id=? AND state_id=? AND regulator_id=? AND sub_document_id=? " ;
        var params = [geography_id, domain_id, regulation_id, document_id,country_id,state_id,regulator_id,sub_document_id,regulationStatus];
        console.log('params');console.log(params);
        regulation_document_link.query(sql1, params, function(err, data) {
			if (err) {
            	console.log(err);
            	callback(err);
          	} else if (data.length == 0){
			        var regData = { geography_id : geography_id,
      				domain_id    : domain_id, 
      				regulation_id: regulation_id, 
      				document_id  : document_id,
      				country_id  : country_id,
      				state_id : state_id,
      				regulator_id : regulator_id,
      				sub_document_id :sub_document_id,
      				regulationStatus :regulationStatus
				    };

          			console.log('regData');console.log(regData);
          			// var sql = "INSERT INTO regulation_document_link (geography_id,domain_id, regulation_id, document_id) values(?,?,?,?)";
          			// var params = [regFormData.geography_id, regFormData.domain_id, regFormData.id, regFormData.document_id];
          			// console.log('params'+params);
					regulation_document_link.create(regData).exec(function(err, result) {
			          if (err) {
			            console.log(err);
			            callback(err);
			          } else {
			          	regdoc.push(result);
			          	console.log('regdoc');console.log(regdoc);
			            callback();
			          }
			        });
          		} else {	          			
          			callback();	
          		}	

        });	


	},


	function(callback) {
		if (regdoc.length == 0) {
			// regDocDetail = regdoc;
			callback();
		} else {
			var sql=" SELECT rd.id as rdlid, g.id as geography_id,d.id as domain_id,d.name as domain_name,doc.name as document_name, " + 
					" doc.id as document_id,g.name as geography_name, r.id as regulation_id, r.name as regulation_name, c.name as country_name,c.id as country_id,s.name as state_name,s.id as state_id ," +
					" reg.name as regulator_name, reg.id as regulator_id, subdoc.name as sub_doc_name, subdoc.id as sub_document_id, rd.regulationStatus " + 
					" FROM document doc,domain d,geography g, regulation_document_link rd, regulation r, country c, state s," +
					" regulator reg, document subdoc " + 
					" WHERE g.id=rd.geography_id AND r.id=rd.regulation_id AND d.id=rd.domain_id AND  doc.id=rd.document_id AND c.id=rd.country_id AND s.id=rd.state_id AND reg.id=rd.regulator_id AND subdoc.id=rd.sub_document_id" + 
					" AND rd.geography_id=? AND rd.domain_id=? AND r.id=? AND rd.document_id=? AND rd.country_id=? AND rd.state_id=? AND rd.regulator_id=? AND rd.sub_document_id=? AND rd.regulationStatus=? AND doc.status=1 AND d.status=1 AND g.status=1 AND r.status=1 AND c.status=1 AND s.status=1 AND reg.status=1 AND subdoc.status=1";
			var params = [geography_id, domain_id, regulation_id, document_id,country_id,state_id,regulator_id,sub_document_id,regulationStatus];		
			console.log("params step -3:::::::" + params);
		  	regulation_document_link.query(sql,params,function(err, reg) {
		      	if(err) {
		        	console.log(err);
		        	callback(err);
		      	} else {
		      		console.log(reg);
		            regDocDetail = reg;
		            callback();
		      	}
		  	});
	  	}
	}

	/*function(callback) {
	        console.log('STEP-2: UPDATING into regulation-domain mapping');
	        console.log('regFormData.id ::' +  regFormData.id);
	        console.log('regFormData.domain_id :: ' + regFormData.domain_id);
	        console.log('regFormData.old_domain_id ::'+ regFormData.old_domain_id);
	    
	        var sql = "UPDATE domain_regulation_link set domain_id=? where regulation_id=?";
	        var params = [regFormData.domain_id,regFormData.id]; //[regFormData.id, item];
	        domain_regulation_link.query(sql, params, function(err, result) {
	          if(err) {
	            console.log(err);
	            callback(err);
	          } else {
	          	console.log(result);
	            callback();
	          }
	        });

	},//UPDATING regulation GEOGRAPHY TABLE
	function(callback) {
	        console.log('STEP-2: UPDATING into regulation-GEOGRAPHY mapping');
	        console.log('regFormData.id ::' +  regFormData.id);
	        console.log('regFormData.geography_id :: ' + regFormData.geography_id);
	        console.log('regFormData.old_geography_id ::'+ regFormData.old_geography_id);
	    
	        var sql = "UPDATE geography_regulation_link set geography_id=? where regulation_id=?";
	        var params = [regFormData.geography_id,regFormData.id]; //[regFormData.id, item];
	        Geography_Regulation_link.query(sql, params, function(err, result) {
	          if(err) {
	            console.log(err);
	            callback(err);
	          } else {
	          	console.log(result);
	            callback();
	          }
	        });

	}*/
	], function(err) {
			if (err) {
	    		console.log(err);
	    		if ( err.hasOwnProperty('ecode'))
	      			return res.send({ err: 'Exception caught while creating the Regulation' }, 500);
	    		else
	      			return res.json({ err: err }, 500);
	 		} else {
	    			console.log('New Regulation-Document link Saved.');
	    			console.log(regDocDetail);
	    			res.json(regDocDetail);
			}
		});

	},

	findRegulation : function(req,res){
		var regId = req.params.id;
		Regulation.find({id : regId, status: true}).exec(function (err ,regulation) {
	 		if(err){
	    		console.log(err);
			}else{
	  			res.json(regulation);
			}
		});
	},

	findDomain : function(req,res){

		var domainId = req.params.id;
		Domain.find({id : regId, status: true}).exec(function (err ,domain) {
	 		if(err){
	    		console.log(err);
			}else{
	  			res.json(domain);
			}
		});
	},

	findGeography : function(req,res){
		var geoId = req.params.id;
		Geography.find({id : geoId, status: true}).exec(function (err ,geography) {
			if(err){
	    		console.log(err);
			}else{
	  			res.json(geography);
			}
		});
	},

	destroy : function(req,res){
		var postData = (req.body) ? req.body : undefined;

		async.series([
			function(callback) {
				console.log("destroy id :: "); console.log(postData.regulation_id);
				var sql = "UPDATE regulation set status=false where id=?";
				Regulation.query(sql,[postData.regulation_id],function (err ,regulation) {
	 				if(err){
	    				console.log(err);
	    				callback(err);
					}else{
	  					console.log('regulation::'+regulation);
	  					//res.send('success'); 
	  					callback();
	  					

					}
				});
			},//DELETING in domain_regulation_link table
			function(callback) {
				var postData = (req.body) ? req.body : undefined;
	     		var sql = "DELETE FROM domain_regulation_link WHERE regulation_id=?";
	      		var params = [postData.regulation_id];
	      		console.log("destroy domain_regulation_link::params");console.log(params);
	      		domain_regulation_link.query(sql, params, function (err, result) {
	          		if (err) {
	              		console.log(err);
				Logger.log('error', 'RegulationController.getAll', 'The following error occurred:', null, err);
	              		return res.json({ err: err }, 500);
	         		} else{
	              		//res.send('success'); 
	              		callback();             
	          		}
	      		});

			},//DELETING in geography_regulation_link table
			function(callback) {
				var postData = (req.body) ? req.body : undefined;
	      		var sql = "DELETE FROM geography_regulation_link WHERE regulation_id=?";
	      		var params = [postData.regulation_id];
	      		console.log("destroy geography_regulation_link::params");console.log(params);
	      		Geography_Regulation_link.query(sql, params, function (err, result) {
	          	if (err) {
	            	console.log(err);
	              	return res.json({ err: err }, 500);
	          	} else{
	             	 //res.send('success'); 
	              	callback();             
	          	}
	      	});

			},//DELETING in regulation_document_link table
			function(callback){
	     		var postData = (req.body) ? req.body : undefined;
	     		var sql = "DELETE FROM regulation_document_link WHERE regulation_id=?";
	      		var params = [postData.regulation_id];
	      		console.log("destroy regulation_document_link::params");console.log(params);
	      		regulation_document_link.query(sql, params, function (err, result) {
	          		if (err) {
	             	 	console.log(err);
	              		return res.json({ err: err }, 500);
	        		} else{
	              		res.send('success'); 
	              		callback();             
	         		}
	      });
	}
	], function(err) {
			if (err) {
	    		console.log(err);
	    		if ( err.hasOwnProperty('ecode'))
	      			return res.send({ err: 'Exception caught while delating regulation ' }, 500);
	    		else
	      			return res.json({ err: err }, 500);
	 		} else {
	    			console.log('Regulation-Document link Deleted.');
	    			//res.json(regDocDetail);
			}
		});
	},

	deleteregulation : function(req,res){
	      var postData = (req.body) ? req.body : undefined;
	      console.log('POST_DATA: ', postData);
	      
	    async.series([
	    		//DELETING in domain_regulation_link table
				/*function(callback) {
					
	      			var sql = "DELETE FROM domain_regulation_link WHERE domain_id=? AND regulation_id=?";
	      			var params = [postData.domain_id, postData.regulation_id];
	      			console.log("domain_regulation_link===params");console.log(params);
	      			domain_regulation_link.query(sql, params, function (err, result) {
	          			if (err) {
	              			console.log(err);
	              			return res.json({ err: err }, 500);
	          			} else{
	              			//res.send('success'); 
	             			callback();             
	          			}
	      			});

				},//DELETING in geography_regulation_link table
				function(callback) {
					
	     			var sql = "DELETE FROM geography_regulation_link WHERE geography_id=? AND regulation_id=?";
	      			var params = [postData.geography_id, postData.regulation_id];
	      			console.log("geography_regulation_link==params");console.log(params);
	      			Geography_Regulation_link.query(sql, params, function (err, result) {
	         			 if (err) {
	             			 console.log(err);
	             			 return res.json({ err: err }, 500);
	          			} else{
	              			//res.send('success'); 
	              			callback();             
	          			}
	     			 });

				},*/
				//DELETING in regulation_document_link table
				function(callback){
					var postData = (req.body) ? req.body : undefined;     			
	     		var sql = " DELETE FROM regulation_document_link " + 
	     							" WHERE geography_id=? AND domain_id=? AND regulation_id=? AND document_id=? " +
	     							" AND country_id=? AND state_id=? AND regulator_id=? AND sub_document_id=? ";
	     		var params = [postData.geography_id, 
	     									postData.domain_id, 
	     									postData.regulation_id,
	     									postData.document_id,
	     									postData.country_id,
	     									postData.state_id,
	     									postData.regulator_id,
	     									postData.sub_document_id
	     									];	      			
    			console.log("regulation_document_link==params");console.log(params);
    			regulation_document_link.query(sql, params, function (err, result) {
        			if (err) {
          			console.log(err);
          			callback(err);
          			// return res.json({ err: err }, 500);
       			} else{	              			 
           		callback();             
        		}
	     		});
				}
	     
		], function(err) {
				if (err) {
	    			console.log(err);
	    			if ( err.hasOwnProperty('ecode'))
	      				return res.send(500, { err: 'Exception caught while deleting regulation ' });
	    			else
	      				return res.json(500, { err: err });
	 			} else {
	    				console.log(' Regulation-Document link deleted.');
	    				res.send('success');
			}
			}
		);    
	},

	findDocByRegId : function(req,res){
		var sql = "select d.* FROM document d,regulation_document_link rdl  where rdl.document_id=d.id and rdl.regulation_id=? and d.status=1";
	  	Doctypemodel.query(sql,[req.params.id],function (err ,document) {
	   		if(err){
	      			console.log(err);
	 		}else{
	    			console.log(document);
	   				res.json(document);
	  		}
	  	});
	},
	finDocByRegulationId : function(req,res){
	  	console.log('document :: id :: ' + req.params.id);
	  	var sql = "select d.* from document d,regulation r,regulation_document_link rdl where r.status=true and d.status=true and d.id = rdl.document_id and r.id = rdl.regulation_id and r.id=? ";
	 	 Document.query(sql,[req.params.id],function(err, document) {
	      	if(err) {
	        		console.log(err);
	      	} else {
	           		res.json(document);
	     	 }
	  	});
	},
	finDomainByRegulationId : function(req,res){
	  console.log('domain :: id :: ' + req.params.id);
	  var sql = "select d.* from domain d,regulation r,regulation_document_link rdl where  r.status=true and d.status=true and d.id = rdl.domain_id and r.id = rdl.regulation_id and r.id=? ";
	  Domain.query(sql,[req.params.id],function(err, domain) {
	      if(err) {
	        	console.log(err);
	      }	else {
	           res.json(domain);
	      }
	  });
	},
	fingeoByRegulationId : function(req,res){
	  console.log('geography :: id :: ' + req.params.id);
	  var sql = "select g.* from geography g,regulation r,regulation_document_link rdl where r.status=true and g.status=true and g.id = rdl.geography_id and r.id = rdl.regulation_id and r.id=? ";
	  Geography.query(sql,[req.params.id],function(err, geo) {
	      if(err) {
	        console.log(err);
	      } else {
	           res.json(geo);
	      }
	  });
	},
	editregulation:function(req,res){
		console.log('regulation :: id :: ' + req.param('id'));
		var sql=" SELECT rd.id as rdlid, g.id as geography_id,d.id as domain_id,d.name as domain_name,doc.name as document_name, " + 
						" 	doc.id as document_id,g.name as geography_name, r.id as regulation_id, r.name as regulation_name, c.name as country_name,c.id as country_id,s.name as state_name,s.id as state_id, " +	
						"   reg.name as regulator_name, reg.id as regulator_id, subdoc.name as sub_doc_name, subdoc.id as sub_document_id ,rd.regulationStatus as regulationStatus " +  
						" FROM document doc,domain d,geography g, regulation_document_link rd, regulation r, country c, state s, " +
						"   regulator reg, document subdoc " + 
						" WHERE g.id=rd.geography_id AND r.id=rd.regulation_id AND d.id=rd.domain_id AND  doc.id=rd.document_id AND c.id=rd.country_id AND s.id=rd.state_id AND reg.id=rd.regulator_id AND subdoc.id=rd.sub_document_id AND r.id=? AND doc.status=1 AND g.status=1 AND c.status=1 AND d.status=1 AND s.status=1 AND reg.status=1 AND subdoc.status=1";


	 			//var sql = "select geography_id,domain_id,document_id from regulation_document_link where  regulation_id=?";
	  	regulation_document_link.query(sql,[req.param('id')],function(err, geo) {
	      if(err) {
	        console.log(err);
	      } else {
	      		console.log(geo);
	            res.json(geo);

	      }
	  });


	},

		getUserRegulation:function(req,res){
		console.log('regulation :: id :: ' + req.param('id'));
		var sql=" SELECT g.id as geography_id,rd.countd.id, rd.state_id, rd.regulation_id, g.name as geography " +
		        " c.name as country, s.name as state, r.name as regulation " +
				" FROM country c,state s,geography g, regulation_document_link rd, regulation r " + 
				" WHERE g.id=rd.geography_id AND r.id=rd.regulation_id AND rd.country_id = c.id and rd.state_id = s.id and r.id=? AND c.status=1 AND s.status=1 AND g.status=1 AND r.status=1";
	 			//var sql = "select geography_id,domain_id,document_id from regulation_document_link where  regulation_id=?";
	  	regulation_document_link.query(sql,[req.param('id')],function(err, geo) {
	      if(err) {
	        console.log(err);
	      } else {
	      		console.log(geo);
	            res.json(geo);

	      }
	  });


	  },



	/*deleteregulationgeo : function(req,res){
		
	      var postData = (req.body) ? req.body : undefined;
	      console.log("postData ::::"+JSON.stringify(postData));
	      

	      var criteria = {
	          geography_id   : postData.geography_id,
	          regulation_id  : postData.regulation_id
	          

	      };
	      console.log("criteria :: Geography_Regulation_link :: "+JSON.stringify(criteria));
	      Geography_Regulation_link.destroy(criteria).exec(function (err) {
	          if (err) {
	              console.log(err);
	              return res.json({ err: err }, 500);
	          } else{
	              res.send('success');
	              
	          }
	      });
	},*/

	/*deleteregulationdom : function(req,res){
	      var postData = (req.body) ? req.body : undefined;
	      var sql = "DELETE FROM domain_regulation_link WHERE domain_id=? AND regulation_id=?";
	      var params = [postData.domain_id, postData.regulation_id];
	      domain_regulation_link.query(sql, params, function (err, result) {
	          if (err) {
	              console.log(err);
	              return res.json({ err: err }, 500);
	          } else{
	              res.send('success');              
	          }
	      });
	},*/





	findReggeodomdoc:function(req,res){
		console.log('Reggeodomdoc :: id :: ' + req.params.id);
	    var sql = "select geography_id,domain_id,document_id from regulation_document_link where  regulation_id=?";
	    regulation_document_link.query(sql,[req.params.id],function(err, reg) {
	      if(err) {
	        console.log(err);
	      } else {
	      		console.log("res.json(reg):::"+ JSON.stringify(reg));
	           res.json(reg);

	      }
	  });


	},

    findnew: function(req, res){
    	console.log("reg");
	    var sql = "SELECT * FROM regulation where status = true";
	    Regulation.query(sql, function(err, reg) {
            if(err) {
              console.log(err);
                //return res.json({ err: err }, 500);
            } else {
                console.log("Master Regulation");
                console.log(reg);
                res.json(reg);
            }
        });

    },
 
    //for populating in advance search view client 
    findsearch:function(req,res){
      var userConfig = req.session.userConfig;
      var regulationData = {};
      var geoList = {};
      async.series([
        //find geo from geogeography master table
        function(callback) {
            var params = [];
            var sql = "SELECT distinct id, name FROM geography where status=true";
  if (!userConfig.full) {
               sql = "SELECT distinct g.id, g.name FROM subscription s, subscription_detail sd, geography g " + 
                   " WHERE s.id=sd.subscription_id AND s.user_id=? and sd.geography_id = g.id AND g.status=1";
                      
             params = [req.session.user.id];
             }   
            console.log('query no 1', sql);
            User.query(sql, params, function(err, result) {  
              console.log("gios "+result);
                if (err) {
                  Logger.log('error', 'RegulationController.findsearch', 'STEP-0: The following error occurred:', null, err);
                  callback(err);
                } else {           
                 regulationData.geoCollection = result;                                  
                  geoList = result;                  
                  callback();
                }            
            });             
          },        
        //find country
        function(callback) {
             var params = [];      
         var sql ="SELECT distinct c.id as cntid,c.name as name,g.id as gid, g.name as gname, c.geo_id"+
         " FROM country c,geography g where g.status=true and g.id = c.geo_id and c.status=1 ";
//          if (!userConfig.full) {
//             params = [req.session.user.id];
//            sql = "SELECT distinct c.id as cntid,c.name as name,g.id as gid "+
//                   " FROM subscription s, subscription_detail sd, geography g, country c " +
 //                " WHERE s.id=sd.subscription_id AND s.user_id=? and sd.geography_id = g.id and sd.country_id=c.id and g.status=true";

         // }    


        Country.query(sql, params, function(err, result) {
          console.log("gios -1 "+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'RegulationController.findsearch', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.countryCollection = result;
                    callback();
                  } else {
                    regulationData.countryCollection = [];
                    callback();
                  }
          }
        });               

        },
        //find states
        function(callback) {
           var params = [];
         var sql;
          if ( regulationData.countryCollection.length > 0 ) {
          sql ="SELECT distinct s.id as sid,s.name as name, s.country_id as cntid,s.geography_id as gid FROM country c,state s"+
         " where s.status = true and c.status=true and c.id = s.country_id";
         } else {
            sql =" SELECT distinct  s.id as sid,s.name as name,  g.id as gid "+
                 " FROM geography g, state s"+
                   " where s.status = true and g.status=true and s.geography_id = g.id " ;
        }


 //         if (!userConfig.full) {
//             params = [req.session.user.id];
//            sql = "SELECT distinct st.id as sid,st.name as name, sd.country_id as cntid, sd.geography_id as gid  "+
 //                  " FROM subscription s, subscription_detail sd, country c ,state st" +
  //               " WHERE s.id=sd.subscription_id AND s.user_id=? and  "+
   //              " sd.country_id = c.id and sd.state_id = st.id and st.status = true";


    //      }
        console.log("Query 2", sql);
        State.query(sql, params, function(err, result) {
          console.log("gios --2"+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'RegulationController.findsearch', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.stateCollection = result;
                    callback();
                  } else {
                    regulationData.stateCollection = [];
                    callback();
                  }
          }
        });               
      },
       //find domain 
        function(callback) {
        var params = [];
            var sql = "SELECT distinct d.id as did ,d.name as dname, d.description,"+
            " gd.geography_id as gid, gd.country_id as cntid, gd.state_id as sid, gd.domain_id as did"+
          " FROM domain d, geography_domain_link gd  "+
          " where d.status = true "+
          " and  d.id = gd.domain_id";
    //      if (!userConfig.full) {
//            sql = "SELECT distinct d.id as did ,d.name as dname, d.description, "+
 //            " sd.geography_id as gid, sd.country_id as cntid, sd.state_id as sid "+
  //        " FROM domain d, subscription s, subscription_detail sd, user u "+
   //       " WHERE u.id=s.user_id and s.id=sd.subscription_id and d.id = sd.domain_id and  u.id=?";
    //      params = [req.session.user.id];
    //      } 
        console.log("Query 3", sql);
        State.query(sql, params, function(err, result) {
          console.log("gios --2"+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'RegulationController.findsearch', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    console.log("For checking the domain collection", result);
                    regulationData.domainCollection = result;
                    callback();
                  } else {
                    regulationData.domainCollection = [];
                    callback();
                  }
          }
        });               
                 
        
        },
        //find regulator 
        function(callback) {
        /*var sql = "select distinct r.name as rname,r.id as rid,d.id as did "+
        "from domain d, state s, country c, geography g, regulation_document_link rdl,regulator r"+
        " where rdl.domain_id = d.id and d.status=true and rdl.state_id = s.id and rdl.country_id = c.id and rdl.state_id = s.id and rdl.geography_id = g.id and r.id = rdl.regulator_id";*/
         var params=[];
         var sql = " select distinct rdl.regulator_id as rid, rdl.geography_id as gid, rdl.country_id as cntid, rdl.state_id as sid, "+
                " rdl.domain_id as did, r.name as rname"+
                  " from regulation_document_link rdl, regulator r "+
                  " where r.id = rdl.regulator_id and r.status = true";

//            if (!userConfig.full)
//            {

//              sql = "select distinct rdl.regulator_id as rid, rdl.geography_id as gid, rdl.country_id as cntid, rdl.state_id as sid, "+
//                    " rdl.domain_id as did, r.name as rname "+
                  " from regulation_document_link rdl, regulator r, user u, subscription_detail sd, subscription s "+
//                  " where r.id = rdl.regulator_id and r.status = true "+
//                  " and u.id = s.user_id and  s.id = sd.subscription_id "+
//                  " and sd.regulation_id = rdl.regulation_id and u.id = ?";

//               params = [req.session.user.id];
//            }


         console.log("query 4", sql); 
        State.query(sql, params, function(err, result) {
          console.log("gios --2"+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'RegulationController.findsearch', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.regulatorCollection = result;
                    callback();
                  } else {
                    regulationData.regulatorCollection = [];
                    callback();
                  }
          }
        });               
                 
        
        },
        //find regulation 
        function(callback) {
        var params = [];      
      /*  var sql = "select distinct reg.name as regname,reg.id as regid,r.id as rid "+
        "from domain d, state s, country c, geography g, regulation_document_link rdl,regulator r,regulation reg"+
        " where rdl.domain_id = d.id and d.status=true and rdl.state_id = s.id and rdl.country_id = c.id and rdl.state_id = s.id and rdl.geography_id = g.id and r.id = rdl.regulator_id and reg.id = rdl.regulation_id";*/
  var sql = "SELECT DISTINCT r.id as rlid, r.name as regname, rdl.geography_id as gid, rdl.country_id as cntid, "+
            " rdl.state_id as sid, rdl.domain_id  as did, rdl.regulator_id as rid  "+
            " FROM regulation_document_link rdl,regulation r "+
            " WHERE r.id = rdl.regulation_id and r.status = true; ";
          
         if (userConfig.full) {
        
        State.query(sql, params, function(err, result) {
          console.log("gios --2"+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'RegulationController.findsearch', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData.regulationCollection = result;
                    callback();
                  } else {
                    regulationData.regulationCollection = [];
                    callback();
                  }
          }
        });
        } else { //restricted 
        
       // },
        //find domain & regulator & Regulations
       // function(callback) {
        var sql = "SELECT distinct rdl.geography_id as gid, rdl.domain_id as  did,rdl.country_id as cntid, r.id as rlid,"+
        " rdl.state_id as sid, r.name as regname,regtor.id as rid "+ 
        "  FROM regulation r, regulator regtor, regulation_document_link rdl, domain d"+
        " WHERE r.status=true and regtor.status=true and d.status=true and r.id=rdl.regulation_id and rdl.regulator_id = regtor.id and rdl.domain_id = d.id";

         console.log("query 5", sql); 
          
            var params = [];
          Regulation.query(sql, params, function(err, result) {
                  if (err) {
                    Logger.log('error', 'RegulationController.findsearch', 'The following error occurred:', null, err);
                    callback(err);               
                  } else {          
                    if (result.length > 0) {
                   
                     var params = [];      
                Regulation.query(sql, params, function(err, regs) {
                    console.log("gios 3"+JSON.stringify(regs));
                        if (err) {
                          Logger.log('error', 'RegulationController.findsearch', 'The following error occurred:', null, err);
                          callback(err);               
                        } else {          
                          if (regs.length > 0) {
                            regulationData.regulationCollection = regs;
                            callback();
                          } else {
                            regulationData.regulationCollection = [];
                            callback();
                          }
                  }
                });                                         
                    } else {
                      regulationData.regCollection = [];
                      callback();
                    }
            }
          });             
                
        
       // }
        /*function(callback) {
        	var sql = "SELECT g.id as gid,g.name  as gname, c.id as cid, c.name  as cname, s.id as sid, s.name  as sname, d.id as did, d.name  as dname, r.id as rid,r.name  as rname,"+
        	" reg.id as regid, reg.name  as regname, doc.id as docid, doc.name  as docname, subd.id as subdid, subd.name  as subdname " + 
        	" FROM geography g, country c, state s,domain d,regulator r,regulation reg,document doc, subtype_document subd,regulation_document_link rdl"+
        	" WHERE rdl.geography_id = g.id and rdl.country_id = c.id and rdl.state_id = s.id and rdl.domain_id = d.id and rdl.regulator_id = r.id and rdl.regulation_id = reg.id and" +
        	" rdl.document_id = doc.id and rdl.sub_document_id = subd.id ";
        	var  params= [];

        regulation_document_link.query(sql, params, function(err, result) {
          console.log("gios -1 "+JSON.stringify(result));
                if (err) {
                  Logger.log('error', 'RegulationController.findsearch', 'The following error occurred:', null, err);
                  callback(err);               
                } else {          
                  if (result.length > 0) {
                    regulationData= result;
                    callback();
                  } else {
                    regulationData = [];
                    callback();
                  }
          }
        });               

        }*/ 

     }
  }

       
      ], function(err) {
            if (err) {              
                return res.json(500, { errCode: 500 , errMsg: 'Error occurred while fetching regulation while uploading file.Please contact Administrator.' });
            } else {               
                Logger.log('debug', 'RegulationController.findsearch', 'RegulationData Sent.', regulationData, null);
                return res.json(200, regulationData);
            }
      });
},
   //by vinitha for alert
    getAllforAlert: function(req, res) {
    	 var sql = "SELECT id,name,description FROM regulation where status = true";
      Regulation.query(sql, function(err, regulation) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master regulation");
                console.log(regulation);
                res.json(regulation);
            }
        });
 
    },
    
regulationStatus:function(req,res){

	// var sql =   " SELECT count(*) as count,g.id,g.name as gname,r.regulation_status as regulationStatus " +
	// 			" from geography g,regulation r,"+
	// 			" (select distinct r.id as rid,g.id as gid from regulation r,geography g,geography_regulation_link grl where r.id =grl.regulation_id and g.id=grl.geography_id ) as v " +
	// 			" where v.gid=g.id and v.rid=r.id and g.status =1 and r.status=1 group by g.id,r.regulation_status ";
     	var sql =   "select  distinct g.id,g.name as gname,r.regulation_status as regulationStatus, count(*) as count"+
					" from regulation r,geography g,geography_regulation_link grl "+	
					" where grl.geography_id=g.id and grl.regulation_id=r.id and g.status =1 and r.status=1 group by g.id,r.regulation_status";

	Regulation.query(sql, function(err, regulation) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Execute Regulation Status");
                console.log(regulation);
                res.contentType('application/json');
                res.json(regulation);
            }
        });
 
},

updateRegulationStatus: function(req, res) {
	console.log("updateRegulationStatus");
	var regFormData = (req.body) ? req.body : undefined;
		console.log(regFormData);

	var sql = "UPDATE regulation_document_link set regulationStatus=? where regulation_id=? and geography_id=? and domain_id=? and document_id=? and country_id=? and state_id=? and regulator_id=? and sub_document_id=?";
	 Regulation.query(sql,[regFormData.regulationStatus, regFormData.regulation_id,regFormData.geography_id,regFormData.domain_id,regFormData.document_id,regFormData.country_id,regFormData.state_id,regFormData.regulator_id,regFormData.sub_document_id],function (err ,regulation) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Execute Regulation Status");
                console.log(regulation);
                res.contentType('application/json');
                res.json(regulation);
            }
        });
},

updateRegStatus: function(req, res){
	console.log("updateRegulationStatus");
	var regFormData = (req.body) ? req.body : undefined;
    console.log(regFormData);

	var sql = "UPDATE regulation set regulation_status=? where id=? ";
	 Regulation.query(sql,[regFormData.regulationStatus, regFormData.regulation_id],function (err ,regulation) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Execute Regulation Status");
                console.log(regulation);
                res.contentType('application/json');
                res.json(regulation);
            }
        });
}


}
