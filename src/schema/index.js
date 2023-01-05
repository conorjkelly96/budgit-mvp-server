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
    user: User!
    name: String!
    salary: Int!
    other: Int!
    rentmortgage: Int!
    gym: Int!
    groceries: Int!
    housebills: Int!
    creditcard: Int!
    phone: Int!
    subscriptions: Int!
    holidaycost: Int!
    savings: Int!
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
    salary: Int!
    other: Int!
    rentmortgage: Int!
    gym: Int!
    groceries: Int!
    housebills: Int!
    creditcard: Int!
    phone: Int!
    subscriptions: Int!
    holidaycost: Int!
    savings: Int!
  }

  type CreateBudgetSuccess {
    success: Boolean
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
    user: User
  }

  type Mutation {
    signupUser(input: SignupUserInput!): SignupUserSuccess!
    loginUser(input: LoginUserInput!): UserAuth!
    createUserBudget(input: CreateBudgetInput!): Budget!
    deleteUserBudget(budgetId: String!): Budget
  }
`;

module.exports = typeDefs;
