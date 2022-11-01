const { ApolloError } = require("apollo-server");

const { User } = require("../../models");

const signup = async (_, { input }) => {
  try {
    console.log(input);
    const user = await User.create(input);

    return { success: true, user };
  } catch (error) {
    console.log(`[ERROR]: Failed to sign up | ${error.message}`);
    throw new ApolloError("Failed to sign up");
  }
};

module.exports = signup;
