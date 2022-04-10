const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema(
	{
		description: {type: String, required: true, default: ''},
		title: {type: String, required: true},
		coordinator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		data: []
	},
	{timestamps: true}
);


const data = mongoose.model("data", dataSchema);


module.exports = data;
