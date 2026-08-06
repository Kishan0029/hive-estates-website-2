import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { getAdminProperties, deleteAdminProperty, formatINR } from "../../lib/api";

export function AdminPropertiesPage() {
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") ?? "";
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["admin", "properties"],
    queryFn: getAdminProperties,
  });

  const filtered = properties.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? p.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteAdminProperty(id);
      queryClient.invalidateQueries({ queryKey: ["admin", "properties"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
    } catch (err: any) {
      alert("Failed to delete: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      active: "bg-emerald-50 text-emerald-700 border-emerald-200",
      draft: "bg-neutral-100 text-neutral-600 border-neutral-200",
      sold: "bg-amber-50 text-amber-700 border-amber-200",
      rented: "bg-blue-50 text-blue-700 border-blue-200",
    };
    return map[status] || "bg-neutral-100 text-neutral-600 border-neutral-200";
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-hive-ink">Properties</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage all listings, plots and homes.</p>
        </div>
        <Link
          to="/admin/properties/new"
          className="rounded-full bg-hive-ink px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-all inline-flex items-center gap-2 shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Property
        </Link>
      </div>

      {/* Filter Banner */}
      {statusFilter && (
        <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-hive-ink/5 border border-hive-ink/10">
          <p className="text-sm font-semibold text-hive-ink">
            Filtering by: <span className="capitalize">{statusFilter}</span>
          </p>
          <Link to="/admin/properties" className="text-xs font-bold text-neutral-500 hover:text-hive-ink transition">
            Clear Filter ✕
          </Link>
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white rounded-[24px] border border-neutral-200 shadow-sm overflow-hidden">
        {/* Search bar */}
        <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50">
          <div className="relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm outline-none focus:border-hive-ink transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-neutral-100 rounded-full animate-pulse w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-neutral-400 font-medium">
                    No properties found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-hive-ink max-w-[260px] truncate">{p.title}</td>
                    <td className="px-6 py-4 font-bold text-hive-ink">
                      {p.price_on_request ? (
                        <span className="text-neutral-500 font-medium">On Request</span>
                      ) : (
                        formatINR(p.price)
                      )}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 capitalize">{p.property_type}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadge(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 font-medium">
                      {new Date(p.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link to={`/admin/properties/${p.id}/edit`} className="text-xs font-bold text-hive-ink hover:underline">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        disabled={deletingId === p.id}
                        className="text-xs font-bold text-red-500 hover:underline disabled:opacity-40"
                      >
                        {deletingId === p.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
