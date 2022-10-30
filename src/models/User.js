const { model, Schema } = require("mongoose");

const bcrypt = require("bcrypt");

const { validateEmail } = require("../utils");

const studentSchema = {
  username: {
    type: String,
    required: true,
    maxLength: 50,
  },
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
  profileImageUrl: {
    type: String,
    default:
      "https://qph.fs.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a",
  },
  email: {
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

  bio: {
    type: String,
    minLength: 1,
    maxLength: 2000,
  },
  interests: [
    {
      type: String,
      enum: [
        "Travelling",
        "Exercise",
        "Movies",
        "Dancing",
        "Cooking",
        "Outdoors",
        "Politics",
        "Pets",
      ],
    },
  ],
  university: {
    type: Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  college: {
    type: String,
    required: true,
  },

  sellerRating: {
    type: Number,
    default: 0,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: false,
    },
  ],

  savedJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: false,
    },
  ],

  savedItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: false,
    },
  ],
};

const schema = new Schema(studentSchema, {
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

const Student = model("Student", schema);

module.exports = Student;
