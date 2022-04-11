const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema(
	{
		GroupNumber: {type: Number},
		students: ["", "", "", "", ""],
		SID: [0, 0, 0, 0, 0],
		mentor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		mentor_name: {
			type: String,
			default: function(){
				if(this.mentor){
					return this.mentor.name;
				}
				return "";
			}
		},
		midSemesterMarks: {},
		endSemesterMarks: {},
		totalMarks: {},
		grade: ["", "", "", "", ""],
		groupRemarks: {
			type: String, default: ""
		},
		
	},
	{timestamps: true}
);

const data = mongoose.model("group", groupsSchema);
module.exports = data;
