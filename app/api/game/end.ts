import { NextResponse } from "next/server";
import { sendGameResult } from "../../lib/hiveTransaction";

export async function POST(req: Request) {
  try {
    const { username, nftCard, hiveStaked, privateKey } = await req.json();

    // Call the function to send the transaction
    const result = await sendGameResult();

    // Return the response
    if (result.success) {
      return NextResponse.json({ success: true, message: result.message });
    } else {
      return NextResponse.json({ success: false, message: result.message });
    }
  } catch (error) {
    // Ensure the error is handled properly as an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    } else {
      // Handle unknown errors, or provide a generic error message
      return NextResponse.json({
        success: false,
        error: "An unknown error occurred",
      });
    }
  }
}
