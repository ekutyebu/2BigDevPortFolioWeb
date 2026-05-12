import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // 1. Check if we have a custom password in the DB
    const adminRecord = await prisma.admin.findFirst();
    
    let isValid = false;
    if (adminRecord) {
      isValid = password === adminRecord.password;
    } else {
      // 2. Fallback to ENV variable if no DB record exists yet
      isValid = password === process.env.ADMIN_PASSWORD;
    }

    if (isValid) {
      // Set a secure HTTP-only cookie
      cookies().set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
