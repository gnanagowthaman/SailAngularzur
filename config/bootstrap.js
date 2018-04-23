/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(done) {
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
 
  async.series([

	//Get configurations/properties from config table & set it to global object configGlobalModels
	function(callback) {
	    var sql = "SELECT id, name, value FROM config";
	    var params = [];
	    User.query(sql, params, function(err, result) {  
	      	if(err) {
	        	console.log(err);
	        	callback(err);
	      	} else {
	        	console.log('configGlobalModels!!'); console.log(result);              
	        	sails.config.globalmodels.configGlobalModels = result;
	        	callback();
	      	}            
	    });   
	}, 
	//Get roles from role table & set it to global object roleGlobalModels
	function(callback) {
	    var sql = "SELECT id, type FROM role";
	    var params = [];
	    User.query(sql, params, function(err, result) {  
	      	if(err) {
	        	console.log(err);
	        	callback(err);
	      	} else {
	        	console.log('roleGlobalModels!!'); console.log(result);              
	        	sails.config.globalmodels.roleGlobalModels = result;
	        	callback();
	      	}            
	    });   
	},   	
	//Get permissions from permission table & set it to global object permissionGlobalModels
	function(callback) {
	    var sql = "SELECT id, permission, permission_type, role_id FROM permission";
	    var params = [];
	    User.query(sql, params, function(err, result) {  
	      	if(err) {
	        	console.log(err);
	        	callback(err);
	      	} else {
	        	console.log('permissionGlobalModels!!'); console.log(result);              
	        	sails.config.globalmodels.permissionGlobalModels = result;
	        	callback();
	      	}            
	    });   
	},
	//
	function(callback) {

		sails.config.globalmodels.roleGlobalModels.forEach(function(item) {
			console.log("item.type",item.type);
			if(item.type.toUpperCase() == 'SUPER ADMIN') {
				sails.config.globalmodels.SUPERADMIN = item.id;
				console.log("sails.config.globalmodels.SUPERADMIN",sails.config.globalmodels.SUPERADMIN);

			} else if(item.type.toUpperCase() == 'ADMIN') {
				sails.config.globalmodels.ADMIN = item.id;
				console.log("sails.config.globalmodels.ADMIN",sails.config.globalmodels.ADMIN);

			} else {
				sails.config.globalmodels.CLIENT = item.id;
				console.log("sails.config.globalmodels.CLIENT",sails.config.globalmodels.CLIENT);

			}
		});

		callback();



	} 
	//Get geographies from geography table & set it to global object geographyGlobalModels
	/*function(callback) {
	    var sql = "SELECT id, name, description FROM geography where status=true";
	    var params = [];
	    User.query(sql, params, function(err, result) {  
	      	if(err) {
	        	console.log(err);
	        	callback(err);
	      	} else {
	        	console.log('geographyGlobalModels!!'); console.log(result);              
	        	sails.config.globalmodels.geographyGlobalModels = result;
	        	callback();
	      	}            
	    });   
	},
	//Get domains from domain table & set it to global object domainGlobalModels
	function(callback) {
	    var sql = "SELECT id, name, description FROM domain where status=true";
	    var params = [];
	    User.query(sql, params, function(err, result) {  
	      	if(err) {
	        	console.log(err);
	        	callback(err);
	      	} else {
	        	console.log('domainGlobalModels!!'); console.log(result);              
	        	sails.config.globalmodels.domainGlobalModels = result;
	        	callback();
	      	}            
	    });   
	}*/
  ], done);

};
