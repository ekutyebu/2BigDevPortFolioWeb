"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "INOVAMARK",
    description: "Full e-commerce marketplace with cart, vendor system, multi-language, and payment integration.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    link: "https://e-vendor-two.vercel.app/en",
    github: "https://github.com/ekutyebu/",
  },
  {
    title: "VICALU",
    description: "Industrial product catalog for aluminium, glass, hardware, and composite panels.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://vicalu.vercel.app",
    github: "https://github.com/ekutyebu/",
  },
  {
    title: "Dynasty Group Ltd",
    description: "Corporate agricultural website for labor outsourcing, irrigation, and consultancy.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://dynasty-group-ltd.vercel.app",
    github: "https://github.com/ekutyebu/",
  },
  {
    title: "TechAscend",
    description: "Fellowship application portal with multi-step forms and program roadmap.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "Tailwind"],
    link: "https://www.tech-ascend.com",
    github: "https://github.com/ekutyebu/",
  },
  {
    title: "Bloosom Tech",
    description: "Modern brand and business website with clean responsive design.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Next.js", "Tailwind"],
    link: "https://bloosom-tech.vercel.app",
    github: "https://github.com/ekutyebu/",
  },
  {
    title: "TechX Sentiment",
    description: "Python NLP tool for sentiment analysis using TextBlob for text classification.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "TextBlob", "NLP"],
    link: "https://github.com/ekutyebu/techx-sentiment-project",
    github: "https://github.com/ekutyebu/techx-sentiment-project",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-black/10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">Selected Work</h2>
            <h3 className="heading-lg font-outfit mb-0">Featured Projects</h3>
          </div>
          <p className="text-muted max-w-md">
            A collection of digital products I've built that solve real problems with elegant code and intuitive design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-3xl overflow-hidden hover:border-primary-500/50 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-4">
                    <a href={project.link} className="p-3 rounded-full bg-primary-500 text-white hover:scale-110 transition-transform">
                      <ExternalLink size={20} />
                    </a>
                    <a href={project.github} className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold font-outfit mb-3 group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted text-sm leading-relaxed mb-0">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
