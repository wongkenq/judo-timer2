const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose
      .set('strictQuery', false)
      .connect(db)
      .then(console.log(`Connected to MongoDB.`));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
