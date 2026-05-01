"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Layout, Layers, Database, ShieldCheck } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: ["React / Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "HTML5 / CSS3"],
  },
  {
    title: "Backend & Systems",
    icon: Cpu,
    skills: ["Node.js / Express", "Python / Django", "REST APIs", "NLP Tools (TextBlob)"],
  },
  {
    title: "Database & Storage",
    icon: Database,
    skills: ["SQL", "PostgreSQL", "MongoDB", "Data Modeling"],
  },
  {
    title: "Tools & Growth",
    icon: Layers,
    skills: ["Git / GitHub", "Figma", "AI Tools (Cursor, Claude)", "Vercel / AWS (Basics)"],
  },
  {
    title: "Currently Learning",
    icon: Globe,
    skills: ["Web3 Basics", "Cloud Deployment", "Advanced ML / NLP"],
  },
  {
    title: "Soft Skills",
    icon: ShieldCheck,
    skills: ["Fluent English & French", "Responsive Design", "UI/UX Understanding", "Problem Solving"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">Expertise</h2>
          <h3 className="heading-lg font-outfit">My Technical Arsenal</h3>
          <p className="text-muted max-w-2xl mx-auto mt-6">
            I specialize in building scalable, secure, and high-performance applications 
            using the latest technologies and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-primary-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                <category.icon size={24} />
              </div>
              <h4 className="text-xl font-bold font-outfit mb-6">{category.title}</h4>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-sm text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500/40" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
