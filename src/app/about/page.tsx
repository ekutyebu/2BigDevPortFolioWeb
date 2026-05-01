import React from "react";

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="section-container">
        <div className="max-w-3xl mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">The Story</h2>
          <h1 className="heading-lg font-outfit">Junior Full Stack <br />Developer & Engineer</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 text-xl text-muted leading-relaxed">
            <p>
              Hi, I&apos;m <span className="text-primary-500 font-bold">Basti</span>. I&apos;m a Junior Full Stack Developer 
              based in Douala, Cameroon, with over a year of hands-on experience building and 
              shipping real web applications.
            </p>
            <p>
              My journey into tech started with a fascination for how digital products are built. 
              Since then, I&apos;ve dedicated myself to mastering modern frameworks like 
              <span className="text-white font-bold"> React, Next.js, and Node.js</span>.
            </p>
            <p>
              I believe in building software that doesn&apos;t just work, but provides a 
              seamless, delightful experience for the end user. I use AI daily to accelerate 
              my workflow, allowing me to focus on high-level architecture and creative problem-solving.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-primary-500/10 border border-primary-500/20 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
              <div className="absolute inset-0 flex items-center justify-center text-primary-500/40">
                <span className="font-outfit font-bold text-8xl">2Big</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-8 rounded-3xl">
              <p className="font-bold text-4xl">1+</p>
              <p className="text-sm text-muted font-bold uppercase tracking-widest">Year Experience</p>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-12">My Journey</h2>
          <div className="space-y-12">
            {[
              {
                year: "2024 - Present",
                title: "Full Stack Development & Engineering",
                company: "Freelance / Open Source",
                description: "Building production-ready applications for clients and contributing to open-source projects. Focusing on scalability and modern UI/UX."
              },
              {
                year: "2023 - 2024",
                title: "Specialization in Next.js & AI Integration",
                company: "Independent Learning & Projects",
                description: "Mastered Next.js 14 and integrated AI tools like OpenAI and TextBlob into web products to create smarter user experiences."
              },
              {
                year: "2022 - 2023",
                title: "The Foundation",
                company: "Academic & Self-Taught",
                description: "Started with HTML/CSS and JavaScript. Built over 10+ small-scale projects to understand the fundamentals of web architecture."
              }
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 items-start relative pl-8 md:pl-0">
                <div className="text-primary-500 font-bold font-outfit text-xl pt-1">
                  {item.year}
                </div>
                <div className="glass p-8 rounded-3xl border-l-4 border-l-primary-500">
                  <h4 className="text-xl font-bold font-outfit mb-2">{item.title}</h4>
                  <p className="text-primary-500 font-medium text-sm mb-4">{item.company}</p>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32">
          <section className="py-24 bg-primary-500 rounded-[3rem] text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>
            <div className="section-container relative z-10 text-center">
              <h2 className="text-sm font-bold uppercase tracking-[0.5em] mb-8 opacity-80">My Philosophy</h2>
              <blockquote className="text-3xl md:text-5xl font-outfit font-bold italic leading-tight max-w-4xl mx-auto">
                &ldquo;Cause I ain&apos;t competing with nobody, It&apos;s till I&apos;m the best I want.&rdquo;
              </blockquote>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
