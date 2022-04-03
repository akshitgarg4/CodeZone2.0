const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
	{
		task: {type: String, required: true},
		complete: {type: Boolean, required: true, default: false},
		mentor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	{timestamps: true}
);

const data = mongoose.model("data", dataSchema);
module.exports = data;
