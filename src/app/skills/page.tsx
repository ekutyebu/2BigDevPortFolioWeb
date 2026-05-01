import React from "react";
import { getPrisma } from "@/lib/prisma";
import { 
  Code2, Server, Cpu, Database, 
  Shield, Cloud, Layout, Terminal,
  Zap, Globe, Smartphone, Lock
} from "lucide-react";

const categoryIcons: Record<string, any> = {
  "Core": Code2,
  "Backend": Server,
  "AI": Cpu,
  "Infrastructure": Database,
  "Security": Shield,
  "DevOps": Cloud,
  "Frontend": Layout,
  "Mobile": Smartphone,
};

export default async function SkillsPage() {
  let skills: any[] = [];
  try {
    const prisma = getPrisma();
    skills = await prisma.skill.findMany({
      orderBy: { level: "desc" },
    });
  } catch (error) {
    console.error("Skills page fetch failed:", error);
  }

  // Fallback skills if DB is empty or disconnected
  const displaySkills = skills.length > 0 ? skills : [
    { name: "Next.js 14", category: "Frontend", level: 95 },
    { name: "React / Redux", category: "Frontend", level: 92 },
    { name: "TypeScript", category: "Core", level: 90 },
    { name: "Node.js Architecture", category: "Backend", level: 88 },
    { name: "Python / FastAPI", category: "Backend", level: 85 },
    { name: "OpenAI / LangChain", category: "AI", level: 80 },
    { name: "PostgreSQL / Prisma", category: "Infrastructure", level: 90 },
    { name: "Docker / Kubernetes", category: "DevOps", level: 75 },
    { name: "Debian Linux Admin", category: "Infrastructure", level: 82 },
    { name: "AWS / Vercel Edge", category: "DevOps", level: 85 },
  ];

  const categories = Array.from(new Set(displaySkills.map(s => s.category)));

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="section-container">
        <div className="max-w-3xl mb-20">
          <h1 className="heading-lg font-outfit mb-6">Technical <span className="text-primary-500">Arsenal</span></h1>
          <p className="text-xl text-muted leading-relaxed">
            My expertise is built on a foundation of clean code and scalable architecture. 
            I specialize in the modern stack, with a focus on AI integration and high-performance backends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || Terminal;
            const categorySkills = displaySkills.filter(s => s.category === category);
            
            return (
              <div key={category} className="glass p-10 rounded-3xl border-primary-500/10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 border border-primary-500/20">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-2xl font-bold font-outfit uppercase tracking-tight">{category}</h2>
                </div>

                <div className="space-y-8">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-3">
                        <span className="font-bold text-sm uppercase tracking-wider">{skill.name}</span>
                        <span className="text-primary-500 font-bold text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Workflow Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary-500 mb-4">Development Lifecycle</h2>
            <h3 className="text-4xl font-bold font-outfit">The Global Standard Workflow</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Git / GitHub", icon: Globe, desc: "Version Control" },
              { name: "Vercel / AWS", icon: Zap, desc: "Global Edge Deployment" },
              { name: "Prisma / SQL", icon: Database, desc: "ORM & Data Design" },
              { name: "Tailwind / CSS", icon: Layout, desc: "Fluid UI/UX Design" },
              { name: "Jest / Testing", icon: Shield, desc: "Code Reliability" },
              { name: "Docker / CI/CD", icon: Cloud, desc: "Infrastructure as Code" },
            ].map((tool) => (
              <div key={tool.name} className="glass p-6 rounded-2xl text-center hover:border-primary-500/50 transition-all group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
                  <tool.icon size={24} />
                </div>
                <h4 className="font-bold text-sm mb-1">{tool.name}</h4>
                <p className="text-[10px] text-muted uppercase tracking-widest">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
