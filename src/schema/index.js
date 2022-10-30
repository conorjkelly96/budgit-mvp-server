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
  
  // # QUERIES
  // type Query {
  // }

  // # MUTATIONS
  // type Mutation {
  // }
`;

module.exports = typeDefs;
