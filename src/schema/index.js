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
    salary: Float!
    other: Float!
    rentmortgage: Float!
    gym: Float!
    groceries: Float!
    housebills: Float!
    creditcard: Float!
    phone: Float!
    subscriptions: Float!
    holidaycost: Float!
    savings: Float!
    enjoymentfund: Float!
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

  input CreateBudgetInput {
    name: String!
    salary: Float!
    other: Float!
    rentmortgage: Float!
    gym: Float!
    groceries: Float!
    housebills: Float!
    creditcard: Float!
    phone: Float!
    subscriptions: Float!
    holidaycost: Float!
    savings: Float!
    enjoymentfund: Float!
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
