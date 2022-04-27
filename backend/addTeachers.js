const User = require("./models/user")

const teachers = {
	"be18103032 Gaganpreet Singh Khurana": "gaganpreetsinghkhurana.be18cse@pec.edu.in",
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
				"evaluator": true,
			})
			teacherDocument = await teacherDocument.save();
			newTeachers.push([teacherName, teacherEmail.toLowerCase()])
		}
	}
	console.log("New Teachers", newTeachers);
	let allUsers = await User.find();
	for(let userIndex = 0; userIndex < allUsers.length; userIndex++){
		if(allUsers[userIndex].name in teachers){
			allUsers[userIndex].evaluator = true;
		} else{
			allUsers[userIndex].evaluator = false;
		}
		
		await allUsers[userIndex].save();
		
	}
	console.log("Evaluators: ", await User.find({
		evaluator: true
	}))
}