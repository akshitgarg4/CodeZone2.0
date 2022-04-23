const data = require("../models/data");
const groups = require("../models/groups");
const sanitizer = require("sanitizer");
const User = require("../models/user");
const {sendMail} = require("./email");

module.exports.save = async function(req, res){
	let newData = await data.create({
		title: req.body.fileName,
		description: req.body.fileDescription,
		data: [],
		coordinator: req.user._id,
	});
	let DataFromExcel = req.body.data;
	for(let index = 0; index < DataFromExcel.length; index++){
		
		let newGroup = await groups.create({
			GroupNumber: DataFromExcel[index]["S.No."],
			students: [
				DataFromExcel[index]["Student A"],
				DataFromExcel[index]["Student B"],
				DataFromExcel[index]["Student C"],
				DataFromExcel[index]["Student D"],
				DataFromExcel[index]["Student E"]
			],
			SID: [
				DataFromExcel[index]["SID A"],
				DataFromExcel[index]["SID B"],
				DataFromExcel[index]["SID C"],
				DataFromExcel[index]["SID D"],
				DataFromExcel[index]["SID E"],
			],
			mentor: await User.findOne({name: DataFromExcel[index]["Faculty Mentor"]}),
			
			midSemesterMarks: {
				mentor: {
					presentation: [0, 0, 0, 0, 0],
					viva: [0, 0, 0, 0, 0],
					implementation: [0, 0, 0, 0, 0],
					interaction: [0, 0, 0, 0, 0],
					remarks: ["", "", "", "", ""],
				}
			},
			endSemesterMarks: {
				mentor: {
					presentation: [0, 0, 0, 0, 0],
					viva: [0, 0, 0, 0, 0],
					implementation: [0, 0, 0, 0, 0],
					interaction: [0, 0, 0, 0, 0],
					remarks: ["", "", "", "", ""],
				}
			},
			totalMarks: {
				midSemester: [0, 0, 0, 0, 0],
				endSemester: [0, 0, 0, 0, 0],
				totalMarks: [0, 0, 0, 0, 0],
			},
		})
		
		newGroup = await newGroup.save();
		
		newData.data.push(newGroup);
	}
	newData = await newData.save();
	if(newData){
		return res.status(201).json({
			data: await data.findById(newData._id)
				.populate(
					"coordinator evaluators data",
					"name GroupNumber students SID mentor mentor_name"),
			success: true,
			message: "Upload Successful",
		});
	} else{
		return res.status(400).json({
			data: null,
			success: false,
			message: "Upload Unsuccessful",
		});
	}
}

module.exports.fetch = async function(req, res){
	let previousData = [];
	let allData = await data.find({coordinator: req.user._id})
		.populate(
			"coordinator evaluators data",
			"name GroupNumber students SID mentor mentor_name")
	;
	for(let index = 0; index < allData.length; index++){
		let currentData = {
			number: allData[index]._id,
			fileName: allData[index].title,
			description: allData[index].description,
			dateUploaded: allData[index].updatedAt,
			timeUploaded: allData[index].updatedAt,
			data: allData[index].data,
		};
		
		previousData.push(currentData);
	}
	return res.status(200).json({
		data: previousData,
		success: true,
		message: "Data fetch Successful",
	});
};


module.exports.delete = async function(req, res){
	let record = await data.findById(sanitizer.escape(req.params.record_id));
	if( !record){
		return res.status(404).json({
			data: null,
			success: false,
			message: "Record not found",
		});
	}
	
	
	if(record.coordinator.toString() !== req.user._id){
		return res.status(403).json({
			data: null,
			success: false,
			message: "Not allowed",
		});
	}
	for(let index = 0; index < record.data.length; index++){
		let groupID = record.data[index];
		await groups.findByIdAndDelete(groupID);
	}
	await data.findByIdAndDelete(record._id);
	record = await data.findById(sanitizer.escape(req.params.record_id));
	if(record){
		return res.status(500).json({
			data: null,
			success: false,
			message: "Failed",
		});
	}
	return res.status(200).json({
		data: null,
		success: true,
		message: "Record Deleted",
	});
};


