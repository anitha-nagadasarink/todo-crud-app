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
      type: String
    }]
  },
  isPriority: {
    type: Boolean,
    default: true
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