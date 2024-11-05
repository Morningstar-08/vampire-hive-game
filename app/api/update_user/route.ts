import { NextResponse } from "next/server";
import connectMongo from "../../lib/dbConnect";
import User from "../../models/UserProfile";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      username: string;
    };
    const username = decoded.username;

    // Parse the request body
    const { wins, losses, inventory, nftCards } = await req.json();

    // Connect to MongoDB
    await connectMongo();

    // Find and update the user
    const user = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          wins: wins ?? undefined, // Only update if provided
          losses: losses ?? undefined, // Only update if provided
          inventory: inventory ?? undefined, // Only update if provided
          nftCards: nftCards ?? undefined, // Only update if provided
        },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Update API Error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
