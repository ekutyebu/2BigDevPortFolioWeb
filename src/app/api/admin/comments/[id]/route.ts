import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Helper function to check admin session
function isAdmin() {
  const cookieStore = cookies();
  return cookieStore.get("admin_session")?.value === "true";
}

// PATCH - Hide or Unhide a comment
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { isHidden } = await req.json();
    
    if (typeof isHidden !== 'boolean') {
      return NextResponse.json({ error: "isHidden boolean is required" }, { status: 400 });
    }

    const prisma = getPrisma();
    
    const comment = await prisma.comment.update({
      where: { id: params.id },
      data: { isHidden }
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Failed to update comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE - Permanently remove a comment
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const prisma = getPrisma();
    
    await prisma.comment.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
