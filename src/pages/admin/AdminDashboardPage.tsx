import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../lib/api";

export function AdminDashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: getDashboardStats,
    refetchOnWindowFocus: true,
  });

  const statCards = [
    { label: "Active Listings", value: stats?.activeListings ?? 0, icon: "🏠", accent: "bg-emerald-50 border-emerald-200 text-emerald-700", href: "/admin/properties?status=active" },
    { label: "Pending Drafts", value: stats?.pendingApprovals ?? 0, icon: "⏳", accent: "bg-amber-50 border-amber-200 text-amber-700", href: "/admin/properties?status=draft" },
    { label: "Sold / Rented", value: stats?.propertiesSold ?? 0, icon: "✓", accent: "bg-neutral-100 border-neutral-200 text-neutral-600", href: "/admin/properties?status=sold" },
    { label: "Total Inquiries", value: stats?.totalInquiries ?? 0, icon: "💬", accent: "bg-blue-50 border-blue-200 text-blue-700", href: "/admin/inquiries" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-hive-ink">Dashboard</h1>
          <p className="text-neutral-500 mt-1 font-medium">Welcome back. Here's what's happening at Hive Estates.</p>
        </div>
        <Link
          to="/admin/properties/new"
          className="rounded-full bg-hive-ink px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Property
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            to={stat.href}
            className="group bg-white rounded-[24px] border border-neutral-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl border ${stat.accent} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              {isLoading ? (
                <div className="w-14 h-9 rounded-xl bg-neutral-100 animate-pulse" />
              ) : (
                <span className="text-4xl font-black text-hive-ink tracking-tighter">{stat.value}</span>
              )}
            </div>
            <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-neutral-100">
            <h2 className="font-bold text-lg text-hive-ink">Quick Actions</h2>
          </div>
          <div className="p-8 grid sm:grid-cols-2 gap-4">
            <Link
              to="/admin/properties"
              className="flex flex-col gap-3 p-6 rounded-2xl border border-neutral-200 bg-neutral-50 hover:border-hive-ink hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-hive-ink/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-hive-ink">Manage Properties</h3>
                <p className="text-xs text-neutral-500 mt-0.5">View, edit or delete listings.</p>
              </div>
            </Link>
            <Link
              to="/admin/inquiries"
              className="flex flex-col gap-3 p-6 rounded-2xl border border-neutral-200 bg-neutral-50 hover:border-hive-ink hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-hive-ink/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-hive-ink">View Leads</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Check customer inquiries.</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-neutral-200 shadow-sm p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-hive-ink/10 flex items-center justify-center mb-5">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="font-extrabold text-hive-ink text-xl mb-2">Storage Active</h3>
          <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
            Supabase connected. Upload images and manage listings in real time.
          </p>
          <div className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            ● System Online
          </div>
        </div>
      </div>
    </div>
  );
}
