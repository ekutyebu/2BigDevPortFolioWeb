"use client";

import React, { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className="bg-primary-500 hover:bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-xl transition-all active:scale-95"
    >
      {copied ? "Copied!" : "Copy Code"}
    </button>
  );
}
