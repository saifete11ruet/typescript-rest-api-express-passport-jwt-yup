import config from "config";
import mongoose from "mongoose";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export default connect;
