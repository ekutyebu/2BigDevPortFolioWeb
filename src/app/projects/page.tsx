export const dynamic = "force-dynamic";
import React from "react";
import { prisma } from "@/lib/prisma";
import Projects from "@/components/Projects";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <main className="pt-32">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">Portfolio</h2>
          <h1 className="heading-lg font-outfit">My Digital <span className="text-primary-500">Creations</span></h1>
          <p className="text-xl text-muted mt-6">
            A comprehensive look at the products, applications, and tools I&apos;ve built.
          </p>
        </div>
      </div>
      <Projects projects={projects} />
    </main>
  );
}
