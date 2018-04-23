/*Module for Sending email using sails-hook-email

With Guidance of https://medium.com/@raj_adroit/sails-js-email-sending-using-sails-hook-email-and-mailgun-service-f6a8ab0e6d77#.wum42nf64
*/

module.exports.email = {
	 service: "Gmail",
	 auth: {
		 // user: "testjilla@gmail.com",
		 // pass: "testjilla168"
	 },
	 templateDir: "views/emailTemplates",
	// from: "thaalai@vahai.com",
	 testMode: false,
	 //ssl: true
}
