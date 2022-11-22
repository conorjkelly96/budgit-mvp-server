const { ApolloError, AuthenticationError } = require("apollo-server-errors");

const { Budget } = require("../../models");

const deleteUserBudget = async (_, { budgetId }, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError("You must be logged in to delete a job.");
    }
    const deletedBudget = await Budget.findByIdAndDelete(budgetId);

    return deletedBudget;
  } catch (error) {
    console.log(`[ERROR]: Failed to delete Budget | ${error.message}`);
    throw new ApolloError("Failed to delete Budget");
  }
};

module.exports = deleteUserBudget;
