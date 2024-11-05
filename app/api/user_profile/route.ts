import { NextResponse } from "next/server";
import connectMongo from "../../lib/dbConnect";
import User from "../../models/UserProfile";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
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

    // Connect to MongoDB and find the user
    await connectMongo();
    let user = await User.findOne({ username: username });
    if (!user) {
      // If user does not exist, create a new one with default values
      user = new User({
        username,
        wins: 0,
        losses: 0,
        inventory: [],
        nftCards: [],
        drachmas: 0,
      });
      await user.save();
      // console.log("New user created:", user);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile API Error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
