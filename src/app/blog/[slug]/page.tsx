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
          {/* Universal State-Machine Engine v6 (Final) */}
          <div className="space-y-4">
            {(() => {
              if (!post.content) return <p className="text-muted italic">This post has no content yet.</p>;

              const lines = post.content.split('\n');
              const rendered: any[] = [];
              let buffer: string[] = [];
              let mode: 'text' | 'code' | 'table' | 'list' = 'text';

              const flush = (key: string) => {
                if (buffer.length === 0) return;
                const content = buffer.join('\n');

                if (mode === 'code') {
                  rendered.push(
                    <div key={key} className="relative group my-10">
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button onClick={() => navigator.clipboard.writeText(content)} className="bg-primary-500/20 hover:bg-primary-500/40 backdrop-blur-md text-primary-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-primary-500/20 transition-all">Copy</button>
                      </div>
                      <div className="bg-[#0d1117] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                        <div className="px-6 py-3 bg-white/5 border-b border-white/5 flex justify-between items-center"><div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-[#ff5f56]" /><div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><div className="w-3 h-3 rounded-full bg-[#27c93f]" /></div></div>
                        <pre className="p-8 overflow-x-auto font-mono text-sm text-[#c9d1d9] leading-relaxed"><code>{content}</code></pre>
                      </div>
                    </div>
                  );
                } else if (mode === 'table') {
                  const rows = buffer.filter(r => r.includes('|') && !r.includes('---'));
                  if (rows.length > 0) {
                    rendered.push(
                      <div key={key} className="my-10 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] shadow-xl overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead><tr className="bg-primary-500/10 border-b border-white/5 text-primary-500">{rows[0].split('|').filter(c => c.trim()).map((cell, idx) => (<th key={idx} className="p-5 text-left font-black uppercase tracking-widest text-[10px]">{cell.trim()}</th>))}</tr></thead>
                          <tbody>{rows.slice(1).map((row, rIdx) => (<tr key={rIdx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">{row.split('|').filter(c => c.trim()).map((cell, cIdx) => (<td key={cIdx} className="p-5 text-muted/80">{cell.trim()}</td>))}</tr>))}</tbody>
                        </table>
                      </div>
                    );
                  }
                } else if (mode === 'list') {
                  rendered.push(
                    <ul key={key} className="space-y-4 my-8">
                      {buffer.map((li, idx) => (
                        <li key={idx} className="flex gap-4 text-muted text-lg">
                          <span className="text-primary-500 font-bold mt-1">✓</span>
                          <span>{li.replace(/^[-*]\s+/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  buffer.forEach((line, idx) => {
                    const t = line.trim();
                    if (!t) return;
                    if (t.startsWith('## ')) rendered.push(<h2 key={`${key}-${idx}`} className="text-3xl font-bold mt-16 mb-8 text-white font-outfit">{t.replace('## ', '')}</h2>);
                    else if (t.startsWith('### ')) rendered.push(<h3 key={`${key}-${idx}`} className="text-xl font-bold mt-10 mb-6 text-primary-500 font-outfit">{t.replace('### ', '')}</h3>);
                    else if (t.startsWith('---')) rendered.push(<hr key={`${key}-${idx}`} className="my-12 border-white/10" />);
                    else {
                      const parts = t.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g);
                      rendered.push(
                        <p key={`${key}-${idx}`} className="text-muted/90 text-lg md:text-xl leading-relaxed mb-6">
                          {parts.map((p, pIdx) => {
                            if (p.startsWith('**') && p.endsWith('**')) return <strong key={pIdx} className="text-white font-bold">{p.slice(2, -2)}</strong>;
                            if (p.startsWith('[') && p.includes('](')) {
                              const m = p.match(/\[(.*?)\]\((.*?)\)/);
                              if (m) return <a key={pIdx} href={m[2]} target="_blank" className="text-primary-500 font-bold border-b-2 border-primary-500/10 hover:border-primary-500 hover:bg-primary-500/5 px-1 rounded transition-all">{m[1]}</a>;
                            }
                            if (p.startsWith('`') && p.endsWith('`')) return <code key={pIdx} className="bg-primary-500/10 px-2 py-0.5 rounded text-primary-400 font-mono text-sm">{p.slice(1, -1)}</code>;
                            return p;
                          })}
                        </p>
                      );
                    }
                  });
                }
                buffer = [];
              };

              lines.forEach((line, i) => {
                const t = line.trim();
                if (t.startsWith('```')) {
                  if (mode !== 'code') { flush(`pre-${i}`); mode = 'code'; }
                  else { flush(`post-${i}`); mode = 'text'; }
                } else if (mode === 'code') buffer.push(line);
                else if (t.startsWith('|')) { if (mode !== 'table') { flush(`pre-${i}`); mode = 'table'; } buffer.push(line); }
                else if (t.startsWith('- ') || t.startsWith('* ')) { if (mode !== 'list') { flush(`pre-${i}`); mode = 'list'; } buffer.push(line); }
                else { if (mode !== 'text') { flush(`pre-${i}`); mode = 'text'; } buffer.push(line); }
              });
              flush('final');
              return rendered;
            })()}
          </div>
        </div>
>

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
