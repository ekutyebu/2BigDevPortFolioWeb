"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, User } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface BlogCommentsProps {
  slug: string;
}

export default function BlogComments({ slug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/blog/${slug}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, text }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        setText(""); // Clear text but keep author name for convenience
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-primary-500" size={28} />
        <h3 className="text-3xl font-bold font-outfit">Discussion</h3>
        <span className="bg-primary-500/20 text-primary-500 px-3 py-1 rounded-full text-sm font-bold ml-2">
          {comments.length}
        </span>
      </div>

      <div className="mb-12 bg-white/5 p-6 rounded-2xl border border-white/5">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          Do you have a question or any doubt?
        </h4>
        <p className="text-muted text-sm mb-6">Ask here and I or anyone else will respond!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Your Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <textarea
              placeholder="Write your question or comment here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={4}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-primary-500 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !author.trim() || !text.trim()}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-black font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
            <Send size={18} />
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center text-muted py-8 animate-pulse">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-muted py-8 border border-dashed border-white/10 rounded-2xl">
            Be the first to ask a question!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group flex gap-4 bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center font-bold text-black flex-shrink-0">
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-bold text-white">{comment.author}</span>
                  <span className="text-xs text-muted">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric"
                    })}
                  </span>
                </div>
                <p className="text-muted/90 leading-relaxed whitespace-pre-wrap">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
