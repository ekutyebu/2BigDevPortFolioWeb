import React from "react";
import Skills from "@/components/Skills";

export default function SkillsPage() {
  return (
    <main className="pt-32">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">Expertise</h2>
          <h1 className="heading-lg font-outfit">Technical <span className="text-primary-500">Stack</span></h1>
          <p className="text-xl text-muted mt-6">
            The tools and technologies I use to bring digital ideas to life.
          </p>
        </div>
      </div>
      <Skills />
      
      <div className="section-container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold font-outfit mb-4">Frontend</h3>
            <p className="text-muted">Specializing in React and Next.js for building fast, SEO-friendly, and interactive user interfaces.</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold font-outfit mb-4">Backend</h3>
            <p className="text-muted">Architecting robust APIs and server-side logic using Node.js, Express, and PostgreSQL.</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold font-outfit mb-4">Design</h3>
            <p className="text-muted">Creating clean, modern, and accessible designs using Tailwind CSS and Framer Motion.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
