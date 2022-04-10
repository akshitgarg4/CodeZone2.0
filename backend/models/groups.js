const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema(
	{
		student_1: {type: String},
		student_1_SID: {type: Number},
		student_2: {type: String},
		student_2_SID: {type: Number},
		student_3: {type: String},
		student_3_SID: {type: Number},
		student_4: {type: String},
		student_4_SID: {type: Number},
		student_5: {type: String},
		student_5_SID: {type: Number},
		mentor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	},
	{timestamps: true}
);

const data = mongoose.model("group", groupsSchema);
module.exports = data;
