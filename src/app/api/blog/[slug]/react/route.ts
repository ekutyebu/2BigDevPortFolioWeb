import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { action } = await req.json(); // "like" or "dislike"
    if (action !== "like" && action !== "dislike") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const prisma = getPrisma();
    
    // Increment the counter based on action
    const post = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        [action === "like" ? "likes" : "dislikes"]: {
          increment: 1,
        },
      },
      select: {
        likes: true,
        dislikes: true,
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to react to post:", error);
    return NextResponse.json({ error: "Failed to update reaction" }, { status: 500 });
  }
}
