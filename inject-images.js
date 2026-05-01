const fs = require('fs');
const path = require('path');

const images = [
  { src: 'C:\\Users\\ekuty\\.gemini\\antigravity\\brain\\280298fa-c98b-4630-bf6c-a50f8054b017\\blog_5g_cover_1777667920651.png', dest: '5g-impact-cover.jpg' },
  { src: 'C:\\Users\\ekuty\\.gemini\\antigravity\\brain\\280298fa-c98b-4630-bf6c-a50f8054b017\\blog_ai_cover_1777667957582.png', dest: 'ai-replacing-junior-devs-cover.jpg' },
  { src: 'C:\\Users\\ekuty\\.gemini\\antigravity\\brain\\280298fa-c98b-4630-bf6c-a50f8054b017\\blog_security_cover_1777668006768.png', dest: 'cybersecurity-startups-cover.jpg' },
  { src: 'C:\\Users\\ekuty\\.gemini\\antigravity\\brain\\280298fa-c98b-4630-bf6c-a50f8054b017\\blog_tailwind_cover_1777668656379.png', dest: 'mastering-tailwind-css-cover.jpg' },
  { src: 'C:\\Users\\ekuty\\.gemini\\antigravity\\brain\\280298fa-c98b-4630-bf6c-a50f8054b017\\blog_typescript_cover_1777668687561.png', dest: 'power-of-typescript-cover.jpg' },
  { src: 'C:\\Users\\ekuty\\.gemini\\antigravity\\brain\\280298fa-c98b-4630-bf6c-a50f8054b017\\blog_rust_cover_1777669108053.png', dest: 'rust-backend-performance-cover.jpg' },
  { src: 'C:\\Users\\ekuty\\.gemini\\antigravity\\brain\\280298fa-c98b-4630-bf6c-a50f8054b017\\blog_serverless_cover_1777669135629.png', dest: 'serverless-vs-containers-cover.jpg' }
];

const targetDir = path.join(process.cwd(), 'public', 'images', 'blog');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

images.forEach(img => {
  try {
    if (fs.existsSync(img.src)) {
      fs.copyFileSync(img.src, path.join(targetDir, img.dest));
      console.log(`✅ Injected: ${img.dest}`);
    } else {
      console.warn(`⚠️ Source not found: ${img.src}`);
    }
  } catch (e) {
    console.error(`❌ Error copying ${img.dest}:`, e.message);
  }
});
