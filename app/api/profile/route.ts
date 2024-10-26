// app/api/profile/route.ts
import { NextResponse } from "next/server";
import connectMongo from "../../lib/mongodb";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get("authorization");
    console.log("Received headers:", Object.fromEntries(req.headers.entries()));

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    console.log(token);

    // Verify and decode the token
    // const decoded = jwt.verify(token, "JWT_SECRET") as { username: string };
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      username: string;
    };

    const username = decoded.username;
    console.log(username);

    // Connect to MongoDB and find the user
    await connectMongo();
    const user = await User.findOne({ username: username });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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
