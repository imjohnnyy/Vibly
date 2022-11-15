const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

// Connection object
const connection = mongoose.connection;

// Verify connection through 'connected' and 'error' scenarios.
connection.on("connected", () => {
  console.log("MongoDB is connected");
});

connection.on("error", (err) => {
  console.log(err);
});

module.exports = connection;
