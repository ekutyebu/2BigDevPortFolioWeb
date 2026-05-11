export const dynamic = "force-dynamic";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";
import { getPrisma } from "@/lib/prisma";

export default async function Home() {
  let projects: any[] = [];
  let errorMsg = null;
  
  try {
    const prisma = getPrisma();
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
      take: 3,
    });
  } catch (error: any) {
    console.error("Home page project fetch failed:", error);
    errorMsg = error.message || "Database Connection Error";
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
                  src="https://drive.google.com/thumbnail?id=1QaxPOVJRlk248ISbd-KMW1TTa40QgxGK&sz=w1000" 
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
            </div>
          </div>
        </div>
      </div>

      <Skills />
      
      {errorMsg ? (
        <div className="section-container py-12">
          <div className="glass p-8 rounded-3xl border-red-500/50 text-center">
             <h3 className="text-red-500 font-bold mb-2">Database Connection Status</h3>
             <p className="text-sm text-muted">{errorMsg}</p>
          </div>
        </div>
      ) : (
        <Projects projects={projects} />
      )}

      <ContactForm />
    </div>
  );
}
