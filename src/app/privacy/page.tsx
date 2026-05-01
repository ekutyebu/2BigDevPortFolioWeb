import React from "react";

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="section-container max-w-4xl">
        <h1 className="heading-lg font-outfit mb-8">Privacy <span className="text-primary-500">Policy</span></h1>
        <div className="prose dark:prose-invert max-w-none space-y-6 text-muted">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
          <p>Welcome to 2BigDev. We respect your privacy and are committed to protecting your personal data.</p>
          
          <h2 className="text-2xl font-bold text-white">2. Data We Collect</h2>
          <p>We may collect information that you provide directly to us through our contact forms, including your name, email address, and any messages you send.</p>
          
          <h2 className="text-2xl font-bold text-white">3. Cookies and Tracking</h2>
          <p>We use cookies to improve your experience. If we display advertisements, our partners (like Google AdSense) may use cookies to serve ads based on your previous visits to our website or other websites.</p>
          
          <h2 className="text-2xl font-bold text-white">4. Third-Party Services</h2>
          <p>We may use third-party services like Google Analytics and Google AdSense. These services have their own privacy policies regarding how they handle data.</p>
          
          <h2 className="text-2xl font-bold text-white">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at 2bigdev.contact@gmail.com.</p>
        </div>
      </div>
    </main>
  );
}
