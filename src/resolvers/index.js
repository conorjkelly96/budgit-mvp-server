// STUDENT and STAFF AUTH Queries and Mutations
const signupUser = require("./user/signupUser");
const getAllUsers = require("./user/getAllUsers");
const loginUser = require("./user/loginUser");

const resolvers = {
  Query: {
    getAllUsers,
  },

  Mutation: {
    signupUser,
    loginUser,
  },
};

module.exports = resolvers;
