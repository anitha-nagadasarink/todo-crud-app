const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`Database Conntected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`Error in connecting he database ${err.message}`);
      process.exit(1);
    })
}
module.exports = connectToDB;