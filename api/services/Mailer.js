
/*    For sending email  */
module.exports = {

sendWelcomeMail :function(user) {
 
  sails.hooks.email.send(
  	"welcomeEmail", 
	{
		Name: user.user_name,
		
	},

	{
		to: user.email_id,
		subject: "Welcome mail", 
		text: "testuuid",	
		html: 'Dear' + ' ' + user.user_name  + '<p> Thanks for your interset in Zurik. </p>' + '<p> Please click the below link to activate your account </p> ' + '<p>' + sails.config.url +'/checkuser?uuid=' +user.session_id + '<p>Have a great day </p>' + '<p> Team Zurik </p>'
		
	},
	function(err) {
	console.log(err || "Mail Sent!");
  });
},

sendalertMail :function(usermail,alertText,path) {
	console.log("sendalertMail",usermail.user_name,usermail.email_id,path);
 
  sails.hooks.email.send(
  	path, 
	{
		Name: usermail.user_name,
		alertText:alertText
	},

	{
		to: usermail.email_id,
		subject: "Welcome mail",
		text: alertText , 
		//text: "testuuid",	
		//html: '<p>Welcome to Zurik , Please click the below the link to activate your account </p> ' + '<p>' + sails.config.url +'/checkuser?uuid=' +user.session_id + '<p>Have a great day </p>'
		
	},
	function(err) {
	console.log(err || "Mail Sent!");
  });
},

}



