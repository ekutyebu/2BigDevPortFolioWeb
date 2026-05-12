import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { newPassword } = await req.json();

    if (!newPassword || newPassword.length < 4) {
      return NextResponse.json({ error: "Password too short" }, { status: 400 });
    }

    const adminRecord = await prisma.admin.findFirst();

    if (adminRecord) {
      await prisma.admin.update({
        where: { id: adminRecord.id },
        data: { password: newPassword },
      });
    } else {
      await prisma.admin.create({
        data: { password: newPassword },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
