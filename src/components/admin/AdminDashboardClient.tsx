"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboardClient({ initialPosts, initialProjects }: { initialPosts: any[], initialProjects: any[] }) {
  const [activeTab, setActiveTab] = useState<"posts" | "projects">("posts");
  const [posts, setPosts] = useState(initialPosts);
  const [projects, setProjects] = useState(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form States
  const [postData, setPostData] = useState({ title: "", slug: "", content: "", image: "", published: true });
  const [projectData, setProjectData] = useState({ title: "", description: "", image: "", tags: "", link: "", github: "", order: 0 });
  const [isPreview, setIsPreview] = useState(false);

  const resetForm = () => {
    setPostData({ title: "", slug: "", content: "", image: "", published: true });
    setProjectData({ title: "", description: "", image: "", tags: "", link: "", github: "", order: 0 });
    setIsAdding(false);
    setEditingItem(null);
    setIsPreview(false);
  };

  const handleTitleChange = (val: string) => {
    setPostData({ 
      ...postData, 
      title: val, 
      slug: val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '') 
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const type = activeTab;
    const url = editingItem ? `/api/admin/${type}/${editingItem.id}` : `/api/admin/${type}`;
    const method = editingItem ? "PUT" : "POST";
    const body = type === "posts" ? postData : { ...projectData, tags: projectData.tags.split(",").map(t => t.trim()) };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.refresh();
        const updated = await res.json();
        if (type === "posts") {
          if (editingItem) setPosts(posts.map(p => p.id === updated.id ? updated : p));
          else setPosts([updated, ...posts]);
        } else {
          if (editingItem) setProjects(projects.map(p => p.id === updated.id ? updated : p));
          else setProjects([...projects, updated]);
        }
        resetForm();
      }
    } catch (err) {
      console.error("Failed to save", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab === 'posts' ? 'article' : 'project'}?`)) return;

    try {
      const res = await fetch(`/api/admin/${activeTab}/${id}`, { method: "DELETE" });
      if (res.ok) {
        if (activeTab === "posts") setPosts(posts.filter(p => p.id !== id));
        else setProjects(projects.filter(p => p.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const startEdit = (item: any) => {
    setEditingItem(item);
    if (activeTab === "posts") {
      setPostData({ title: item.title, slug: item.slug, content: item.content, image: item.image || "", published: item.published });
    } else {
      setProjectData({ title: item.title, description: item.description, image: item.image, tags: item.tags.join(", "), link: item.link || "", github: item.github || "", order: item.order });
    }
    setIsAdding(true);
  };

  // --- RENDERER ENGINE (Same as Blog Page) ---
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const rendered: any[] = [];
    let buffer: string[] = [];
    let mode: 'text' | 'code' | 'table' | 'list' = 'text';

    const flush = (key: string) => {
      if (buffer.length === 0) return;
      const c = buffer.join('\n');
      if (mode === 'code') {
        rendered.push(<div key={key} className="bg-black p-4 rounded-xl my-4 font-mono text-sm text-green-400 overflow-x-auto"><pre><code>{c}</code></pre></div>);
      } else if (mode === 'table') {
        rendered.push(<div key={key} className="border border-white/10 rounded-xl my-4 p-4 text-xs font-mono">{c}</div>);
      } else if (mode === 'list') {
        rendered.push(<ul key={key} className="space-y-1 my-4">{buffer.map((l, idx) => <li key={idx} className="flex gap-2 text-sm text-muted"><span>•</span>{l.replace(/^[-*]\s+/, '')}</li>)}</ul>);
      } else {
        buffer.forEach((l, idx) => {
          const t = l.trim();
          if (t.startsWith('## ')) rendered.push(<h2 key={`${key}-${idx}`} className="text-xl font-bold mt-6 mb-2 text-white">{t.replace('## ', '')}</h2>);
          else if (t.startsWith('### ')) rendered.push(<h3 key={`${key}-${idx}`} className="text-lg font-bold mt-4 mb-2 text-primary-500">{t.replace('### ', '')}</h3>);
          else if (t) rendered.push(<p key={`${key}-${idx}`} className="mb-2 text-sm text-muted leading-relaxed">{t}</p>);
        });
      }
      buffer = [];
    };

    lines.forEach((line, i) => {
      const t = line.trim();
      if (t.startsWith('```')) {
        if (mode !== 'code') { flush(`pre-${i}`); mode = 'code'; } else { flush(`post-${i}`); mode = 'text'; }
      } else if (mode === 'code') buffer.push(line);
      else if (t.startsWith('|')) { if (mode !== 'table') { flush(`pre-${i}`); mode = 'table'; } buffer.push(line); }
      else if (t.startsWith('- ')) { if (mode !== 'list') { flush(`pre-${i}`); mode = 'list'; } buffer.push(line); }
      else { if (mode !== 'text') { flush(`pre-${i}`); mode = 'text'; } buffer.push(line); }
    });
    flush('final');
    return rendered;
  };

  return (
    <div className="space-y-12">
      {/* Tabs */}
      <div className="flex gap-4 p-1 bg-white dark:bg-white/5 w-fit rounded-2xl border border-gray-100 dark:border-white/5">
        <button
          onClick={() => { setActiveTab("posts"); resetForm(); }}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === "posts" ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25" : "text-muted hover:text-primary-500"}`}
        >
          Blog Posts
        </button>
        <button
          onClick={() => { setActiveTab("projects"); resetForm(); }}
          className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === "projects" ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25" : "text-muted hover:text-primary-500"}`}
        >
          Portfolio Projects
        </button>
      </div>

      {/* Form Area */}
      {isAdding ? (
        <div className="glass p-8 rounded-3xl border border-primary-500/30">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-outfit">
              {editingItem ? `Edit ${activeTab === 'posts' ? 'Post' : 'Project'}` : `New ${activeTab === 'posts' ? 'Post' : 'Project'}`}
            </h2>
            <div className="flex items-center gap-4">
              {activeTab === "posts" && (
                <button 
                  onClick={() => setIsPreview(!isPreview)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${isPreview ? 'bg-primary-500 border-primary-500 text-white' : 'border-white/10 text-muted'}`}
                >
                  {isPreview ? "Editing Mode" : "Live Preview"}
                </button>
              )}
              <button onClick={resetForm} className="text-muted hover:text-red-500">
                <X size={24} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === "posts" ? (
              isPreview ? (
                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 min-h-[400px]">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{postData.title || "Untiled Post"}</h1>
                    <p className="text-sm text-primary-500 font-mono">{postData.slug}</p>
                  </div>
                  {renderMarkdown(postData.content)}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Title</label>
                      <input
                        value={postData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                        placeholder="My Awesome Blog Post"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Slug (Auto-generated)</label>
                      <input
                        value={postData.slug}
                        onChange={(e) => setPostData({ ...postData, slug: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all font-mono text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Image URL</label>
                    <input
                      value={postData.image}
                      onChange={(e) => setPostData({ ...postData, image: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Content (Markdown Supported)</label>
                    <textarea
                      value={postData.content}
                      onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                      rows={12}
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all font-mono"
                      placeholder="Use ## for headers, **bold**, and ``` for code blocks..."
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={postData.published} onChange={(e) => setPostData({ ...postData, published: e.target.checked })} />
                    <label className="font-bold">Publish Immediately</label>
                  </div>
                </>
              )
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Project Title</label>
                    <input
                      value={projectData.title}
                      onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Tags (comma separated)</label>
                    <input
                      value={projectData.tags}
                      onChange={(e) => setProjectData({ ...projectData, tags: e.target.value })}
                      placeholder="React, Next.js, TailWind"
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Live Link</label>
                    <input
                      value={projectData.link}
                      onChange={(e) => setProjectData({ ...projectData, link: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide">GitHub Link</label>
                    <input
                      value={projectData.github}
                      onChange={(e) => setProjectData({ ...projectData, github: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Image URL</label>
                  <input
                    value={projectData.image}
                    onChange={(e) => setProjectData({ ...projectData, image: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Description</label>
                  <textarea
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-8 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-3xl text-muted hover:border-primary-500 hover:text-primary-500 transition-all flex flex-col items-center gap-4"
        >
          <Plus size={40} />
          <span className="font-bold text-lg">Add {activeTab === "posts" ? "Blog Article" : "Portfolio Project"}</span>
        </button>
      )}

      {/* List Area */}
      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-2xl font-bold font-outfit">
          Existing {activeTab === "posts" ? "Articles" : "Projects"} ({activeTab === "posts" ? posts.length : projects.length})
        </h2>
        {(activeTab === "posts" ? posts : projects).map((item: any) => (
          <div key={item.id} className="glass p-6 rounded-3xl flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-primary-500/10 overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p className="text-sm text-muted line-clamp-1">{activeTab === "posts" ? item.slug : item.description}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => startEdit(item)} className="p-3 rounded-xl hover:text-primary-500 transition-all">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-3 rounded-xl hover:text-red-500 transition-all">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
