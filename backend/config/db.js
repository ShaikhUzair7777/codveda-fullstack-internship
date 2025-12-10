const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
