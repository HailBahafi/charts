const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  end_year: {
    type: String,   
  },

  start_year: {
    type: String,
  },

  intensity: { 
    type: Number,
  },
  impact: {
    type: String,   
  },

  likelihood: {
    type: Number,
  },

  relevance: {
    type: Number,
  },

  country: {
    type: String,
    default: "Unknown",
  },

  city: {
    type: String,
  },

  region: {
    type: String,
    default: "Not Specified",
  },

  sector: {
    type: String,
    default: "Unknown",
  },

  topic: {
    type: String,
    default: "Unknown",
  },

  pestle: {
    type: String,
    default: "Unknown",
  },
  insight: {
    type: String,
    default: "Unknown",
  },
  added: {
    type: String,
    default: "Unknown",
  },
  published: {
    type: String,
    default: "Unknown",
  },
  source: {
    type: String,
    default: "Unknown",
  },
  title: {
    type: String,
    default: "Unknown",
  },
  
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
