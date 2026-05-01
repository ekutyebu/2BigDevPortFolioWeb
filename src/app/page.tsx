export const dynamic = "force-dynamic";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let projects = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Home page project fetch failed:", error);
  }

  return (
    <div className="flex flex-col">
      <Hero />
      <div id="about" className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-primary-500/10 border border-primary-500/20 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-primary-500/40">
                  <span className="font-outfit font-bold text-6xl">2Big</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden md:block">
                <p className="font-bold text-2xl">1+</p>
                <p className="text-xs text-muted font-bold uppercase tracking-widest">Year Experience</p>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">About Me</h2>
              <h3 className="heading-lg font-outfit">Junior Full Stack <br />Developer & Engineer</h3>
              <p className="text-xl text-muted mt-8 leading-relaxed">
                Hi, I&apos;m <span className="text-primary-500 font-bold">Basti</span>. I&apos;m a Junior Full Stack Developer 
                based in Douala, Cameroon, with over a year of hands-on experience building and 
                shipping real web applications. 
              </p>
              <p className="text-lg text-muted mt-6 leading-relaxed">
                I use React, Next.js, Node.js, and Python to create modern, responsive, and 
                fast websites. I&apos;ve built 6 live projects from scratch — including 
                e-commerce marketplaces, corporate sites, and NLP tools. I use AI daily 
                to code faster, but I understand every line I ship.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-primary-500">Innovation</h4>
                  <p className="text-sm text-muted mt-1">Always staying ahead of the curve with the latest tech.</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary-500">Quality</h4>
                  <p className="text-sm text-muted mt-1">Clean code and robust architecture are my standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ambition Section */}
      <section className="py-24 bg-primary-500 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="section-container relative z-10 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.5em] mb-8 opacity-80">My Philosophy</h2>
          <blockquote className="text-3xl md:text-5xl font-outfit font-bold italic leading-tight max-w-4xl mx-auto">
            &ldquo;Cause I ain&apos;t competing with nobody, It&apos;s till I&apos;m the best I want.&rdquo;
          </blockquote>
          <div className="mt-12 h-1 w-24 bg-white/30 mx-auto rounded-full" />
        </div>
      </section>

      <Skills />
      <Projects projects={projects} />
      {/* Testimonials Section */}
      <section className="py-24 overflow-hidden">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">Testimonials</h2>
            <h3 className="heading-lg font-outfit">What Clients Say</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO at TechFlow",
                text: "The best developer we've ever worked with. The project was delivered on time and exceeded our performance expectations.",
              },
              {
                name: "Michael Chen",
                role: "Founder of InnovateAI",
                text: "Unbelievable attention to detail. Our conversion rate increased by 40% after the redesign and technical overhaul.",
              }
            ].map((t, i) => (
              <div key={i} className="glass p-10 rounded-3xl relative">
                <div className="absolute top-8 right-10 text-primary-500/20 font-serif text-8xl">"</div>
                <p className="text-lg italic text-muted relative z-10 mb-8 leading-relaxed">
                  {t.text}
                </p>
                <div>
                  <h4 className="font-bold font-outfit">{t.name}</h4>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
