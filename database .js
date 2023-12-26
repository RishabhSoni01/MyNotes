const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); // connecting to database
    console.log(`MongoDB Connected: ${conn.connection.host} `); // if connected
  } catch (error) {
    console.error(`Error: ${error}`);
    // if not connected then exit the process
    process.exit();
  }
};

module.exports = connectToMongo; // exporting the function
