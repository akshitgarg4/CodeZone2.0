const nodemailer = require('nodemailer');
const SECRET_MAIL = require("../config/credentials");

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: SECRET_MAIL.EMAIL,
		clientId: SECRET_MAIL.CLIENT_ID,
		clientSecret: SECRET_MAIL.CLIENT_SECRET_KEY,
		refreshToken: SECRET_MAIL.REFRESH_TOKEN,
	}
});
module.exports.sendMail = async function(recipients, subject, message){
	let mailOptions = {
		from: SECRET_MAIL.TO,
		to: recipients,
		subject: subject,
		text: message,
	};
	transporter.sendMail(mailOptions, function(err, data){
		if(err){
			console.log(data);
			console.log("Error " + err);
		} else{
			console.log(data);
			console.log("Email sent successfully");
		}
	});
	
}