import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboard() {
  // Security Check
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "true";

  if (!isAdmin) {
    redirect("/admin");
  }

  // Fetch initial data
  const [posts, projects] = await Promise.all([
    prisma.post.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
  ]);

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

        <AdminDashboardClient initialPosts={posts} initialProjects={projects} />
      </div>
    </div>
  );
}
