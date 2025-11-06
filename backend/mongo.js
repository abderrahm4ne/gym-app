import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


async function connectToDatabase() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("Mongo URI is missing in .env");
    return;
  }
  try {
    await mongoose.connect(uri);
    
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

export default connectToDatabase;
