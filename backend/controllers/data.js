const data = require("../models/data");
const sanitizer = require('sanitizer');

module.exports.save = async function(req, res){
	console.log("hueuubufb", req)
	let newData = await data.create({
		title: req.body.fileName,
		description: req.body.fileDescription,
		data: req.body.data,
		supervisor: req.user._id,
	});
	newData = await newData.save();
	console.log(newData);
	if(newData){
		return res.status(201).json({
			data: newData,
			success: true,
			message: "Upload Successful",
		})
	} else{
		return res.status(400).json({
			data: null,
			success: false,
			message: "Upload Unsuccessful",
		})
	}
	
}
module.exports.fetch = async function(req, res){
}