module.exports.sendLinkMentors = async function(req, res){
	let record = await data.findById(sanitizer.escape(req.params.record_id));
	if( !record){
		return res.status(404).json({
			data: null,
			success: false,
			message: "Record not found",
		});
	}
	if(record.coordinator.toString() !== req.user._id){
		return res.status(403).json({
			data: null,
			success: false,
			message: "Not allowed",
		});
	}
	let mentors = {};
	for(let index = 0; index < record.data.length; index++){
		let groupID = record.data[index];
		let group = await groups.findById(groupID);
		let user = await User.findById(group.mentor);
		mentors[user.email] = user._id;
	}
	console.log("Mail Sent To:")
	let results = [];
	let subject = "Major Project Evaluation - Evaluator";
	let text = "Link for entering marks:\n" + "http://localhost:3000/" + record._id + "/mentor/";
	for(const [teacherEmail, teacherID] of Object.entries(mentors)){
		results.push(await sendMail(teacherEmail, subject, text + teacherID + "\nCoordinator\n"));
		console.log(teacherEmail);
	}
	console.log("All Mails Sent")
	return res.status(200).json({
		data: results,
		success: true,
		message: "Mails sent",
	});
};

module.exports.addEvaluators = async function(req, res){
	let record = await data.findById(sanitizer.escape(req.params.record_id));
	if( !record){
		return res.status(404).json({
			data: null,
			success: false,
			message: "Record not found",
		});
	}
	if(record.coordinator.toString() !== req.user._id){
		return res.status(403).json({
			data: null,
			success: false,
			message: "Not allowed",
		});
	}
	for(let index = 0; index < req.body.evaluators.length; index++){
		let evaluator = await User.findOne({name: req.body.evaluators[index]});
		if(record.evaluators.includes(evaluator._id)){
			continue;
		}
		record.evaluators.push(evaluator);
		for(let group = 0; group < record.data.length; group++){
			// console.log(evaluator._id,"EE");
			let currentGroup = await groups.findById(record.data[group]);
			currentGroup.midSemesterMarks[evaluator._id.toString()] = {
				presentation: [0, 0, 0, 0, 0],
				viva: [0, 0, 0, 0, 0],
				implementation: [0, 0, 0, 0, 0]
			}
			currentGroup.endSemesterMarks[evaluator._id] = {
				presentation: [0, 0, 0, 0, 0],
				viva: [0, 0, 0, 0, 0],
				implementation: [0, 0, 0, 0, 0],
				report: [0, 0, 0, 0, 0],
			}
			await currentGroup.markModified('endSemesterMarks');
			await currentGroup.markModified('midSemesterMarks');
			currentGroup = await currentGroup.save();
			
		}
	}
	record = await record.save();
	if( !record){
		return res.status(500).json({
			data: record,
			success: false,
			message: "Failed",
		});
	}
	return res.status(201).json({
		data: record,
		success: true,
		message: "Evaluators added",
	});
};

module.exports.fetchEvaluatorsList = async function(req, res){
	let users = await User.find();
	let evaluatorList = []
	for(let index = 0; index < users.length; index++){
		evaluatorList.push(users[index].name);
	}
	return res.status(201).json({
		data: evaluatorList,
		success: true,
		message: "Evaluator List",
	});
};


module.exports.sendLinkEvaluators = async function(req, res){
	let record = await data.findById(sanitizer.escape(req.params.record_id));
	if( !record){
		return res.status(404).json({
			data: null,
			success: false,
			message: "Record not found",
		});
	}
	if(record.coordinator.toString() !== req.user._id){
		return res.status(403).json({
			data: null,
			success: false,
			message: "Not allowed",
		});
	}
	let finalEvaluators = req.body.finalEvaluators;
	let recipients = {};
	for(let index = 0; index < finalEvaluators.length; index++){
		
		let user = await User.findOne({name: finalEvaluators[index]});
		if(user){
			recipients[user.email] = user._id;
		}
	}
	
	console.log("Mail Sent To:")
	let results = [];
	let subject = "Major Project Evaluation";
	let text = "Link for entering marks:\n" + "http://localhost:3000/" + record._id + "/evaluator/";
	for(const [teacherEmail, teacherID] of Object.entries(recipients)){
		results.push(await sendMail(teacherEmail, subject, text + teacherID + "\nCoordinator\n"));
		console.log(teacherEmail);
	}
	console.log("All Mails Sent")
	return res.status(200).json({
		data: results,
		success: true,
		message: "Mails sent",
	});
};


