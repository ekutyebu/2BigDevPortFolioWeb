export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">System Check: Online</h1>
        <p className="text-xl text-gray-400">If you can see this, the core site is working.</p>
        <div className="mt-12 p-8 border border-white/10 rounded-3xl">
          <p className="text-sm uppercase tracking-widest text-primary-500 font-bold mb-4">Diagnostics</p>
          <ul className="text-left space-y-4">
             <li className="flex justify-between"><span>Server Components:</span> <span className="text-green-500">OK</span></li>
             <li className="flex justify-between"><span>Layout Rendering:</span> <span className="text-green-500">OK</span></li>
             <li className="flex justify-between"><span>Global CSS:</span> <span className="text-green-500">OK</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
