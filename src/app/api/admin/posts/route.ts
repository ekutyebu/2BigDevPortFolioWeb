import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { submitToIndexNow } from "@/lib/indexnow";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const post = await prisma.post.create({
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
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
