import Link from "next/link";
import { getAdminUser } from "@/lib/supabase/auth";
import { logoutAdminAction } from "./actions";

export const metadata = {
  title: "Admin Panel | Yolfin Group",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = await getAdminUser();

  // If user is not authenticated admin, children (like /admin/login) will be rendered or redirected by middleware/auth.
  if (!user || !isAdmin) {
    return <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Protected Admin Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-3 group">
            <span className="font-extrabold text-lg text-emerald-400 tracking-tight">
              Yolfin Group
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold rounded-md uppercase">
              CMS Admin
            </span>
          </Link>

          {/* Admin Navigation Links */}
          <nav className="flex items-center gap-3 text-xs font-semibold">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/media"
              className="px-3 py-1.5 rounded-lg text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 font-bold transition-colors"
            >
              Media Library
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-slate-400">Authenticated Single Admin</span>
            <span className="font-mono text-slate-200 font-medium">
              {user.email}
            </span>
          </div>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-medium text-xs transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>
    </div>
  );
}
