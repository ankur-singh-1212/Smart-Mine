import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Mine from "../models/Mine.js";
import { demoUsers, demoMines } from "./demoData.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await User.deleteMany({});
    await Mine.deleteMany({});

    const users = [];

    for (const user of demoUsers) {
      const hashedPassword = await bcrypt.hash(
        user.password,
        10
      );

      users.push({
        ...user,
        password: hashedPassword
      });
    }

    await User.insertMany(users);
    await Mine.insertMany(demoMines);

    console.log("✅ Demo users created");
    console.log("✅ Demo mines created");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();