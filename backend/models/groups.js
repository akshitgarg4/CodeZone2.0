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

groupsSchema.pre('save', function(next){
	let currentGroup = this;
	for(let index = 0; index < 5; index++){
		currentGroup.totalMarks.midSemester[index] = 0;
		
		for(let [evaluator, parameters] of Object.entries(currentGroup.midSemesterMarks)){
			for(let [parameter, marks] of Object.entries(parameters)){
				if(parameter === "remarks"){
					continue;
				}
				currentGroup.totalMarks.midSemester[index] += marks[index];
			}
		}
		currentGroup.totalMarks.endSemester[index] = 0;
		for(let [evaluator, parameters] of Object.entries(currentGroup.endSemesterMarks)){
			for(let [parameter, marks] of Object.entries(parameters)){
				if(parameter === "remarks"){
					continue;
				}
				currentGroup.totalMarks.endSemester[index] += marks[index];
			}
		}
		currentGroup.totalMarks.totalMarks[index] = parseFloat(currentGroup.totalMarks.midSemester[index]) + parseFloat(currentGroup.totalMarks.endSemester[index]);
		
	}
	currentGroup.markModified("totalMarks");
	
	next();
});
const data = mongoose.model("group", groupsSchema);
module.exports = data;
