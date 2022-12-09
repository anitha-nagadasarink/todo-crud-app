const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxlength: [30, "Todo  titlemust be less than 30"]
  },
  tasks: {
    type: [{
      type: String,
      required: [true, "Tasks are required"]
    }]
  },
  isPriority: {
    type: Boolean,
    default: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDB",
    required: true,
    trim: true,
    maxlength: [25, "Max Length should be less then 25 characters"]
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TodoDB", TodoSchema);