import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Hardcoded Admin Credentials (Aap ise .env mein bhi rakh sakte hain)
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@blognews.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin123@#";

    // 2. Validation Check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      
      // Yahan aap JWT Token ya Session create kar sakte hain
      const response = NextResponse.json(
        { message: "Login Successful" },
        { status: 200 }
      );

      // Simple Cookie set karna taake admin page protected rahe
      response.cookies.set("admin_token", "secure_session_id", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 2, // 2 Ghante
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Email ya password galat hai!" },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Server Error occurred" },
      { status: 500 }
    );
  }
}