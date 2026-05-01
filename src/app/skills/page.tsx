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
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-12 text-center">Development Ecosystem</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: "Git", level: "Expert", desc: "Version Control" },
            { name: "VS Code", level: "Primary", desc: "IDE of Choice" },
            { name: "Figma", level: "Design", desc: "UI/UX Prototyping" },
            { name: "Postman", level: "Testing", desc: "API Validation" },
            { name: "Docker", level: "Intermediate", desc: "Containerization" },
            { name: "Linux", level: "Power User", desc: "Development OS" },
            { name: "Vercel", level: "Hosting", desc: "CI/CD Deployment" },
            { name: "Prisma", level: "Advanced", desc: "Database ORM" },
            { name: "Python", level: "Advanced", desc: "Backend & ML" },
            { name: "AI Cursor", level: "Expert", desc: "AI-Pair Coding" },
            { name: "NLP", level: "Advanced", desc: "Text Analytics" },
            { name: "SQL", level: "Advanced", desc: "Data Strategy" },
          ].map((tool, index) => (
            <div key={index} className="glass p-6 rounded-2xl group hover:border-primary-500/50 transition-all hover:-translate-y-1">
              <p className="font-bold font-outfit text-base group-hover:text-primary-500 transition-colors">{tool.name}</p>
              <p className="text-[10px] text-primary-500 font-bold uppercase tracking-widest mt-1 mb-2">{tool.level}</p>
              <p className="text-[10px] text-muted leading-tight">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
