const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    budgets: [Budget]
  }

  type Budget {
    id: ID
    name: String!
    Salary: Float!
    Other: Float!
    Rentmortgage: Float!
    Gym: Float!
    Groceries: Float!
    Housebills: Float!
    Creditcard: Float!
    Phone: Float!
    Subscriptions: Float!
    Holidaycost: Float!
    Savings: Float!
    Enjoymentfund: Float!
  }

  type Query {
    getAllUsers: [User]
  }

  input SignupUserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type SignupUserSuccess {
    success: Boolean!
    user: User
  }

  type UserAuth {
    token: ID!
  }

  type Mutation {
    signupUser(input: SignupUserInput!): SignupUserSuccess!
    loginUser(input: LoginUserInput!): UserAuth!
  }
`;

module.exports = typeDefs;
