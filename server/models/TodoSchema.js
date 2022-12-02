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
      required: true
    }]
  },
  isPriority: {
    type: Boolean,
    default: true
  },
  userID: {
    type: String,
    required: true,
    trim: true,
    maxlength: [25, "Max Length should be less then 25 characters"]
  }
},
  {
    timestamps:
    {
      createdAt: 'createdAt'
    }
  }

);

module.exports = mongoose.model("TodoDB", TodoSchema);