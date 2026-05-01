export const dynamic = "force-dynamic";
import { getPrisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButton from "@/components/ShareButton";

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
           {post.image ? (
             <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
           ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center text-primary-500/30 text-8xl font-black">2B</div>
           )}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-outfit prose-p:text-muted prose-p:leading-relaxed">
          {/* High-Fidelity Line-by-Line Engine */}
          <div className="space-y-4">
            {(() => {
              if (!post.content) return <p className="text-muted">This post has no content yet.</p>;

              // Split into lines for precise parsing
              const lines = post.content.split('\n');
              let inCodeBlock = false;
              let codeContent: string[] = [];

              return lines.map((line: string, i: number) => {
                const trimmed = line.trim();
                
                // 1. Handle Code Blocks
                if (trimmed.startsWith('```')) {
                  if (!inCodeBlock) {
                    inCodeBlock = true;
                    codeContent = [];
                    return null;
                  } else {
                    inCodeBlock = false;
                    const finalCode = codeContent.join('\n');
                    return (
                      <div key={i} className="bg-[#0d1117] rounded-3xl overflow-hidden border border-white/5 my-8 shadow-2xl">
                        <pre className="p-8 overflow-x-auto font-mono text-sm text-[#c9d1d9]"><code>{finalCode}</code></pre>
                      </div>
                    );
                  }
                }
                if (inCodeBlock) {
                  codeContent.push(line);
                  return null;
                }

                // 2. Headings
                if (trimmed.startsWith('## ')) return <h2 key={i} className="text-3xl font-bold mt-16 mb-6 text-white font-outfit">{trimmed.replace('## ', '')}</h2>;
                if (trimmed.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-10 mb-4 text-primary-500 font-outfit">{trimmed.replace('### ', '')}</h3>;

                // 3. Lists
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  return (
                    <div key={i} className="flex gap-4 text-muted text-lg my-2 pl-4">
                      <span className="text-primary-500 font-bold mt-1">✓</span>
                      <span>{trimmed.replace(/^[-*]\s+/, '')}</span>
                    </div>
                  );
                }

                // 4. Tables
                if (trimmed.startsWith('|')) {
                  return <div key={i} className="font-mono text-xs bg-white/5 p-4 rounded-xl my-2 border border-white/5 overflow-x-auto">{trimmed}</div>;
                }

                // 5. Paragraphs with Inline Formatting
                if (!trimmed) return <div key={i} className="h-4" />;
                
                const parts = trimmed.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g);
                return (
                  <p key={i} className="text-muted/90 text-lg leading-relaxed">
                    {parts.map((part, pIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) return <strong key={pIdx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                      if (part.startsWith('[') && part.includes('](')) {
                        const match = part.match(/\[(.*?)\]\((.*?)\)/);
                        if (match) return <a key={pIdx} href={match[2]} target="_blank" className="text-primary-500 font-bold border-b border-primary-500/10 hover:border-primary-500 transition-all">{match[1]}</a>;
                      }
                      if (part.startsWith('`') && part.endsWith('`')) return <code key={pIdx} className="bg-primary-500/10 px-2 py-0.5 rounded text-primary-400 font-mono text-sm">{part.slice(1, -1)}</code>;
                      return part;
                    })}
                  </p>
                );
              });
            })()}
          </div>
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
