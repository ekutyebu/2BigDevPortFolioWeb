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
          {/* Robust Custom Markdown Engine */}
          <div className="space-y-6">
            {(() => {
              const blocks = post.content.split(/\n\s*\n/);
              return blocks.map((block: string, i: number) => {
                const trimmed = block.trim();
                
                // 1. Handle Code Blocks (```js ... ```)
                if (trimmed.startsWith('```')) {
                  const lines = trimmed.split('\n');
                  const lang = lines[0].replace('```', '').trim() || 'code';
                  const code = lines.slice(1, -1).join('\n');
                  return (
                    <div key={i} className="relative group my-8">
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => navigator.clipboard.writeText(code)}
                          className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 transition-all"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="bg-[#0d1117] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                        <div className="px-4 py-2 bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-widest font-bold text-muted flex justify-between items-center">
                          <span>{lang}</span>
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>
                        </div>
                        <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-[#c9d1d9]">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </div>
                  );
                }

                // 2. Handle Tables (| col |)
                if (trimmed.startsWith('|')) {
                  const rows = trimmed.split('\n').filter(r => r.trim() && !r.includes('---'));
                  return (
                    <div key={i} className="my-8 overflow-x-auto rounded-2xl border border-white/5 shadow-xl">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/5">
                            {rows[0].split('|').filter(c => c.trim()).map((cell, idx) => (
                              <th key={idx} className="p-4 text-left font-bold text-primary-500 uppercase tracking-wider">{cell.trim()}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.slice(1).map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              {row.split('|').filter(c => c.trim()).map((cell, cIdx) => (
                                <td key={cIdx} className="p-4 text-muted">{cell.trim()}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                // 3. Handle Headings
                if (trimmed.startsWith('## ')) return <h2 key={i} className="heading-md mt-16 mb-8">{trimmed.replace('## ', '')}</h2>;
                if (trimmed.startsWith('### ')) return <h3 key={i} className="text-2xl font-bold mt-12 mb-6 text-white">{trimmed.replace('### ', '')}</h3>;

                // 4. Handle Lists
                if (trimmed.startsWith('- ')) {
                  return (
                    <ul key={i} className="space-y-3 my-6">
                      {trimmed.split('\n').map((li, liIdx) => (
                        <li key={liIdx} className="flex gap-4 text-muted">
                          <span className="text-primary-500 font-bold mt-1">→</span>
                          {li.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // 5. Handle Normal Paragraphs with Inline Formatting (Bold, Links)
                const formatted = trimmed
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') // Bold
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-primary-500 font-bold border-b border-primary-500/20 hover:border-primary-500 transition-all">$1</a>') // Links
                  .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded font-mono text-primary-400">$1</code>'); // Inline Code

                return <p key={i} className="text-muted text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: formatted }} />;
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
