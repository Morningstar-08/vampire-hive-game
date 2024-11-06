import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// const verifyHiveKeychainSignature = (
//   username: string,
//   signature: string
// ): boolean => {
//   // TODO: Implement actual Hive API signature verification
//   // For now, assume the signature is valid
//   return true;
// };

export async function POST(req: Request) {
  const { username } = await req.json();
  // const isSignatureValid = verifyHiveKeychainSignature(username, signature);

  if (true) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
}
