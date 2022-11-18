const { ApolloServer } = require("apollo-server-express");
// const mongoose = require("mongoose");
const db = require("./config/connection");
const express = require("express");
const { authMiddleware } = require("./utils/checkAuth");
const typeDefs = require("./Schemas/typeDefs");
const resolvers = require("./Schemas/resolvers");

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: authMiddleware,
	});
	await server.start();
	server.applyMiddleware({ app });
};
startServer();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
	app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
