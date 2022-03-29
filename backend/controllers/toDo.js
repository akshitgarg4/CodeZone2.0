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
	let task = await toDo.findById(sanitizer.escape(req.params.task_id));
	if(task){
		if(task.mentor._id === req.user.id){
			await toDo.findByIdAndDelete(sanitizer.escape(req.params.task_id)).exec();
			return res.status(200).json({
				message: "Task deleted successfully!",
				success: true
			})
		} else{
			return res.status(403).json({
				message: "User did not create this task!",
				success: false
			})
		}
	} else{
		return res.status(404).json({
			message: "Task not found!",
			success: false
		})
	}
}
module.exports.complete = async function(req, res){

}