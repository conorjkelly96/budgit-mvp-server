// STUDENT and STAFF AUTH Queries and Mutations
const signupUser = require("./user/signupUser");
const getAllUsers = require("./user/getAllUsers");

const resolvers = {
  Query: {
    getAllUsers,
  },

  Mutation: {
    signupUser,
  },
};

module.exports = resolvers;
