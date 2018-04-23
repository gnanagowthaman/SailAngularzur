const util = require('util');

module.exports = {
	log: function(level, sourceMethod, msgtxt, data, err) {
		var logTime = (new Date()).toISOString();
		var errMsg = '%s - [%s] - %s ';
		sails.log.debug('logging level: ' + level);
		switch (level) {
			case 'error':
				errMsg = util.format(errMsg, logTime, sourceMethod, msgtxt);
				sails.log.debug(errMsg);
				sails.log.error(err);
				break;
			case 'debug':
				sails.log.debug(errMsg, logTime, sourceMethod, msgtxt);
				if (data) {
					sails.log.debug(data);	
				}			
				break;
			default:					
				sails.log(errMsg, logTime, sourceMethod, msgtxt);
				if (data) {
					sails.log(data);
				}
				break;
		}
	}
}