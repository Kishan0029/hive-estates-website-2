import { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet, Navigate } from "react-router-dom";
import { adminLogout, getAdminSession } from "../../lib/api";

export function AdminLayout() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    getAdminSession().then((s) => {
      setSession(s);
      setChecking(false);
    });
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await adminLogout();
    navigate("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-hive-ink border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
      isActive
        ? "border-hive-ink text-hive-ink"
        : "border-transparent text-neutral-500 hover:text-hive-ink"
    }`;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-hive-ink flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="font-extrabold text-hive-ink text-lg tracking-tight">
              Hive <span className="opacity-40">Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-neutral-500 hidden sm:block truncate max-w-[200px]">
              {session.user.email}
            </span>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-xs font-bold px-4 py-2 rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all disabled:opacity-50"
            >
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Nav */}
      <div className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 flex gap-4 overflow-x-auto">
          <NavLink to="/admin" end className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/admin/properties" className={navLinkClass}>Properties</NavLink>
          <NavLink to="/admin/inquiries" className={navLinkClass}>Inquiries</NavLink>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
