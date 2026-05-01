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

    if (!post) return {};

    return {
      title: `${post.title} | 2BigDev Blog`,
      description: post.content.substring(0, 160),
      openGraph: {
        title: post.title,
        description: post.content.substring(0, 160),
        type: "article",
        publishedTime: post.createdAt.toISOString(),
      },
    };
  } catch (error) {
    return { title: "Blog Post | 2BigDev" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  console.log("DEBUG: Fetching post with decoded slug:", decodedSlug);
  
  let post = null;
  try {
    const prisma = getPrisma();
    post = await prisma.post.findUnique({
      where: { slug: decodedSlug },
    });
  } catch (error) {
    console.error("DEBUG: Prisma Post Fetch Error:", error);
  }

  if (!post) {
    console.error("DEBUG: Post not found for slug:", decodedSlug);
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary-500 font-bold mb-8 hover:gap-3 transition-all">
          <ChevronLeft size={20} /> Back to Blog
        </Link>

        <div className="flex items-center gap-4 text-sm text-muted font-medium mb-6">
          <Calendar size={16} />
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>8 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-outfit leading-tight mb-8">
          {post.title}
        </h1>

        <div className="aspect-video rounded-3xl bg-primary-500/10 mb-12 overflow-hidden relative">
           {post.image ? (
             <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
           ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
           )}
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-outfit prose-p:text-muted prose-p:leading-relaxed">
          {/* Robust Custom Markdown Engine v2 */}
          <div className="space-y-8">
            {(() => {
              if (!post.content) return <p className="text-muted">This post has no content yet.</p>;

              const blocks = post.content.split(/\n\s*\n/);
              return blocks.map((block: string, i: number) => {
                const trimmed = block.trim();
                if (!trimmed) return null;
                
                // 1. Handle Code Blocks (```js ... ```)
                if (trimmed.startsWith('```')) {
                  const lines = trimmed.split('\n');
                  const lang = lines[0].replace(/```/g, '').trim() || 'code';
                  const code = lines.slice(1, lines[lines.length - 1].startsWith('```') ? -1 : undefined).join('\n');
                  return (
                    <div key={i} className="relative group my-8">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button 
                          onClick={() => navigator.clipboard.writeText(code)}
                          className="bg-primary-500/20 hover:bg-primary-500/40 backdrop-blur-md text-primary-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-primary-500/20 transition-all"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="bg-[#0d1117] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                        <div className="px-6 py-3 bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-[0.2em] font-black text-muted flex justify-between items-center">
                          <span>{lang}</span>
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                          </div>
                        </div>
                        <pre className="p-8 overflow-x-auto font-mono text-sm leading-relaxed text-[#c9d1d9]">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </div>
                  );
                }

                // 2. Handle Tables (| col |)
                if (trimmed.startsWith('|')) {
                  const rows = trimmed.split('\n').filter(r => r.trim() && !r.includes('---'));
                  if (rows.length < 2) return null;
                  return (
                    <div key={i} className="my-10 overflow-hidden rounded-3xl border border-white/5 shadow-2xl bg-white/[0.01]">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                              {rows[0].split('|').filter(c => c.trim()).map((cell, idx) => (
                                <th key={idx} className="p-5 text-left font-black text-primary-500 uppercase tracking-widest text-[11px]">{cell.trim()}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.slice(1).map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                {row.split('|').filter(c => c.trim()).map((cell, cIdx) => (
                                  <td key={cIdx} className="p-5 text-muted/80">{cell.trim()}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                }

                // 3. Handle Headings
                if (trimmed.startsWith('## ')) return <h2 key={i} className="text-3xl md:text-4xl font-bold font-outfit mt-20 mb-8 text-white">{trimmed.replace('## ', '')}</h2>;
                if (trimmed.startsWith('### ')) return <h3 key={i} className="text-xl md:text-2xl font-bold font-outfit mt-12 mb-6 text-primary-500">{trimmed.replace('### ', '')}</h3>;

                // 4. Handle Lists (supports - and *)
                if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                  return (
                    <ul key={i} className="space-y-4 my-8">
                      {trimmed.split('\n').map((li, liIdx) => (
                        <li key={liIdx} className="flex gap-4 text-muted text-lg">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 text-[10px] font-bold mt-0.5">✓</span>
                          <span>{li.replace(/^[-*]\s+/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                // 5. Handle Images (![alt](url))
                const imgMatch = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
                if (imgMatch) {
                   return (
                     <div key={i} className="my-12 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                       <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-auto" />
                       {imgMatch[1] && <p className="p-4 text-center text-sm text-muted bg-white/5 italic">{imgMatch[1]}</p>}
                     </div>
                   );
                }

                // 6. Handle Normal Paragraphs with Inline Formatting
                const formatted = trimmed
                  .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-primary-400 font-bold">$1</strong>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                  .replace(/__(.*?)__/g, '<strong class="text-white font-bold">$1</strong>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-primary-500 font-bold border-b-2 border-primary-500/10 hover:border-primary-500 hover:bg-primary-500/5 px-1 rounded transition-all">$1</a>')
                  .replace(/`(.*?)`/g, '<code class="bg-primary-500/10 px-2 py-0.5 rounded-md font-mono text-primary-400 text-sm">$1</code>');

                return <p key={i} className="text-muted/90 text-lg md:text-xl leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: formatted }} />;
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
