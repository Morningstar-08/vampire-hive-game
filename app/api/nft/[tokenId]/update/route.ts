// /app/api/nft/[tokenId]/update/route.ts
import { NextResponse } from "next/server";
import connectMongo from "@/app/lib/dbConnect";
import NFT from "@/app/models/NFTModel";

export async function POST(
  req: Request,
  { params }: { params: { tokenId: string } }
) {
  try {
    const { wins, losses } = await req.json();
    await connectMongo();

    const nft = await NFT.findOneAndUpdate(
      { tokenId: params.tokenId },
      { $inc: { wins, losses } },
      { new: true }
    );

    if (!nft) {
      return NextResponse.json({ error: "NFT not found" }, { status: 404 });
    }

    return NextResponse.json(nft);
  } catch (error) {
    console.error("Error updating NFT:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
