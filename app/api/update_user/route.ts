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
    const { gameResult } = await req.json();
    console.log(gameResult);

    // Connect to MongoDB
    await connectMongo();

    // Find and update the user
    const updateFields = {
      $inc: {
        total_wins: gameResult === "win" ? 1 : 0,
        total_losses: gameResult === "loss" ? 1 : 0,
      },
    };

    const user = await User.findOneAndUpdate({ username }, updateFields, {
      new: true,
    });

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
