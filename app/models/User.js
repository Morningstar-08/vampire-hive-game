import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    wins: { type: Number, default: 0 }, // Changed to Number
    losses: { type: Number, default: 0 }, // Changed to Number
    inventory: [String], // Changed to array
    nftCards: [String], // Changed to array
  },
  {
    collection: "users-profile",
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
