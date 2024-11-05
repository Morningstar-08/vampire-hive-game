// /app/api/nft/[tokenId]/route.ts
import { NextResponse } from "next/server";
import connectMongo from "@/app/lib/dbConnect";
import NFT from "@/app/models/NFTModel";

export async function GET(
  req: Request,
  { params }: { params: { tokenId: string } }
) {
  try {
    await connectMongo();
    const nft = await NFT.findOne({ tokenId: params.tokenId }).populate(
      "owner",
      "username"
    );
    if (!nft) {
      return NextResponse.json({ error: "NFT not found" }, { status: 404 });
    }
    return NextResponse.json(nft);
  } catch (error) {
    console.error("Error fetching NFT:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
