const toDo = require("../models/toDo");
const sanitizer = require('sanitizer');

module.exports.add = async function(req, res){
	let newTask = await toDo.create({
		mentor: req.user.id,
		task: req.body.task,
		
	})
	if(newTask){
		newTask = await newTask.save();
		return res.status(201).json({
			message: "Task created successfully!",
			data: newTask,
			success: true
		})
	} else{
		return res.status(400).json({
			message: "Task not created!",
			success: false
		})
	}
}
module.exports.delete = async function(req, res){

}
module.exports.complete = async function(req, res){

}