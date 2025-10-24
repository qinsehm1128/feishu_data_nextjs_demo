import { NextRequest, NextResponse } from "next/server";
import { tableMeta } from "@/lib/table-meta";
import { validateSignature } from "@/lib/request-sign";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Extract headers for signature validation
    const headers = {
      "x-base-request-timestamp": request.headers.get("x-base-request-timestamp") || undefined,
      "x-base-request-nonce": request.headers.get("x-base-request-nonce") || undefined,
      "x-base-signature": request.headers.get("x-base-signature") || undefined,
    };

    // Log request details
    console.log("POST /api/table_meta");
    console.log("Headers:", headers);
    console.log("Body:", body);

    // Validate signature
    const isValid = validateSignature(headers, body);
    if (!isValid) {
      return NextResponse.json(
        {
          code: 401,
          message: "Invalid signature",
          data: null,
        },
        { status: 401 }
      );
    }

    // Return table metadata
    return NextResponse.json({
      code: 0,
      message: "POST请求成功",
      data: tableMeta,
    });
  } catch (error) {
    console.error("Error in /api/table_meta:", error);
    return NextResponse.json(
      {
        code: 500,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}
