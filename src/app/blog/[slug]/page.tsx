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
          {/* Pro Rendering Engine v3 (Crash-Proof + High Fidelity) */}
          <div className="space-y-8">
            {(() => {
              if (!post.content) return <p className="text-muted">This post has no content yet.</p>;

              const blocks = post.content.split(/\n\s*\n/);
              return blocks.map((block: string, i: number) => {
                const trimmed = block.trim();
                if (!trimmed) return null;
                
                // 1. Code Blocks
                if (trimmed.startsWith('```')) {
                  const lines = trimmed.split('\n');
                  const code = lines.slice(1, lines[lines.length - 1].startsWith('```') ? -1 : undefined).join('\n');
                  return (
                    <div key={i} className="bg-[#0d1117] rounded-3xl overflow-hidden border border-white/5 my-8 shadow-2xl">
                       <div className="px-6 py-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                          </div>
                        </div>
                      <pre className="p-8 overflow-x-auto font-mono text-sm text-[#c9d1d9] leading-relaxed">
                        <code>{code}</code>
                      </pre>
                    </div>
                  );
                }

                // 2. Tables
                if (trimmed.startsWith('|')) {
                  const rows = trimmed.split('\n').filter(r => r.trim() && !r.includes('---'));
                  return (
                    <div key={i} className="my-10 overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.01] shadow-xl">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-primary-500/10 border-b border-white/5 text-primary-500">
                            {rows[0].split('|').filter(c => c.trim()).map((cell, idx) => (
                              <th key={idx} className="p-5 text-left font-black uppercase tracking-widest text-[10px]">{cell.trim()}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.slice(1).map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                              {row.split('|').filter(c => c.trim()).map((cell, cIdx) => (
                                <td key={cIdx} className="p-5 text-muted/80">{cell.trim()}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // 3. Headings
                if (trimmed.startsWith('## ')) return <h2 key={i} className="text-3xl font-bold mt-20 mb-8 text-white font-outfit">{trimmed.replace('## ', '')}</h2>;
                if (trimmed.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-12 mb-6 text-primary-500 font-outfit">{trimmed.replace('### ', '')}</h3>;

                // 4. Lists
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  return (
                    <ul key={i} className="space-y-4 my-8">
                      {trimmed.split('\n').map((li, liIdx) => (
                        <li key={liIdx} className="flex gap-4 text-muted text-lg">
                          <span className="text-primary-500 font-bold mt-1">✓</span>
                          <span>{li.replace(/^[-*]\s+/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                // 5. Normal Paragraphs (With Safe Inline Formatting)
                const parts = trimmed.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g);
                return (
                  <p key={i} className="text-muted/90 text-lg md:text-xl leading-relaxed mb-8">
                    {parts.map((part, pIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={pIdx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                      }
                      if (part.startsWith('[') && part.includes('](')) {
                        const match = part.match(/\[(.*?)\]\((.*?)\)/);
                        if (match) return <a key={pIdx} href={match[2]} target="_blank" className="text-primary-500 font-bold border-b border-primary-500/20 hover:border-primary-500 transition-all">{match[1]}</a>;
                      }
                      if (part.startsWith('`') && part.endsWith('`')) {
                        return <code key={pIdx} className="bg-primary-500/10 px-2 py-0.5 rounded text-primary-400 font-mono text-sm">{part.slice(1, -1)}</code>;
                      }
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
