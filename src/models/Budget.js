const { model, Schema } = require("mongoose");

const budgetSchema = {
  name: {
    type: String,
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
