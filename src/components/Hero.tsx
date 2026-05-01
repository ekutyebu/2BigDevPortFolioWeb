"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 w-fit mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              Available for Freelance & New Roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-lg font-outfit"
          >
            I build websites that <span className="text-primary-500">actually work</span>. 
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted mb-12 max-w-2xl leading-relaxed"
          >
            Hi, I&apos;m <span className="text-primary-500 font-bold">Basti</span>. 
            A Junior Full Stack Developer with 6 live projects shipped. Specialized in 
            React, Next.js, Node.js, and Python. Ready to solve real problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <Link
              href="#projects"
              className="group bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 hover:shadow-2xl hover:shadow-primary-500/30"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-8 py-4 rounded-2xl font-bold hover:border-primary-500 transition-all"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Stats/Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Code2, label: "Clean Code", value: "100%" },
              { icon: Trophy, label: "Projects", value: "50+" },
              { icon: Sparkles, label: "UI Design", value: "Premium" },
              { icon: ArrowRight, label: "Experience", value: "5+ Years" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-primary-500 mb-1">
                  <stat.icon size={18} />
                  <span className="text-sm font-bold uppercase tracking-wider">{stat.label}</span>
                </div>
                <span className="text-2xl font-outfit font-bold">{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
