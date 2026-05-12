import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { submitToIndexNow } from "@/lib/indexnow";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        image: data.image,
        published: data.published,
      },
    });

    if (post.published) {
      const host = req.headers.get("host") || "2bigdev.vercel.app";
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      const url = `${protocol}://${host}/blog/${post.slug}`;
      submitToIndexNow(host, url);
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
