import mongoose from "mongoose"

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("⚠️ MONGO_URI not configured");
      console.log("Using demo/mock data mode");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("⚠️ MongoDB connection failed");
    console.log("Using demo/mock data mode");
  }
};


export default connectDB;