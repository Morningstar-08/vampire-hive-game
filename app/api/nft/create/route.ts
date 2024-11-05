// /app/api/nft/create/route.ts
import { NextResponse } from "next/server";
import connectMongo from "@/app/lib/dbConnect";
import NFT from "@/app/models/NFTModel";
import User from "../../../models/UserProfile";

export async function POST(req: Request) {
  try {
    const { username, tokenId, metadata } = await req.json();
    await connectMongo();

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the NFT
    const nft = new NFT({
      tokenId,
      owner: username,
      metadata,
      wins: 0,
      losses: 0,
    });
    await nft.save();

    // Link NFT to the user profile
    user.nftCards.push(nft._id);
    await user.save();

    return NextResponse.json(nft);
  } catch (error) {
    console.error("Error creating NFT:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
