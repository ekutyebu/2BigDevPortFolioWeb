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
  console.log("DEBUG: Available slugs in DB:", posts.map(p => p.slug));
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
                <div className="text-muted line-clamp-3 mb-6">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <strong className="block text-white mb-2" {...props} />,
                      h2: ({node, ...props}) => <strong className="block text-white mb-2" {...props} />,
                      h3: ({node, ...props}) => <strong className="block text-white mb-2" {...props} />,
                      p: ({node, ...props}) => <span className="inline" {...props} />,
                      a: ({node, ...props}) => <span className="text-primary-500 font-bold" {...props} />,
                      ul: ({node, ...props}) => <span className="inline" {...props} />,
                      li: ({node, ...props}) => <span className="inline mr-2 after:content-[','] last:after:content-none" {...props} />,
                      blockquote: ({node, ...props}) => <span className="italic" {...props} />,
                      pre: () => <span className="hidden"></span>, // Hide huge code blocks in preview
                      img: () => <span className="hidden"></span>, // Hide inline images in preview
                    }}
                  >
                    {post.content.split('---')[0] || post.content.substring(0, 300)}
                  </ReactMarkdown>
                </div>
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
