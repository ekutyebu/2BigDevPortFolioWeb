import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboard() {
  // Security Check
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin");
  }

  // Fetch initial data
  let posts: any[] = [];
  let projects: any[] = [];
  let messages: any[] = [];
  let errorMsg = null;

  try {
    const prisma = getPrisma();
    const data = await Promise.all([
      prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.message.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
    posts = data[0];
    projects = data[1];
    messages = data[2];
  } catch (e: any) {
    console.error("Dashboard Fetch Error:", e);
    errorMsg = e.message || "Failed to connect to database.";
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50 dark:bg-black">
      <div className="section-container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold font-outfit">Dashboard</h1>
            <p className="text-muted mt-2">Manage your blog and portfolio content</p>
          </div>
          <form action="/api/admin/logout" method="POST">
             <button type="submit" className="text-sm font-bold text-red-500 hover:underline">
               Logout
             </button>
          </form>
        </div>

        {errorMsg ? (
          <div className="glass p-12 rounded-3xl border-red-500/50 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Database Connection Error</h2>
            <p className="text-muted mb-8">{errorMsg}</p>
            <p className="text-sm text-muted">Please check your DATABASE_URL in Vercel settings and ensure it is the Pooler URL.</p>
          </div>
        ) : (
          <AdminDashboardClient initialPosts={posts} initialProjects={projects} initialMessages={messages} />
        )}
      </div>
    </div>
  );
}
