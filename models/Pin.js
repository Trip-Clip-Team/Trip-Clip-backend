const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
	{
		createdBy: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
			min: 3,
		},

		description: [{
			username: {
				type: String,
				require: true,
			},
			body: {
				type: String,
				require: true,
			},

			rating: {
				type: Number,
				require: true,
				min: 0,
				max: 5,
			},
		}
		],
		lat: {
			type: Number,
			require: true,
		},
		long: {
			type: Number,
			require: true,
		},
	},
	{ timestamps: true }
);
// to update the user
module.exports = mongoose.model("Pin", PinSchema);
