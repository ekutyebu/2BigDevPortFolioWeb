import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

// GET /api/blog/[slug]/comments - Fetch visible comments
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const prisma = getPrisma();
    
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: {
        comments: {
          where: { isHidden: false },
          orderBy: { createdAt: "desc" }
        }
      }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ comments: post.comments });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/blog/[slug]/comments - Add a new comment
export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { author, text } = await req.json();

    if (!author || !text || text.trim() === "") {
      return NextResponse.json({ error: "Name and comment text are required" }, { status: 400 });
    }

    const prisma = getPrisma();
    
    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { slug: params.slug }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        author: author.trim(),
        text: text.trim(),
        postId: post.id,
        // isHidden defaults to false
      }
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Failed to add comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
