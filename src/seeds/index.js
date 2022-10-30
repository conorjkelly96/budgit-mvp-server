require("dotenv").config();
const mongoose = require("mongoose");

const { User, Budget } = require("../models");

const userData = require("./data/userData.json");
const budgetPosts = require("./data/budgetData.json");

const seed = async () => {};

seed();
