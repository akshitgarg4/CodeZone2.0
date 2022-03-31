const toDo = require("../models/toDo");
const sanitizer = require('sanitizer');

module.exports.add = async function(req, res){
	let newTask = await toDo.create({
		mentor: req.user.id,
		task: req.body.text,
		
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
		if(task.mentor === req.user.id){
			await toDo.findByIdAndDelete(sanitizer.escape(req.params.task_id)).exec();
			return res.status(200).json({
				message: "Task deleted successfully!",
				data: sanitizer.escape(req.params.task_id),
				success: true
			})
		} else{
			return res.status(403).json({
				message: "User did not create this task!",
				data: task,
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
	let task = await toDo.findById(sanitizer.escape(req.params.task_id));
	if(task){
		if(task.mentor._id === req.user.id){
			task.complete = !task.complete;
			task = await task.save();
			return res.status(200).json({
				message: "Task deleted successfully!",
				data: task,
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

module.exports.getAllTasks = async function(req, res){
	let tasks = toDo.find({mentor: req.user.id})
	return res.status(200).json({
		message: "All Tasks",
		success: true,
		data: tasks
	})
}

module.exports.update = async function(req, res){
	if( !req.body.task || req.body.task === ""){
		return res.status(404).json({
			message: "Invalid/Empty task!",
			success: false
		})
	}
	let task = await toDo.findById(sanitizer.escape(req.params.task_id));
	if(task){
		if(task.mentor._id === req.user.id){
			task.task = req.body.task;
			task = await task.save();
			return res.status(200).json({
				message: "Task deleted successfully!",
				data: task,
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