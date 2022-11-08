require("dotenv").config();
const { format } = require("date-fns");
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const expiration = "2h";

const signToken = ({ firstName, lastName, email, username, id, type }) => {
  const payload = { firstName, lastName, email, username, id, type };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    console.log("token");
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    console.log(data);
    req.user = data;
  } catch {
    console.log("invalid token");
    throw new AuthenticationError("Invalid token");
  }

  return req;
};

const formatDate = (date) => {
  const dateObject = new Date(date);
  // Format: Monday March 7th, 2022
  return format(dateObject, "MMMM do, yyyy");
};

const formatDateTime = (date) => {
  const dateObject = new Date(date);
  // March 21st, 2022
  return format(dateObject, "HH:mm MMMM do, yyyy");
};

module.exports = {
  signToken,
  authMiddleware,
  formatDate,
  formatDateTime,
};
