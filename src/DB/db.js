import mongoose from "mongoose";

const DB_NAME = "myContacts";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected ! \n DB host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error \n", error);
    process.exit(1);
  }
};

export default connectDB;
