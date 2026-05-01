import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string | null;
  github?: string | null;
}

const Projects = ({ projects }: { projects: Project[] }) => {
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
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-3xl overflow-hidden hover:border-primary-500/50 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-4">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-500 text-white hover:scale-110 transition-transform">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform">
                        <Github size={20} />
                      </a>
                    )}
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
