const express = require("express");
const dotenv = require("dotenv");
const connectToMongo = require("./database ");
const { errorHandler, notFound } = require("./middleware/error.js");
const path = require("path"); // The path module provides utilities for working with file and directory paths.
var cors = require("cors"); //

dotenv.config();
//  is typically used to load and configure environment variables from a .env file in a Node.js application.

connectToMongo(); // connecting to database

// const dateTimeObject = new Date("yourInputDateInASuitableFormat").toLocaleString("en-US", {timeZone: 'Asia/Kolkata'});
// console.log("Server started at:-");
// console.log("");
// console.log(
//   "-------------------------------------------------------------------------------------"
// );
// console.log(
//   "-------------------------------------------------------------------------------------"
// );

// console.log(`Date: ${dateTimeObject.toDateString()}`);
// console.log(`Time: ${dateTimeObject.toTimeString()}`);
// console.log(
//   "-------------------------------------------------------------------------------------------------------"
// );
// console.log(
//   "-------------------------------------------------------------------------------------"
// );
// console.log("");

const app = express();
app.use(cors()); //  Calling use(cors()) will enable the express server to respond to requests(put ,post ,delete,get).

app.use(express.json()); // to accept json data

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// ----------------production -----------------

if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}
// ------------------production---------------

// Error Handling middlewares
app.use(notFound); // if no route is found then this middleware will run
app.use(errorHandler); // if any error occurs in any route

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Notebook backend listening on port ${PORT}`));
