// models/NFT.ts
import mongoose, { Schema, Document, Types } from "mongoose";

// Define the NFT metadata interface
interface NFTMetadata {
  name: string;
  description: string;
  image: string; // URL or data for the image
  wins: number;
  losses: number;
}

// Define the NFT document interface
export interface NFTDocument extends Document {
  tokenId: string;
  owner: Types.ObjectId; // Reference to the User model
  metadata: NFTMetadata;
}

// NFT Schema
const nftSchema = new Schema<NFTDocument>(
  {
    tokenId: { type: String, required: true, unique: true }, // Unique token identifier
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    metadata: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true }, // Link to the NFT image
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
    },
  },
  { collection: "nfts" }
);

const NFT =
  mongoose.models.NFT || mongoose.model<NFTDocument>("NFT", nftSchema);
export default NFT;
