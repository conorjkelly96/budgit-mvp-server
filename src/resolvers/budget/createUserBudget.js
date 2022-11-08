const { ApolloError, AuthenticationError } = require("apollo-server");

const { Budget } = require("../../models");

const { notAuthorized } = require("../../utils/errorMessage");

const createUserBudget = async (_, { input }, { user }) => {
  try {
    if (user) {
      const user = user.id;
      console.log(user);

      const newBudget = await Budget.create({ ...input, user });

      console.log(newBudget);
      const budget = newBudget.populate("user");
      console.log(budget);

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
