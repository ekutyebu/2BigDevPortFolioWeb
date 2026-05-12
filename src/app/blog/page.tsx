export const dynamic = "force-dynamic";
import { getPrisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';

async function getPosts() {
  const prisma = getPrisma();
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return posts;
}

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("DEBUG: Prisma Query Error:", error);
    // Gracefully handle error instead of crashing the page
  }

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <div className="max-w-2xl mb-16">
          <h1 className="heading-lg font-outfit">Insights & <span className="text-primary-500">Articles</span></h1>
          <p className="text-xl text-muted mt-6">
            Exploring the intersection of design, engineering, and digital growth.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass p-12 rounded-3xl text-center">
            <p className="text-xl text-muted">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-primary-500/10">
                  {post.image ? (
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-700" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-primary-500 font-bold uppercase tracking-widest mb-4">
                  <Calendar size={14} />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <h2 className="text-2xl font-bold font-outfit group-hover:text-primary-500 transition-colors mb-4">
                  {post.title}
                </h2>
                <p className="text-muted line-clamp-3 mb-6">
                  {(() => {
                    const cleanText = post.content
                      .replace(/^#+\s+/gm, '') // Remove headers
                      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
                      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Keep link text
                      .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
                      .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italics
                      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
                      .replace(/`(.+?)`/g, '$1') // Remove inline code
                      .replace(/>\s+/gm, '') // Remove blockquotes
                      .replace(/<[^>]*>/g, '') // Remove HTML tags
                      .replace(/\s+/g, ' ') // Normalize spaces
                      .trim();
                    
                    return cleanText.length > 0 
                      ? cleanText.substring(0, 160) + "..."
                      : "Click to read the full article and explore more insights...";
                  })()}
                </p>
                <div className="flex items-center gap-2 font-bold text-primary-500">
                  Read More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
