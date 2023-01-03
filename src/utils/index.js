require("dotenv").config();
const { format } = require("date-fns");
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

// refer to .env file for secret
const secret = process.env.SECRET;
const expiration = "2h";

// sign token with JSON Web Token
const signToken = ({ firstName, lastName, email, username, id, type }) => {
  const payload = { firstName, lastName, email, username, id, type };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const authMiddleware = ({ req }) => {
  // token can come from request body, query or authorization header, however in this application the token is expected to come from req.headers.authorization
  let token = req.body.token || req.query.token || req.headers.authorization;

  // if token exists
  if (req.headers.authorization) {
    // split string into array of substrings, remove last element from array and remove all whitespaces
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
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
