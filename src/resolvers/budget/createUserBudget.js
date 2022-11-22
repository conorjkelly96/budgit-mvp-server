const { ApolloError, AuthenticationError } = require("apollo-server");

const { Budget } = require("../../models");

const { notAuthorized } = require("../../utils/errorMessage");

const createUserBudget = async (_, { input }, { user }) => {
  try {
    if (user) {
      const userId = user.id;

      const newBudget = await Budget.create({ ...input, user: userId });

      const budget = await newBudget.populate("user");

      return budget;
    } else {
      console.log(`[ERROR - ELSE]: Failed to create Budget | ${notAuthorized}`);
      throw new AuthenticationError(notAuthorized);
    }
  } catch (error) {
    console.log(`[ERROR - CATCH]: Failed to create Budget | ${error.message}`);
    throw new ApolloError("Failed to create Budget");
  }
};

module.exports = createUserBudget;
