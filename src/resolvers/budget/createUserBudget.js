const { ApolloError, AuthenticationError } = require("apollo-server");

const { Budget } = require("../../models");

const { notAuthorized } = require("../../utils/errorMessage");

const createUserBudget = async (_, { input }, { user }) => {
  try {
    if (user) {
      const user = user.id;
      const newBudget = await Budget.create({ ...input, user });
      const budget = newBudget.populate("user");
      return budget;
    } else {
      console.log(`[ERROR]: Failed to create item | ${notAuthorized}`);
      throw new AuthenticationError(notAuthorized);
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to create Budget | ${error.message}`);
    throw new ApolloError("Failed to create Budget");
  }
};

module.exports = createUserBudget;
