import React from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="section-container">
        <div className="max-w-2xl mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">Contact</h2>
          <h1 className="heading-lg font-outfit">Let&apos;s Build <span className="text-primary-500">Together</span></h1>
          <p className="text-xl text-muted mt-6">
            Have a project in mind or just want to say hi? I&apos;m always open to discussing new opportunities.
          </p>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
