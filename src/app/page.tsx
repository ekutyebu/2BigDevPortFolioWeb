import Hero from "@/components/Hero";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Skills />
      
      {/* If the site still works, we'll add Projects next */}
      <div className="py-12 text-center text-[10px] text-muted uppercase tracking-[0.3em] opacity-30">
        System Check Stage 2: Hero & Skills Loaded
      </div>
    </div>
  );
}
