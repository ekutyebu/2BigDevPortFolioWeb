export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  console.log("DEBUG: Available slugs in DB:", posts.map(p => p.slug));
  return posts;
}

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error("DEBUG: Prisma Query Error:", error);
    throw error;
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
                  {/* Extracting a snippet from content - simplified for now */}
                  {post.content.substring(0, 160)}...
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
