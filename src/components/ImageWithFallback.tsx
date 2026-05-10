"use client";

import React, { useState } from "react";

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackText = "2B",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackText?: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center text-primary-500/30 text-8xl font-black">
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