module.exports.fetchStudentMarks = async function(req, res){
	let record = await data.findById(sanitizer.escape(req.params.record_id));
	if( !record){
		return res.status(404).json({
			data: null,
			success: false,
			message: "Record not found",
		});
	}
	if(record.coordinator.toString() !== req.user._id){
		return res.status(403).json({
			data: null,
			success: false,
			message: "Not allowed",
		});
	}
	let groupsInData = record.data;
	let studentMarks = [];
	for(let index = 0; index < groupsInData.length; index++){
		let group = await groups.findById(groupsInData[index]);
		for(let studentNumber = 0; studentNumber < 5; studentNumber++){
			let currentStudent = {
				groupID: group._id,
				studentID: studentNumber,
				GroupNumber: group.groupNumber,
				mentor: group.mentor_name,
				name: group.students[studentNumber],
				sid: group.SID[studentNumber],
				grade: group.grade[studentNumber],
				groupRemarks: group.groupRemarks,
				midSemesterMarks: {},
				endSemesterMarks: {},
				totalMarks: {
					endSemester: group.totalMarks.endSemester[studentNumber],
					midSemester: group.totalMarks.midSemester[studentNumber],
					totalMarks: group.totalMarks.totalMarks[studentNumber],
					
				},
			}
			for(let [faculty, marks] of Object.entries(group.midSemesterMarks)){
				if(faculty === "mentor"){
					currentStudent.midSemesterMarks["mentor"] = {
						presentation: marks.presentation[studentNumber],
						viva: marks.viva[studentNumber],
						implementation: marks.implementation[studentNumber],
						interaction: marks.interaction[studentNumber],
						remarks: marks.remarks[studentNumber]
					};
				} else{
					let evaluator = await User.findById(faculty);
					
					currentStudent.midSemesterMarks[evaluator.name] = {
						evaluatorID: evaluator._id,
						presentation: marks.presentation[studentNumber],
						viva: marks.viva[studentNumber],
						implementation: marks.implementation[studentNumber]
					};
				}
			}
			for(let [faculty, marks] of Object.entries(group.endSemesterMarks)){
				if(faculty === "mentor"){
					currentStudent.endSemesterMarks["mentor"] = {
						presentation: marks.presentation[studentNumber],
						viva: marks.viva[studentNumber],
						implementation: marks.implementation[studentNumber],
						interaction: marks.interaction[studentNumber],
						remarks: marks.remarks[studentNumber]
					};
				} else{
					let evaluator = await User.findById(faculty);
					currentStudent.endSemesterMarks[evaluator.name] = {
						evaluatorID: evaluator._id,
						presentation: marks.presentation[studentNumber],
						viva: marks.viva[studentNumber],
						implementation: marks.implementation[studentNumber],
						report: marks.report[studentNumber]
					};
				}
			}
			studentMarks.push(currentStudent);
		}
	}
	
	return res.status(200).json({
		data: studentMarks,
		success: true,
		message: "MArks Fetched",
	});
}

module.exports.fetchStudentMarksMentor = async function(req, res){
	let record = await data.findById(sanitizer.escape(req.params.record_id));
	if( !record){
		return res.status(404).json({
			data: null,
			success: false,
			message: "Record not found",
		});
	}
	let groupsInData = record.data;
	let studentMarks = [];
	for(let index = 0; index < groupsInData.length; index++){
		let group = await groups.findById(groupsInData[index]);
		if(group.mentor_name !== req.user.name){
			continue;
		}
		let currentGroup = {
			groupID: group._id,
			GroupNumber: group.groupNumber,
			mentor: group.mentor_name,
			students: [],
			groupRemarks: group.groupRemarks,
		};
		for(let studentNumber = 0; studentNumber < 5; studentNumber++){
			let currentStudent = {
				
				studentID: studentNumber,
				name: group.students[studentNumber],
				sid: group.SID[studentNumber],
				grade: group.grade[studentNumber],
				midSemesterMarks: {},
				endSemesterMarks: {},
				totalMarks: {
					endSemester: group.totalMarks.endSemester[studentNumber],
					midSemester: group.totalMarks.midSemester[studentNumber],
					totalMarks: group.totalMarks.totalMarks[studentNumber],
					
				},
			}
			for(let [faculty, marks] of Object.entries(group.midSemesterMarks)){
				if(faculty === "mentor"){
					currentStudent.midSemesterMarks["mentor"] = {
						presentation: marks.presentation[studentNumber],
						viva: marks.viva[studentNumber],
						implementation: marks.implementation[studentNumber],
						interaction: marks.interaction[studentNumber],
						remarks: marks.remarks[studentNumber]
					};
				}
			}
			for(let [faculty, marks] of Object.entries(group.endSemesterMarks)){
				if(faculty === "mentor"){
					currentStudent.endSemesterMarks["mentor"] = {
						presentation: marks.presentation[studentNumber],
						viva: marks.viva[studentNumber],
						implementation: marks.implementation[studentNumber],
						interaction: marks.interaction[studentNumber],
						remarks: marks.remarks[studentNumber]
					};
				}
			}
			currentGroup.students.push(currentStudent);
		}
		
		studentMarks.push(currentGroup);
	}
	
	return res.status(200).json({
		data: studentMarks,
		success: true,
		message: "MArks Fetched for mentor",
	});
}