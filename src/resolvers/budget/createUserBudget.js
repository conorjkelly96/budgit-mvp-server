const { ApolloError, AuthenticationError } = require("apollo-server");

const { Budget } = require("../../models");

const { notAuthorized } = require("../../utils/errorMessage");

const createUserBudget = async (_, { input }, { user }) => {
  try {
    if (user) {
      const userId = user.id;
      console.log(userId);

      const newBudget = await Budget.create({ ...input, userId });
      console.log(newBudget);

      const budget = newBudget.populate("user");
      console.log(budget);

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
