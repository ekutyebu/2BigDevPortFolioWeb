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
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-12 text-center">My Workflow Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: "Git", level: "Expert" },
            { name: "VS Code", level: "Primary IDE" },
            { name: "Figma", level: "Design" },
            { name: "Postman", level: "API Testing" },
            { name: "Docker", level: "Learning" },
            { name: "Linux", level: "OS" },
            { name: "Vercel", level: "Hosting" },
            { name: "Prisma", level: "ORM" },
            { name: "Python", level: "Backend" },
            { name: "AI Tools", level: "Efficiency" },
            { name: "NLP", level: "TextBlob" },
            { name: "SQL", level: "Database" },
          ].map((tool, index) => (
            <div key={index} className="glass p-6 rounded-2xl text-center hover:border-primary-500 transition-colors">
              <p className="font-bold font-outfit text-sm">{tool.name}</p>
              <p className="text-[10px] text-primary-500 font-bold uppercase tracking-widest mt-1">{tool.level}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
