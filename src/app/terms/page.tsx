import React from "react";

export default function TermsPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="section-container max-w-4xl">
        <h1 className="heading-lg font-outfit mb-8">Terms of <span className="text-primary-500">Service</span></h1>
        <div className="prose dark:prose-invert max-w-none space-y-6 text-muted">
          <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
          <p>By accessing 2BigDev, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          
          <h2 className="text-2xl font-bold text-white">2. Use License</h2>
          <p>Permission is granted to temporarily view the materials on this website for personal, non-commercial use only.</p>
          
          <h2 className="text-2xl font-bold text-white">3. Disclaimer</h2>
          <p>The materials on 2BigDev are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.</p>
          
          <h2 className="text-2xl font-bold text-white">4. Limitations</h2>
          <p>In no event shall 2BigDev or its suppliers be liable for any damages arising out of the use or inability to use the materials on the website.</p>
        </div>
      </div>
    </main>
  );
}
