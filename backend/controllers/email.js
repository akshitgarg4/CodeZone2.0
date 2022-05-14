const nodemailer = require('nodemailer');
const {SECRET_MAIL} = require("../config/credentials");

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: SECRET_MAIL.EMAIL,
		pass:'bnfchqdpmsectecq',
	}
});
module.exports.sendMail = async function(recipients, subject, message){
	let mailOptions = {
		from: SECRET_MAIL.FROM,
		to: recipients,
		subject: subject,
		text: message,
	};
	let result = {
		recipient: recipients,
		success: false,
		message: message,
	}
	transporter.sendMail(mailOptions, function(err, data){
		if(err){
			console.log(data);
			console.log("Error " + err);
			result.success = false;
			result.message = err;
		} else{
			console.log(data);
			console.log("Email sent successfully");
			result.success = true;
			result.message = "Email sent successfully";
		}
	});
	return result;
	
}