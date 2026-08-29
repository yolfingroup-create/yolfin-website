import Link from "next/link";
import { getAdminUser } from "@/lib/supabase/auth";
import { logoutAdminAction } from "./actions";

export const metadata = {
  title: "Admin CMS Panel | Yolfin Group",
  robots: {
    index: false,
    follow: false,
  },
};

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin" },
  { name: "Services", href: "/admin/services" },
  { name: "Service Items", href: "/admin/service-items" },
  { name: "Content", href: "/admin/content" },
  { name: "Testimonials", href: "/admin/testimonials" },
  { name: "Inquiries", href: "/admin/inquiries" },
  { name: "Trial Bookings", href: "/admin/trial-bookings" },
  { name: "SEO", href: "/admin/seo" },
  { name: "Settings", href: "/admin/settings" },
  { name: "Media", href: "/admin/media" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = await getAdminUser();

  // If user is not authenticated admin, render children (like /admin/login)
  if (!user || !isAdmin) {
    return <div className="min-h-screen bg-slate-900 text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Protected Admin Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <span className="font-extrabold text-lg text-emerald-400 tracking-tight">
                Yolfin Group
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-semibold rounded uppercase">
                CMS Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-slate-400">Single Authorized Admin</span>
              <span className="font-mono text-slate-200 font-medium">{user.email}</span>
            </div>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-medium text-xs transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>

        {/* Secondary CMS Sub-Navigation Bar */}
        <div className="border-t border-slate-800/80 bg-slate-950/60 px-4 sm:px-6 overflow-x-auto">
          <nav className="max-w-7xl mx-auto flex items-center gap-1 py-2 text-xs font-semibold shrink-0 min-w-max">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">{children}</main>
    </div>
  );
}
