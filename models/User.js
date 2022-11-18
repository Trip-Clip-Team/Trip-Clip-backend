/** @format */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			min: 3,
			max: 50,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			min: 4,
		},
		token: {
			type: String,
		},
	},
	{timestamps: true}
);
// to update the user
module.exports = mongoose.model("User", UserSchema);
