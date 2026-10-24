const mongoose = require("mongoose");

async function connectDatabase() {
 
  await mongoose.connect("mongodb+srv://ravi:123@cluster0.cmygjfn.mongodb.net/mvc_crud");
  console.log("Connected to MongoDB");
}

module.exports = connectDatabase;
