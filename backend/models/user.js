const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    picture: {type: String},
    evaluator: {type: Boolean, required: true, default: false}
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;