export const dynamic = "force-dynamic";
import { getPrisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButton from "@/components/ShareButton";

import ImageWithFallback from "@/components/ImageWithFallback";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const prisma = getPrisma();
    const decodedSlug = decodeURIComponent(params.slug);
    const post = await prisma.post.findUnique({
      where: { slug: decodedSlug },
    });

    if (!post) return { title: "Post Not Found" };

    const description = post.content ? post.content.substring(0, 160).replace(/[#*`]/g, '') : "Technical Insight";
    const date = post.createdAt ? new Date(post.createdAt) : new Date();
    const isoDate = !isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();

    return {
      title: `${post.title} | Ekuty Ebu`,
      description: description,
      openGraph: {
        title: post.title,
        description: description,
        type: "article",
        publishedTime: isoDate,
      },
    };
  } catch (error) {
    return { title: "Blog Post | Ekuty Ebu" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  
  let post = null;
  try {
    const prisma = getPrisma();
    post = await prisma.post.findUnique({
      where: { slug: decodedSlug },
    });
  } catch (error) {
    console.error("DEBUG: Prisma Fetch Error:", error);
  }

  if (!post) notFound();

  const formattedDate = (() => {
    try {
      const d = post.createdAt ? new Date(post.createdAt) : new Date();
      return !isNaN(d.getTime()) ? d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "May 1, 2026";
    } catch { return "May 1, 2026"; }
  })();

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary-500 font-bold mb-8 hover:gap-3 transition-all">
          <ChevronLeft size={20} /> Back to Blog
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-muted font-medium mb-6">
          <Calendar size={16} />
          {formattedDate}
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{post.content ? Math.ceil(post.content.split(' ').length / 200) : 5} min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-outfit leading-tight mb-8">
          {post.title}
        </h1>

        <div className="aspect-video rounded-3xl bg-primary-500/10 mb-12 overflow-hidden relative border border-white/5">
           <ImageWithFallback 
             src={post.image} 
             alt={post.title} 
             className="w-full h-full object-cover" 
             fallbackText="2B" 
           />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-outfit prose-p:text-muted prose-p:leading-relaxed selection:bg-primary-500/30">
          <MarkdownRenderer content={post.content || ""} />
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center font-bold text-primary-500">
                2B
              </div>
              <div>
                <p className="font-bold">By 2BigDev</p>
                <p className="text-sm text-muted">Full-Stack Engineer</p>
              </div>
            </div>
            <ShareButton title={post.title} />
          </div>
        </div>
      </div>
    </article>
  );
}
