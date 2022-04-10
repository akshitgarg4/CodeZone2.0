const express = require("express");
const port = 8000;
const {createUsers} = require("./addTeachers");

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use("/", require("./routes"));

app.listen(port, function(err){
	if(err){
		console.log("Error in running server");
	} else{
		console.log("Server running successfully");
	}
});

createUsers();
// sendMail(['gaganpreetsinghkhurana.be18cse@pec.edu.in'],"Testing CodeZone 2.0 mails","Congrats, mail feature is working");