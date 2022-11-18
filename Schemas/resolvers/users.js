const { AuthenticationError, UserInputError } = require("apollo-server-express");
const Pin = require("../../models/Pin");
const checkAuth = require("../../utils/checkAuth");

const users = {
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
                else throw new Error("Pin not found");
            } catch (error) {
                throw new Error(error);
            }
        },
    },

    Mutation: {
        async createPin(
            _,
            { title, desc: { body, rating }, lat, long },
            data
        ) {
            const user = checkAuth(data);
            const username = user.username;
            if (title === "") {
                throw new UserInputError("Can not be empty");
            }
            if (body.trim() === "") {
                throw new UserInputError("Can not be empty");
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

        async deletePin(_, { pinId }, data) {
            const user = checkAuth(data);
            const username = user.username;
            const pin = await Pin.findById(pinId);
            if (!pin) {
                throw new UserInputError("No pin with this id");
            }
            try {
                if (pin.createdBy === username) {
                    await pin.delete();
                    const pins = await Pin.find();
                    return pins;
                } else
                    throw new AuthenticationError(
                        "You are not able to delete this pin"
                    );
            } catch (error) {
                throw new UserInputError(error);
            }
        },
        async createDescription(
            _,
            { pinId, desc: { body, rating} },
            data
        ) {
            const pin = await Pin.findById(pinId);
            if (!pin) throw new Error("Pin does not exist");

            const user = checkAuth(data);
            if (!user)
                throw new AuthenticationError(
                    "You are not able to add details to the pin"
                );

            if (body === "") throw new Error("Can not be empty");

            if (rating === null) throw new Error("Can not be Null");

            if (publishedAt === "") throw new Error("Can not be Null");

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
                throw new Error("Can not add description");
            }
        },
    },

};

module.exports = users ;