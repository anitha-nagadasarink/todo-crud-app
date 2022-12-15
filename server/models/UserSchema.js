const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    maxlength: [15, "First Name should be less then 15 characters"],
    // required: [true, "User Name is required"]
  },
  lastname: {
    type: String,
    trim: true,
    maxlength: [15, "LastName should be less then 15 characters"],
    // required: [true, "User Name is required"]
  },
  email: {
    type: String,
    required: [true, "User emial is required"],
    unique: true,
    maxlength: [40, "Email should be less than 40 Characters"]
  },
  password: {
    type: String
  },
  token: {
    type: String
  },
  // todos: {
  //   type: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "TodoDB",
  //     required: [true, "Todo Id is required to store todo for user"]
  //   }],
  // }
});
module.exports = mongoose.model("UserDB", UserSchema);