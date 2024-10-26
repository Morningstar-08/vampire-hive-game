import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const verifyHiveKeychainSignature = (
  username: string,
  signature: string
): boolean => {
  // TODO: Implement actual Hive API signature verification
  // For now, assume the signature is valid
  return true;
};

export async function POST(req: Request) {
  const { username, signature } = await req.json();

  // Step 1: Verify the Hive Keychain signature
  const isSignatureValid = verifyHiveKeychainSignature(username, signature);

  if (isSignatureValid) {
    // Step 2: Create a JWT token if the signature is valid
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Step 3: Return the token to the client
    return NextResponse.json({ token });
  } else {
    // Invalid signature
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
}
