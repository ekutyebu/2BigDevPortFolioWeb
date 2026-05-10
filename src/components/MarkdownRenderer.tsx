import React from 'react';
import CopyButton from './CopyButton';

export default function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return <p className="text-muted italic">This post has no content yet.</p>;

  const lines = content.split('\n');
  const rendered: React.ReactNode[] = [];
  
  let mode: 'text' | 'code' | 'table' | 'list' = 'text';
  let buffer: string[] = [];
  let blockKey = 0;

  const formatInline = (text: string) => {
    // Basic inline formatting: **bold**, `code`, [link](url)
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-black">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[') && part.includes('](')) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary-500 font-bold border-b-2 border-primary-500/20 hover:border-primary-500 hover:bg-primary-500/5 px-1 rounded transition-all">{match[1]}</a>;
        }
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-primary-500/10 border border-primary-500/20 px-2 py-0.5 rounded-lg text-primary-400 font-mono text-sm mx-1">{part.slice(1, -1)}</code>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const flush = () => {
    if (buffer.length === 0) return;
    const currentKey = blockKey++;
    
    if (mode === 'code') {
      const code = buffer.join('\n');
      rendered.push(
        <div key={`code-${currentKey}`} className="relative group my-12">
          <div className="absolute top-4 right-4 z-20">
            <CopyButton code={code} />
          </div>
          <div className="bg-[#0d1117] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
            <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <pre className="p-8 overflow-x-auto font-mono text-sm text-[#c9d1d9] leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      );
    } else if (mode === 'table') {
      const rows = buffer.filter(r => r.includes('|') && !r.replace(/\s/g, '').includes('|---|'));
      if (rows.length > 0) {
        rendered.push(
          <div key={`table-${currentKey}`} className="my-12 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] shadow-2xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-500/10 border-b border-white/5 text-primary-500">
                  {rows[0].split('|').filter(c => c.trim()).map((cell, idx) => (
                    <th key={idx} className="p-6 text-left font-black uppercase tracking-widest text-[10px]">{formatInline(cell.trim())}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                    {row.split('|').filter(c => c.trim()).map((cell, cIdx) => (
                      <td key={cIdx} className="p-6 text-muted/80 font-medium">{formatInline(cell.trim())}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    } else if (mode === 'list') {
      rendered.push(
        <ul key={`list-${currentKey}`} className="space-y-4 my-10 pl-2">
          {buffer.map((li, idx) => {
            const text = li.replace(/^[-*]\s+/, '').trim();
            if (!text) return null;
            return (
              <li key={idx} className="flex gap-5 text-muted text-lg md:text-xl leading-relaxed">
                <div className="w-6 h-6 rounded-full bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                </div>
                <div>{formatInline(text)}</div>
              </li>
            );
          })}
        </ul>
      );
    } else {
      // Text mode can contain multiple paragraphs or headers
      buffer.forEach((line, idx) => {
        const t = line.trim();
        if (!t) return;
        
        if (t.startsWith('## ')) {
          rendered.push(<h2 key={`h2-${currentKey}-${idx}`} className="text-3xl md:text-4xl font-bold mt-20 mb-10 text-white font-outfit border-l-4 border-primary-500 pl-6">{formatInline(t.replace('## ', ''))}</h2>);
        } else if (t.startsWith('### ')) {
          rendered.push(<h3 key={`h3-${currentKey}-${idx}`} className="text-xl md:text-2xl font-bold mt-12 mb-6 text-primary-500 font-outfit">{formatInline(t.replace('### ', ''))}</h3>);
        } else if (t.startsWith('---')) {
          rendered.push(<hr key={`hr-${currentKey}-${idx}`} className="my-16 border-white/5" />);
        } else {
          rendered.push(
            <p key={`p-${currentKey}-${idx}`} className="text-muted/90 text-lg md:text-xl leading-[1.8] mb-8 font-medium">
              {formatInline(t)}
            </p>
          );
        }
      });
    }
    buffer = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      if (mode !== 'code') {
        flush();
        mode = 'code';
      } else {
        flush();
        mode = 'text';
      }
    } else if (mode === 'code') {
      buffer.push(line);
    } else if (trimmed.startsWith('|')) {
      if (mode !== 'table') {
        flush();
        mode = 'table';
      }
      buffer.push(line);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (mode !== 'list') {
        flush();
        mode = 'list';
      }
      buffer.push(line);
    } else if (!trimmed) {
      if (mode === 'list' || mode === 'table') {
        flush();
        mode = 'text';
      }
    } else {
      if (mode !== 'text') {
        flush();
        mode = 'text';
      }
      buffer.push(line);
    }
  });

  flush();

  return <div className="space-y-2">{rendered}</div>;
}
