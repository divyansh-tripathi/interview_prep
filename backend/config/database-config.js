import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");

  try {
    const collections = await mongoose.connection.db
      .listCollections({ name: "users" })
      .toArray();
    if (collections.length > 0) {
      await mongoose.connection.db.collection("users").dropIndex("username_1");
      console.log("Dropped legacy username index");
    }
  } catch (err) {

  }
};
