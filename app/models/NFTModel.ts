// models/NFT.ts
import mongoose, { Schema, Document, Types } from "mongoose";

// Define the NFT metadata interface
interface NFTMetadata {
  name: string;
  description: string;
  image: string; // URL or data for the image
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

// Define the NFT document interface
export interface NFTDocument extends Document {
  tokenId: string;
  owner: Types.ObjectId; // Reference to the User model
  wins: number;
  losses: number;
  metadata: NFTMetadata;
}

// NFT Schema
const nftSchema = new Schema<NFTDocument>(
  {
    tokenId: { type: String, required: true, unique: true }, // Unique token identifier
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    metadata: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true }, // Link to the NFT image
      attributes: [
        {
          trait_type: { type: String, required: true },
          value: { type: Schema.Types.Mixed, required: true },
        },
      ],
    },
  },
  { collection: "nfts" }
);

const NFT =
  mongoose.models.NFT || mongoose.model<NFTDocument>("NFT", nftSchema);
export default NFT;
