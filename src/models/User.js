const { model, Schema } = require("mongoose");

const bcrypt = require("bcrypt");

const { validateEmail } = require("../utils/index");

const userSchema = {
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    maxLength: 50,
  },

  _email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    // validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  get email() {
    return this._email;
  },
  set email(value) {
    this._email = value;
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
    // match at least 1: uppercase, lowercase, number, and special characters
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Please enter a password with at least 8 characters, including at least 1 number, 1 uppercase, 1 lowercase, and 1 special character.",
    ],
  },
};

const schema = new Schema(userSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

schema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", schema);

module.exports = User;
