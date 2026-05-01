export const dynamic = "force-dynamic";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let projects: any[] = [];
  let errorMsg = null;
  try {
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error: any) {
    console.error("Home page project fetch failed:", error);
    errorMsg = error.message || "Unknown Database Error";
  }

  return (
    <div className="flex flex-col">
      <Hero />
      <div id="about" className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-primary-500/10 border border-primary-500/20 overflow-hidden relative group shadow-2xl shadow-primary-500/10">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Ekuty Barnabas Ebu"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden md:block">
                <p className="font-bold text-2xl">1+</p>
                <p className="text-xs text-muted font-bold uppercase tracking-widest">Year Experience</p>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">The Mission</h2>
              <h3 className="heading-lg font-outfit">Global Full-Stack <br />Engineer & AI Architect</h3>
              <p className="text-xl text-muted mt-8 leading-relaxed">
                I am <span className="text-primary-500 font-bold">Basti</span>. I build high-performance, 
                planet-scale digital infrastructure. My focus is on the intersection of 
                <span className="font-bold"> Generative AI</span>, <span className="font-bold">Edge Computing</span>, 
                and <span className="font-bold">Cloud-Native Architecture</span>.
              </p>
              <p className="text-lg text-muted mt-6 leading-relaxed">
                From architecting multi-vendor e-commerce engines to deploying autonomous NLP agents, 
                I deliver code that competes at the highest global standards. I leverage 
                industry-leading tools like Debian for stability and Windows for high-speed 
                production workflows to ensure zero-downtime scalability for every project.
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
      
      {errorMsg ? (
        <div className="section-container py-12">
          <div className="glass p-8 rounded-3xl border-red-500/50 text-center">
             <h3 className="text-red-500 font-bold mb-2">Live Debugger: Database Error</h3>
             <p className="text-sm text-muted">{errorMsg}</p>
          </div>
        </div>
      ) : (
        <Projects projects={projects} />
      )}

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
