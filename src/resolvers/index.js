// STUDENT and STAFF AUTH Queries and Mutations
const signupUser = require("./user/signupUser");
const getAllUsers = require("./user/getAllUsers");
const loginUser = require("./user/loginUser");
const createUserBudget = require("./budget/createUserBudget");
const deleteUserBudget = require("./budget/deleteUserBudget");

const resolvers = {
  Query: {
    getAllUsers,
  },

  Mutation: {
    signupUser,
    loginUser,
    createUserBudget,
    deleteUserBudget,
  },
};

module.exports = resolvers;
