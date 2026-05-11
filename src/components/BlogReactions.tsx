"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface BlogReactionsProps {
  slug: string;
  initialLikes: number;
  initialDislikes: number;
}

export default function BlogReactions({ slug, initialLikes, initialDislikes }: BlogReactionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [hasReacted, setHasReacted] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);

  useEffect(() => {
    // Check local storage to see if user already reacted
    const reactedPosts = JSON.parse(localStorage.getItem("reacted_posts") || "{}");
    if (reactedPosts[slug]) {
      setHasReacted(true);
    }
  }, [slug]);

  const handleReact = async (action: "like" | "dislike") => {
    if (hasReacted) return;

    action === "like" ? setIsLiking(true) : setIsDisliking(true);

    try {
      const res = await fetch(`/api/blog/${slug}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setHasReacted(true);
        
        // Save to local storage to prevent multiple reactions
        const reactedPosts = JSON.parse(localStorage.getItem("reacted_posts") || "{}");
        reactedPosts[slug] = action;
        localStorage.setItem("reacted_posts", JSON.stringify(reactedPosts));
      }
    } catch (error) {
      console.error("Failed to react", error);
    } finally {
      setIsLiking(false);
      setIsDisliking(false);
    }
  };

  return (
    <div className="flex items-center gap-4 py-8 border-y border-gray-200 dark:border-white/5 my-12">
      <span className="font-bold text-muted mr-4">Was this helpful?</span>
      
      <button 
        onClick={() => handleReact("like")}
        disabled={hasReacted || isLiking}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
          hasReacted 
            ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-white/5" 
            : "bg-primary-500/10 text-primary-500 hover:bg-primary-500/20 active:scale-95"
        }`}
      >
        <ThumbsUp size={18} className={isLiking ? "animate-bounce" : ""} />
        <span>{likes}</span>
      </button>

      <button 
        onClick={() => handleReact("dislike")}
        disabled={hasReacted || isDisliking}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
          hasReacted 
            ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-white/5" 
            : "bg-red-500/10 text-red-500 hover:bg-red-500/20 active:scale-95"
        }`}
      >
        <ThumbsDown size={18} className={isDisliking ? "animate-bounce" : ""} />
        <span>{dislikes}</span>
      </button>

      {hasReacted && <span className="text-sm text-muted ml-auto animate-pulse">Thanks for your feedback!</span>}
    </div>
  );
}
