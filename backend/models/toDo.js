const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
	{
		task: {type: String, required: true},
		complete: {type: Boolean, required: true, default: false},
		mentor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	{timestamps: true}
);

const toDo = mongoose.model("toDo", toDoSchema);
module.exports = toDo;
