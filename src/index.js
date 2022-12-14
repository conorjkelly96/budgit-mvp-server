require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { authMiddleware } = require("./utils");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// initialise connection to the database
const init = async () => {
  try {
    // connect to the db in .env file or local host
    await mongoose.connect(
      process.env.MONGODB_URI ||
        `mongodb://localhost:27017/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const { url } = await server.listen({
      port: process.env.PORT || 4000,
    });
    console.log(`Server running on ${url}`);
  } catch (error) {
    console.log(`[ERROR]: Failed to connect to DB | ${error.message}`);
  }
};

init();
