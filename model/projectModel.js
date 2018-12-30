const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      default : ''
    },
    lastName: {
      type: String,
      default : ''
    },
    age: {
      type: Number,
      default : ''
    },
    imageURL: {
      type: String,
      default : 'http://localhost:3000/img/find_user.png'
    },
  },
  { timestamps: true }
);

const formsSchema = new Schema(
  {
    name: {
      type: String,
      default : ''
    },
    shape: {
      type: String,
      default : ''
    }
  },
  { timestamps: true }
);

const projectSchema = new Schema(
  {
    project: {
      type: String,
      required: true
    },
    formsubmitted: {
      type: Number,
      default:0
    },
    totalUser: {
      type: Number,
      default:0
    },
    description: {
      type: String,
      required: true
    },
    profile: [profileSchema],
    forms: [formsSchema],
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
