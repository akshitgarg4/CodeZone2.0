const User = require("./models/user")

const teachers = {
	"Gaganpreet Khurana": "gaganpreetsinghkhurana.be18cse@pec.edu.in",
	"Shayan Yaseen": "shayanyaseen.be18cse@pec.edu.in",
	"Akshit Garg": "gargakshit.be18cse@pec.edu.in",
}

module.exports.createUsers = async function(){
	let newTeachers = []
	for(const [teacherName, teacherEmail] of Object.entries(teachers)){
		let teacherDocument = await User.findOne({"email": teacherEmail.toLowerCase()});
		if( !teacherDocument){
			teacherDocument = await User.create({
				"name": teacherName,
				"email": teacherEmail.toLowerCase(),
				"picture": "",
			})
			teacherDocument = await teacherDocument.save();
			newTeachers.push([teacherName, teacherEmail.toLowerCase()])
		}
	}
	console.log("New Teachers", newTeachers);
}
