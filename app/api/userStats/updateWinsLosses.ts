// app/api/profile/route.ts
import { NextResponse } from "next/server";
import connectMongo from "../../lib/mongodb";
import User from "../../models/User";
import jwt from "jsonwebtoken";

// import OpponentCards, { updateWinsLoss } from "@/app/components/OpponentCards";

export async function POST(req: Request) {
  const { isWin } = await req.json();
  //   console.log("the game result is", gameResult);
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

    // const { wins, losses } = await req.json();
    await connectMongo();
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (isWin) {
      user.wins = user.wins + 1;
    } else if (user.losses !== undefined && !isWin) {
      user.losses = user.losses + 1;
    }
    await user.save();
    return NextResponse.json({ message: "User stats updated", user });
  } catch (error) {
    console.error("Error updating stats: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
