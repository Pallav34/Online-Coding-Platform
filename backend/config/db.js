import mongoose from "mongoose";

const dbConnect = () => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/onlineCoding";
      mongoose.connect(uri);

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("MongoDB database connection established successfully!");
    });
  } catch (e) {
    console.log(e);
  }
};

export default dbConnect;