const { AuthenticationError, UserInputError } = require("apollo-server");
const checkAuth = require("../../utils/checkAuth");
const Pin = require("../../models/Pin");


module.exports = {
	Query: {
		async getPins() {
			try {
				const pins = await Pin.find();
				return pins;
			} catch (error) {
				throw new Error(error);
			}
		},

		async getPin(_, { pinId }) {
			try {
				const pin = Pin.findById(pinId);
				if (pin) return pin;
				else throw new Error("Pin does not exist");
			} catch (error) {
				throw new Error(error);
			}
		},
	},

	Mutation: {
		async createPin(
			_,
			{ title, description: { body, rating }, lat, long },
			context
		) {
			const user = checkAuth(context);
			const username = user.username;
			if (title === "") {
				throw new UserInputError("invalid field");
			}
			if (body.trim() === "") {
				throw new UserInputError("invalid field");
			}
			const newPin = new Pin({
				createdBy: username,
				title,
				description: {
					username,
					body,
					rating,
				},
				lat,
				long,
			});
			const pin = await newPin.save();

			return pin;
		},
		async deletePin(_, { pinId }, context) {
			const user = checkAuth(context);
			const username = user.username;
			const pin = await Pin.findById(pinId);
			if (!pin) {
				throw new UserInputError("Pin does not exist");
			}
			try {
				if (pin.createdBy === username) {
					await pin.delete();
					const pins = await Pin.find();
					return pins;
				} else
					throw new AuthenticationError(
						"You can not delete this pin"
					);
			} catch (eror) {
				throw new UserInputError(error);
			}
		},
		async createDescription(
			_,
			{ pinId, description: { body, rating } },
			context
		) {
			const pin = await Pin.findById(pinId);
			if (!pin) throw new Error("Pin not found");

			const user = checkAuth(context);
			if (!user)
				throw new AuthenticationError(
					"You can not change this pin"
				);

			if (body === "") throw new Error("invalid field");

			if (rating === null) throw new Error("invalid field");

			const username = user.username;

			const addedDescription = {
				username,
				body,
				rating,
			};

			pin.description.push(addedDescription);

			try {
				await pin.save();
				const pins = await Pin.find();
				return pins;
			} catch (error) {
				throw new Error("Cannot add description");
			}
		},
	},
};