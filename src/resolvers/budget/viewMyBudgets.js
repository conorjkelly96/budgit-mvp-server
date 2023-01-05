const { ApolloError, AuthenticationError } = require("apollo-server");

const { Budget } = require("../../models");

const viewMyBudgets = async (_, __, { user }) => {
  try {
    if (!user) {
      throw new AuthenticationError(
        "You must be logged in to view all budgets."
      );
    }

    // logged in user
    const { id } = user;

    const budgets = await Budget.find({
      seller: id,
    }).populate({
      path: "user",
      populate: { path: "username" },
    });

    return budgets;
  } catch (error) {
    console.log(`[ERROR]: Failed to get budgets | ${error.message}`);
    throw new ApolloError("Failed to get budgets.");
  }
};

module.exports = viewMyBudgets;
