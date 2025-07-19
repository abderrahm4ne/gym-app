import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Member from "./models/mongoSchema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

async function connectToDatabase() {
  const uri = config.mongoUri;

  if (!uri) {
    console.error("Mongo URI is missing in config.json");
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
