import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb+srv://vijayk8478:YtFBbOiYxGkuRQYV@namastenode.crfc3.mongodb.net/devTinder");
}
