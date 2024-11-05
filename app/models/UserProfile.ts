import mongoose from "mongoose";

export interface UserProfile {
  username: string;
  wins: number;
  losses: number;
  inventory: string[];
  nftCards: mongoose.Types.ObjectId[];
  drachmas: number;
}

const userSchema = new mongoose.Schema(
  {
    username: String,
    wins: { type: Number, default: 0 }, // Changed to Number
    losses: { type: Number, default: 0 }, // Changed to Number
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
