const { model, Schema } = require("mongoose");

const budgetSchema = {
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  other: {
    type: Number,
    required: true,
  },
  rentmortgage: {
    type: Number,
    required: true,
  },
  gym: {
    type: Number,
    required: true,
  },
  groceries: {
    type: Number,
    required: true,
  },
  housebills: {
    type: Number,
    required: true,
  },
  creditcard: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  subscriptions: {
    type: Number,
    required: true,
  },
  holidaycost: {
    type: Number,
    required: true,
  },
  savings: {
    type: Number,
    required: true,
  },
  enjoymentfund: {
    type: Number,
    required: true,
  },
};

const schema = new Schema(budgetSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

const Budget = model("Budget", schema);

module.exports = Budget;
