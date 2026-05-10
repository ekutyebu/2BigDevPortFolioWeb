import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CopyButton from './CopyButton';

export default function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return <p className="text-muted italic">This post has no content yet.</p>;

  return (
    <div className="space-y-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-4xl md:text-5xl font-bold mt-20 mb-10 text-white font-outfit border-l-4 border-primary-500 pl-6" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-3xl md:text-4xl font-bold mt-20 mb-10 text-white font-outfit border-l-4 border-primary-500 pl-6" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-primary-500 font-outfit" {...props} />,
          p: ({node, ...props}) => <p className="text-muted/90 text-lg md:text-xl leading-[1.8] mb-8 font-medium" {...props} />,
          a: ({node, ...props}) => <a className="text-primary-500 font-bold border-b-2 border-primary-500/20 hover:border-primary-500 hover:bg-primary-500/5 px-1 rounded transition-all" target="_blank" rel="noopener noreferrer" {...props} />,
          strong: ({node, ...props}) => <strong className="text-white font-black" {...props} />,
          em: ({node, ...props}) => <em className="text-white italic" {...props} />,
          ul: ({node, ...props}) => <ul className="space-y-4 my-10 pl-2 list-none" {...props} />,
          ol: ({node, ...props}) => <ol className="space-y-4 my-10 pl-6 list-decimal list-outside text-muted text-lg md:text-xl" {...props} />,
          li: ({node, className, children, ...props}) => (
            <li className={`text-muted text-lg md:text-xl leading-relaxed relative
               [ul_&]:pl-8 [ul_&]:before:content-[''] [ul_&]:before:absolute [ul_&]:before:left-0 [ul_&]:before:top-2.5 [ul_&]:before:w-2 [ul_&]:before:h-2 [ul_&]:before:bg-primary-500 [ul_&]:before:rounded-full [ul_&]:before:ring-4 [ul_&]:before:ring-primary-500/10
               [ol_&]:list-item
            `} {...props}>
              {children}
            </li>
          ),
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent-500 pl-6 italic my-8 text-xl text-muted bg-white/5 py-4 rounded-r-2xl" {...props} />,
          hr: ({node, ...props}) => <hr className="my-16 border-white/5" {...props} />,
          img: ({node, ...props}) => (
            <span className="block my-12 rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img className="w-full h-auto object-cover" {...props} />
            </span>
          ),
          code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = inline || !match;
            if (isInline) {
              return <code className="bg-primary-500/10 border border-primary-500/20 px-2 py-0.5 rounded-lg text-primary-400 font-mono text-sm mx-1" {...props}>{children}</code>;
            }
            
            const codeString = String(children).replace(/\n$/, '');
            return (
              <div className="relative group my-12">
                <div className="absolute top-4 right-4 z-20">
                  <CopyButton code={codeString} />
                </div>
                <div className="bg-[#0d1117] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                  <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <pre className="p-8 overflow-x-auto font-mono text-sm text-[#c9d1d9] leading-relaxed">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              </div>
            );
          },
          table: ({node, ...props}) => (
            <div className="my-12 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] shadow-2xl overflow-x-auto">
              <table className="w-full text-sm" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => <thead className="bg-primary-500/10 border-b border-white/5 text-primary-500" {...props} />,
          th: ({node, ...props}) => <th className="p-6 text-left font-black uppercase tracking-widest text-[10px]" {...props} />,
          tbody: ({node, ...props}) => <tbody {...props} />,
          tr: ({node, ...props}) => <tr className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors" {...props} />,
          td: ({node, ...props}) => <td className="p-6 text-muted/80 font-medium" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
