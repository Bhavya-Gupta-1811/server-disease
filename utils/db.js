const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful to DB");
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);  
    process.exit(1); 
  }
};

module.exports = connectDb;
