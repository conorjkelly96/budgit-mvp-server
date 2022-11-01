const { User } = require("../../models");

const getAllUsers = async () => {
  const users = await User.find({});

  return users;
};

module.exports = getAllUsers;
