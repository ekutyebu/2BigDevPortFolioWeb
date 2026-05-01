import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/ekutyebu/", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ekuty-ebu-86a617235/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ebubarna1@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-black/20 border-t border-gray-200 dark:border-white/5 py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="font-outfit font-bold text-2xl tracking-tight">
                2Big<span className="text-primary-500">Dev</span>
              </span>
            </Link>
            <p className="text-muted max-w-sm mb-8">
              Based in Douala, Cameroon. <br />
              Building high-performance digital experiences with React, Next.js, and Python. <br />
              <span className="font-bold">Tel: +237 679 425 771</span>
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary-500 transition-colors text-muted hover:text-primary-500"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="text-muted hover:text-primary-500 transition-colors">About</Link></li>
              <li><Link href="#projects" className="text-muted hover:text-primary-500 transition-colors">Projects</Link></li>
              <li><Link href="#blog" className="text-muted hover:text-primary-500 transition-colors">Blog</Link></li>
              <li><Link href="#contact" className="text-muted hover:text-primary-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-muted hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted hover:text-primary-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            © {currentYear} 2BigDev. All rights reserved.
          </p>
          <p className="text-muted text-sm flex items-center gap-1">
            Built with <span className="text-red-500">♥</span> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
