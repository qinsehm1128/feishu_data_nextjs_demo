import crypto from "crypto";

const secretKey = process.env.SECRET_KEY || "";

export interface RequestHeaders {
  "x-base-request-timestamp"?: string;
  "x-base-request-nonce"?: string;
  "x-base-signature"?: string;
}

export function validateSignature(
  headers: RequestHeaders,
  body: any
): boolean {
  const nonce = headers["x-base-request-nonce"];
  const timestamp = headers["x-base-request-timestamp"];
  const sig = headers["x-base-signature"];

  // If no signature provided, allow request (for development)
  if (!sig) {
    console.log("No signature provided, allowing request");
    return true;
  }

  if (!secretKey) {
    console.warn("SECRET_KEY not configured, signature validation disabled");
    return true;
  }

  try {
    // Reconstruct signature
    const str = timestamp + nonce + secretKey + JSON.stringify(body);
    const sha1 = crypto.createHash("sha1");
    sha1.update(str);
    const encryptedStr = sha1.digest("hex");

    const isValid = encryptedStr === sig;
    console.log("Signature validation:", isValid ? "PASSED" : "FAILED");

    return isValid;
  } catch (error) {
    console.error("Signature validation error:", error);
    return false;
  }
}
