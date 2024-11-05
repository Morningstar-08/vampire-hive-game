import mongoose from "mongoose";

export interface UserProfile {
  username: string;
  total_wins: number;
  total_losses: number;
  inventory: string[];
  nftCards: mongoose.Types.ObjectId[];
  drachmas: number;
}

const userSchema = new mongoose.Schema(
  {
    username: String,
    total_wins: { type: Number, default: 0 }, // Changed to Number
    total_losses: { type: Number, default: 0 }, // Changed to Number
    inventory: [String], // Changed to array
    nftCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "NFT" }], // Changed to array
    drachmas: { type: Number, default: 0 },
  },
  {
    collection: "users-profile",
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
